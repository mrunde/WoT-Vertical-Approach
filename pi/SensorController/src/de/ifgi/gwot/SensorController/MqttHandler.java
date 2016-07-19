package de.ifgi.gwot.SensorController;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttSecurityException;

import com.oracle.json.Json;
import com.oracle.json.JsonObject;
import com.oracle.json.JsonReader;

public class MqttHandler extends Thread implements MqttCallback {

	protected MqttClient pubClient;
	private int qualityOfService = 2;
	private String brokerURL = "giv-gwot-va.uni-muenster.de"; // has to be changed manually in the socket permission
	private int port = 1883;

	private static final String PUB_TOPIC = "measurements";
	private String sub_topic;

	private HCSR04Device hcsr04Device;
	private MessageQueue messageQueue;

	/**
	 * Creates a MqttHandler. For each sensor of a thing,
	 * a new instance of this class has to be created.
	 * @param sensor The sensor to publish messages of and receive config messages for.	 * 
	 * @throws MqttSecurityException
	 * @throws MqttException
	 */
	public MqttHandler(HCSR04Device sensor)
			throws MqttSecurityException, MqttException {
		this.hcsr04Device = sensor;
		this.messageQueue = new MessageQueue();
		initMqttClient();
	}

	// connect to broker and subscribe to configuration channel
	private void initMqttClient() throws MqttSecurityException, MqttException {
		String clientId = "Sensor";
		String url = "tcp://" + brokerURL + ":" + port;

		pubClient = new MqttClient(url, clientId);
		pubClient.setCallback(this);
		pubClient.connect();

		// connect to configuration channel
		this.sub_topic = "config/" + hcsr04Device.getConfig().getSensorId();
		pubClient.subscribe(this.sub_topic);
	}
	
	/**
	 * Add a new message to the publish queue.
	 * @param message The message to add to the queue.
	 */
	public void publish(String message) {
		this.messageQueue.enqueue(message);
	}
	
	/**
	 * Disconnect client from Mqtt Broker.
	 * @throws MqttException
	 */
	public void disconnect() throws MqttException{
		pubClient.disconnect();
	}

	// tries to send a message to the broker
	private void sendMessage() {
		try {
			// create and configure the message
			MqttMessage message = new MqttMessage(
					messageQueue.front().getBytes());
			message.setQos(qualityOfService);
			// send the message to the server, control is not returned until
			// it has been delivered to the server meeting the specified qos
			pubClient.publish(PUB_TOPIC, message);
			messageQueue.dequeue();
		} catch (MqttException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void connectionLost(Throwable cause) {
		System.out.println("Connection lost: " + cause.getMessage());
	}

	@Override
	public void messageArrived(String topic, MqttMessage message)
			throws Exception {
		System.out.println("Message Arrived. ( " + topic + ", "
				+ new String(message.getPayload()) + ")");
		
		try{
			InputStream input = new ByteArrayInputStream(new String(message.getPayload()).getBytes());
			JsonReader reader = Json.createReader(input);	
			JsonObject jsonObject = reader.readObject();
			
			if(jsonObject.containsKey("refLevel")){
				hcsr04Device.getConfig().setWaterLevelReference(jsonObject.getJsonNumber("refLevel").doubleValue());
			}
			if(jsonObject.containsKey("warnLevel")){
				hcsr04Device.getConfig().setWarnLevel(jsonObject.getJsonNumber("warnLevel").doubleValue());
			}
			if(jsonObject.containsKey("riskLevel")){
				hcsr04Device.getConfig().setRiskLevel(jsonObject.getJsonNumber("riskLevel").doubleValue());
			}
			if(jsonObject.containsKey("interval")){
				hcsr04Device.getConfig().setDelay(jsonObject.getJsonNumber("warnLevel").longValue());
			}
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
		System.out.println(hcsr04Device.getConfig().toString());
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		System.out.println(
				"Delivery Complete (MessageID: " + token.getMessageId() + ").");
	}

	@Override
	public void run() {
		while (true) {
			while (!messageQueue.isEmpty()) {
				sendMessage();
			}
			
			try{
				Thread.sleep(hcsr04Device.getConfig().getDelay());
			} catch(InterruptedException ex){
				ex.printStackTrace();
			}
		}
	}

}
