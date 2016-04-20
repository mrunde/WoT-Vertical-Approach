package de.ifgi.gwot.SensorController;
import java.io.IOException;

import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SensorMIDlet extends MIDlet implements MqttCallback {
	
	HCSR04Device hcsr04;
	private static final int TRIGGER_PIN = 20;
	private static final int ECHO_PIN = 21;
	
	private volatile boolean shouldRun = true;
	private ReadSensors sensorsTask;
	
	private MqttClient pubClient;
	private int qualityOfService = 2;
	private String brokerURL = "195.37.120.26"; //has to be changed manually in the socket permission
	private int port = 1883;

	/**
	 * Stops the Thread to take measurements and closes the GPIO connections.
	 */
	@Override
	protected void destroyApp(boolean arg0) throws MIDletStateChangeException {
		shouldRun = false;
		hcsr04.close();
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
					System.out.println("Object detected at " + distance + " cm.");
					// TODO: adjust to api
					String message = "{"
							+ "\"id\":\"" + hcsr04.getHCSR04Config().getId() + "\","
							+ "\"timestamp\":" + System.currentTimeMillis() + ","
							+ "\"unitOfMeasurement\":" + "\"cm\"" + ","
							+ "\"value\":" + distance + ","
							+ "\"position\": {" + 
								"\"latitude\":" + hcsr04.getHCSR04Config().getLatitude() + "," +
								"\"longitude\":" + hcsr04.getHCSR04Config().getLongitude() + "}"
							+ "}";
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
		String pubTopic = "measurements";
		
		String url = "tcp://" + brokerURL + ":" + port;
		
		pubClient = new MqttClient(url, clientId);
		pubClient.setCallback(this);
		pubClient.connect();
		
		// create and configure the message
		MqttMessage message = new MqttMessage(payload.getBytes());
		message.setQos(qualityOfService);
		
		// send the message to the server, control is not returned until
		// it has been delivered to the server meeting the specified qos
		pubClient.publish(pubTopic, message);
		
		// disconnect the client from the server
		pubClient.disconnect();
		pubClient = null;
	}


	@Override
	public void connectionLost(Throwable cause) {
		System.out.println("Connection lost: " + cause.getMessage());		
	}

	@Override
	public void messageArrived(String topic, MqttMessage message)
			throws Exception {
		System.out.println("Message Arrived. ( " + topic + ", " + new String(message.getPayload()) + ")");
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		System.out.println("Delivery Complete (MessageID: " + token.getMessageId() + ").");		
	}

}
