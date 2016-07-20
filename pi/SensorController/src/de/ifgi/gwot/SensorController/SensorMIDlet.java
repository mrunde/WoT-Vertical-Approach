package de.ifgi.gwot.SensorController;
import java.io.IOException;
import java.util.Arrays;

import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;

import org.eclipse.paho.client.mqttv3.MqttException;

import de.ifgi.gwot.SensorController.util.HttpUtil;
import de.ifgi.gwot.SensorController.util.JSONUtil;

public class SensorMIDlet extends MIDlet{
	
	HCSR04Device hcsr04;
	private static final int TRIGGER_PIN = 20;
	private static final int ECHO_PIN = 21;
	
	GPSSwitch switch1;
	GPSCommSensor gps;
	
	private volatile boolean shouldRun = false;
	private ReadSensors sensorsTask;
	
	private double latitude = Double.parseDouble(this.getAppProperty("latitude"));
	private double longitude = Double.parseDouble(this.getAppProperty("longitude"));
	
	private MqttHandler mqttHandler;
	
	public static final String REST_API_URL = "http://giv-gwot-va.uni-muenster.de:3000/";

	/**
	 * Stops the Thread to take measurements and closes the GPIO connections.
	 */
	@Override
	protected void destroyApp(boolean arg0) throws MIDletStateChangeException {
		shouldRun = false;
		if(hcsr04 != null)
			hcsr04.close();		
		
		if(mqttHandler.pubClient != null && mqttHandler.pubClient.isConnected()){
			try{
				mqttHandler.disconnect();
			} catch(MqttException ex){
				ex.printStackTrace();
			}
		}		
	}

	/**
	 * Initiates the GPIO Pins and starts a thread to take measurements.
	 */
	@Override
	protected void startApp() throws MIDletStateChangeException {
		
		
		// init ultrasound sensor
		try {
			hcsr04 = new HCSR04Device(TRIGGER_PIN, ECHO_PIN);
			System.out.println("Pins initiated.");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Unable to init Pins.");
		}
		
		//init gps sensor
		switch1 = new GPSSwitch();
		try {
			switch1.start();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			gps = new GPSCommSensor("ttyS0");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			Position pos = gps.getPosition();
			this.latitude = pos.getLatitude();
			this.longitude = pos.getLongitude();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// request configuration from server
		try{
			requestConfiguration();
		} catch(IOException ex){
			ex.printStackTrace();
			System.out.println("Unable to get configuration from server. Shutting down...");
			System.exit(0);
		}
		
		// init mqtt client
		try{
			mqttHandler = new MqttHandler(this.hcsr04);
			mqttHandler.start();
			System.out.println("Mqtt Client connected.");
		} catch(MqttException me){
			me.printStackTrace();
			System.out.println("Mqtt Client could not connect.");
		}
		
		
		startMeasuring();
	}
	
	
	/**
	 * Inner class to keep taking measurements from the sensors
	 * by running a Thread.
	 */
	class ReadSensors extends Thread {
		private double[] measurements = new double[10];
		
		@Override
		public void run(){
			while(shouldRun){

				for(int i = 0; i < measurements.length; i++){
					measurements[i] = hcsr04.pulse();
				}
				Arrays.sort(measurements);

				// use the modal as the measurement
				double avg = measurements[(int)(measurements.length / 2)];
				
				if(avg > 0){
					String message = JSONUtil.encodeObservation(hcsr04.getConfig().getSensorId(), Math.abs(hcsr04.getConfig().getWaterLevelReference() - avg), SensorMIDlet.this.getAppProperty("token"));
					mqttHandler.publish(message);
				}		
				try {
					Thread.sleep(hcsr04.getConfig().getDelay());
				} catch (InterruptedException ex) {
					ex.printStackTrace();
				}
			}
		}
	}
	
	// stops the measuring thread
	private void stopMeasuring(){
		if(sensorsTask.isAlive()){
			try{
				this.shouldRun = false;
				sensorsTask.join();
			} catch(InterruptedException ex){
				ex.printStackTrace();
			}			
		}
	}
	
	// (re)starts the measuring thread
	private void startMeasuring(){
		if(sensorsTask != null && sensorsTask.isAlive())
			stopMeasuring();
		this.shouldRun = true;
		sensorsTask = new ReadSensors();
		sensorsTask.start();
	}
	
	// requests the ids for the configuration via HTTP from the server
	private void requestConfiguration() throws IOException{
		// send post thing request
		String thing = HttpUtil.post(REST_API_URL + "api/things/", JSONUtil.encodePostThingRequest(
				latitude, longitude, this.getAppProperty("User-Id"), this.getAppProperty("token")));
		// send get features request
		String allFeatures = HttpUtil.get(REST_API_URL + "api/features/");
		
		if(!thing.isEmpty() && !allFeatures.isEmpty()){
			// decode ids returned from server
			String thingId = JSONUtil.decodePostThingRequest(thing);
			String featureId = JSONUtil.decodeGetFeaturesRequest(allFeatures);
			// if feature "water level" does not exist => create it
			if(featureId.isEmpty()){
				// create feature
				featureId = JSONUtil.decodePostFeatureRequest(HttpUtil.post(REST_API_URL + "api/features/", 
						JSONUtil.encodePostFeatureRequest("Water Level", "cm")));
			}
			hcsr04.getConfig().setThingId(thingId);
			if(!thingId.isEmpty() && !featureId.isEmpty()){
				// create sensor
				int interval = 5000;
				double refLevel = 0;
				double warnLevel = 5000;
				double riskLevel = 10000;
				String sensorId = JSONUtil.decodePostFeatureRequest(HttpUtil.post(REST_API_URL + "api/sensors/", 
						JSONUtil.encodePostSensorRequest("HCSR04 UltraSonic Water Gauge", thingId, featureId, interval, refLevel, warnLevel, riskLevel, this.getAppProperty("token"))));
				hcsr04.getConfig().setSensorId(sensorId);
				hcsr04.getConfig().setDelay(interval);
				hcsr04.getConfig().setWaterLevelReference(refLevel);
				hcsr04.getConfig().setWarnLevel(warnLevel);
				hcsr04.getConfig().setRiskLevel(riskLevel);
				hcsr04.getConfig().setRun(true);
				this.shouldRun = true;
				// print config and start measuring
				System.out.println("Configuration Complete!\n" + hcsr04.getConfig().toString());
			}
		}
	}

}
