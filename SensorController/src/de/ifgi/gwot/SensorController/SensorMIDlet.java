package de.ifgi.gwot.SensorController;
import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;

public class SensorMIDlet extends MIDlet {
	
	HCSR04Device hcsr04;
	private static final int TRIGGER_PIN = 20;
	private static final int ECHO_PIN = 21;
	
	private volatile boolean shouldRun = true;
	private ReadSensors sensorsTask;
	// time between measurements
	private int delay = 5000;

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
				if(distance > 0)
//					MQTTPublisher.publish(new String(distance + ""));
					System.out.println("Object detected at " + distance + " cm.");
				I2CUtils.I2Cdelay(delay);
			}
		}
	}

}
