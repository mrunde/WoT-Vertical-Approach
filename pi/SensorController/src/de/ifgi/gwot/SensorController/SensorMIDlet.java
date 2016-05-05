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

import de.ifgi.gwot.SensorController.util.JSONUtil;

public class SensorMIDlet extends MIDlet implements MqttCallback {
	
	HCSR04Device hcsr04;
	private static final int TRIGGER_PIN = 20;
	private static final int ECHO_PIN = 21;
	
	private volatile boolean shouldRun = true;
	private ReadSensors sensorsTask;
	
	private MqttClient pubClient;
	private int qualityOfService = 2;
	private String brokerURL = "giv-gwot-va.uni-muenster.de"; //has to be changed manually in the socket permission
	private int port = 1883;
	
	private static final String PUB_TOPIC = "measurements";
	private static final String SUB_TOPIC = "config";

	/**
	 * Stops the Thread to take measurements and closes the GPIO connections.
	 */
	@Override
	protected void destroyApp(boolean arg0) throws MIDletStateChangeException {
		shouldRun = false;
		hcsr04.close();
		
		if(pubClient.isConnected()){
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
		sensorsTask = new ReadSensors();
		sensorsTask.start();
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
					String message = JSONUtil.encodeObservation(hcsr04.getHCSR04Config().getId(), distance);
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
	
	/**
	 * Publish a message to a MQTT server.
	 * @throws MqttException, IOException
	 */
	private void publish(String payload) throws MqttException, IOException{
		String clientId = "Sensor" + hcsr04.getHCSR04Config().getId();
		
		String url = "tcp://" + brokerURL + ":" + port;
		
		pubClient = new MqttClient(url, clientId);
		pubClient.setCallback(this);
		pubClient.connect();
		
		// connect to configuration channel
		pubClient.subscribe(SUB_TOPIC + "/" + hcsr04.getHCSR04Config().getId());
		
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
		
		if(topic.equals(SUB_TOPIC + "/" + hcsr04.getHCSR04Config().getId())){
			try{
				HashMap<String,Object> configs = JSONUtil.decodeConfiguration(new String(message.getPayload()));
				if(configs.containsKey("latitude"))	hcsr04.getHCSR04Config().setLatitude((double)configs.get("latitude"));
				if(configs.containsKey("longitude"))	hcsr04.getHCSR04Config().setLongitude((double)configs.get("longitude"));
				if(configs.containsKey("delay"))	hcsr04.getHCSR04Config().setDelay((long)configs.get("delay"));
				if(configs.containsKey("waterLevelReference"))	hcsr04.getHCSR04Config().setWaterLevelReference((double)configs.get("waterLevelReference"));
			
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
