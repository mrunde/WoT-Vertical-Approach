package de.ifgi.gwot.MQTT;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;


public class MQTTPublisher {
	
	private static final String TOPIC = "Measurements";
	private static final String BROKER = "tcp://iot.eclipse.org:1883";
	
	/**
	 * Publishes a message to the Broker.
	 * @param measurement The message to publish.
	 */
	public static void publish(String measurement){
        int qos             = 0;
        String clientId     = "RaspPi";
        MemoryPersistence persistence = new MemoryPersistence();

        try {
            MqttClient mqttClient = new MqttClient(BROKER, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: "+BROKER);
            mqttClient.connect(connOpts);
            System.out.println("Connected");
            System.out.println("Publishing message: " + measurement);
            MqttMessage message = new MqttMessage(measurement.getBytes());
            message.setQos(qos);
            mqttClient.publish(TOPIC, message);
            System.out.println("Message published");
            mqttClient.disconnect();
            System.out.println("Disconnected");
            System.exit(0);
        } catch(MqttException me) {
            System.out.println("reason "+me.getReasonCode());
            System.out.println("msg "+me.getMessage());
            System.out.println("loc "+me.getLocalizedMessage());
            System.out.println("cause "+me.getCause());
            System.out.println("excep "+me);
            me.printStackTrace();
        }
	}

}
