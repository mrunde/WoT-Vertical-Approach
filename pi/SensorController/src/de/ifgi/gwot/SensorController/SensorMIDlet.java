package de.ifgi.gwot.SensorController;
import java.io.IOException;
import java.util.HashMap;

import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttSecurityException;

import de.ifgi.gwot.SensorController.util.HttpUtil;
import de.ifgi.gwot.SensorController.util.JSONUtil;

public class SensorMIDlet extends MIDlet implements MqttCallback {
	
	HCSR04Device hcsr04;
	private static final int TRIGGER_PIN = 20;
	private static final int ECHO_PIN = 21;
	
	private volatile boolean shouldRun = false;
	private ReadSensors sensorsTask;
	
	private MqttClient pubClient;
	private int qualityOfService = 2;
	private String brokerURL = "giv-gwot-va.uni-muenster.de"; //has to be changed manually in the socket permission
	private int port = 1883;
	
	private static final String PUB_TOPIC = "measurements";
	private String sub_topic = "config";
	
	public static final String REST_API_URL = "http://giv-gwot-va.uni-muenster.de:3000/";

	/**
	 * Stops the Thread to take measurements and closes the GPIO connections.
	 */
	@Override
	protected void destroyApp(boolean arg0) throws MIDletStateChangeException {
		shouldRun = false;
		if(hcsr04 != null)
			hcsr04.close();
		
		if(pubClient != null && pubClient.isConnected()){
			try{
				pubClient.disconnect();
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
		
		try{
			String test = HttpUtil.get("http://giv-gwot-va.uni-muenster.de:3000/api/things/");
			System.out.println(test);
		} catch(IOException ex){
			ex.printStackTrace();
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
			initMqttClient();
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
		private double distance = 0.0;
		
		@Override
		public void run(){
			while(shouldRun){
				
				distance = hcsr04.pulse();
				if(distance > 0){
					String message = JSONUtil.encodeObservation(hcsr04.getHCSR04Config().getSensorId(), distance);
					try {
						publish(message);
					} catch (MqttException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}					
				I2CUtils.I2Cdelay((int)hcsr04.getHCSR04Config().getDelay());
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
		String thing = HttpUtil.post(REST_API_URL + "api/things/", JSONUtil.encodePostThingRequest(this.getAppProperty("User-Id")));
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
			hcsr04.getHCSR04Config().setThingId(thingId);
			if(!thingId.isEmpty() && !featureId.isEmpty()){
				// create sensor
				String sensorId = JSONUtil.decodePostFeatureRequest(HttpUtil.post(REST_API_URL + "api/sensors/", 
						JSONUtil.encodePostSensorRequest("HCSR04 UltraSonic Water Gauge", thingId, featureId)));
				hcsr04.getHCSR04Config().setSensorId(sensorId);
				hcsr04.getHCSR04Config().setRun(true);
				this.shouldRun = true;
				// print config and start measuring
				System.out.println("Configuration Complete!\n" + hcsr04.getHCSR04Config().toString());
				sub_topic += "/" + hcsr04.getHCSR04Config().getSensorId();
			}
		}
	}
	
	// connect to broker and subscribe to configuration channel
	private void initMqttClient() throws MqttSecurityException, MqttException{
		String clientId = "Sensor"; // + hcsr04.getHCSR04Config().getId();
		String url = "tcp://" + brokerURL + ":" + port;
		
		pubClient = new MqttClient(url, clientId);
		pubClient.setCallback(this);
		pubClient.connect();
		
		// connect to configuration channel
		pubClient.subscribe(sub_topic);
	}
	
	/**
	 * Publish a message to a MQTT server.
	 * @throws MqttException, IOException
	 */
	private void publish(String payload) throws MqttException, IOException{		
		// create and configure the message
		MqttMessage message = new MqttMessage(payload.getBytes());
		message.setQos(qualityOfService);
		
		// send the message to the server, control is not returned until
		// it has been delivered to the server meeting the specified qos
		pubClient.publish(PUB_TOPIC, message);
	}


	@Override
	public void connectionLost(Throwable cause) {
		System.out.println("Connection lost: " + cause.getMessage());		
	}

	@Override
	public void messageArrived(String topic, MqttMessage message)
			throws Exception {
		System.out.println("Message Arrived. ( " + topic + ", " + new String(message.getPayload()) + ")");
		
		if(topic.equals(sub_topic)){
			try{
				HashMap<String,Object> configs = JSONUtil.decodeConfiguration(new String(message.getPayload()));
				if(configs.containsKey("latitude"))	
					hcsr04.getHCSR04Config().setLatitude((double)configs.get("latitude"));
				if(configs.containsKey("longitude"))	
					hcsr04.getHCSR04Config().setLongitude((double)configs.get("longitude"));
				if(configs.containsKey("delay"))	
					hcsr04.getHCSR04Config().setDelay((long)configs.get("delay"));
				if(configs.containsKey("waterLevelReference"))	
					hcsr04.getHCSR04Config().setWaterLevelReference((double)configs.get("waterLevelReference"));
				if(configs.containsKey("run")) {
					boolean run = ((boolean)configs.get("run"));
					if(hcsr04.getHCSR04Config().isRunning() && !run){
						stopMeasuring();
					}
					else if(!hcsr04.getHCSR04Config().isRunning() && run){
						startMeasuring();
					}
					hcsr04.getHCSR04Config().setRun(run);
				}					
				
				System.out.println("Sensor Configuration changed! " + hcsr04.getHCSR04Config().toString());
			} catch(Exception ex){
				System.out.println("Corrupted configuration message!");
			}						
		}
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		 System.out.println("Delivery Complete (MessageID: " + token.getMessageId() + ").");		
	}

}
