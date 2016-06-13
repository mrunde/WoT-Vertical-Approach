package de.ifgi.gwot.SensorController;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import jdk.dio.DeviceManager;
import jdk.dio.DeviceNotFoundException;
import jdk.dio.InvalidDeviceConfigException;
import jdk.dio.UnavailableDeviceException;
import jdk.dio.UnsupportedDeviceTypeException;
import jdk.dio.gpio.GPIOPin;
import jdk.dio.gpio.GPIOPinConfig;

public class HCSR04Device {

	// #10 microseconds pulse = 10000ns
	private final int PULSE = 10000;
	// speed of sound = 34029 cm/s
	private final int SPEEDOFSOUND = 34029;
	// configuration
	private HCSR04Config configuration;

	private GPIOPin trigger = null;
	private GPIOPin echo = null;

	/**
	 * Constructor for HCSR04 Ultrasonic sensor handler.
	 * 
	 * @param _trigger
	 *            The GPIO Pin number of the trigger interface.
	 * @param _echo
	 *            The GPIO Pin number of the echo listener.
	 * @throws UnavailableDeviceException
	 * @throws DeviceNotFoundException
	 * @throws InvalidDeviceConfigException
	 * @throws IOException
	 * @throws UnsupportedDeviceTypeException
	 */
	public HCSR04Device(int _trigger, int _echo)
			throws UnavailableDeviceException, DeviceNotFoundException,
			InvalidDeviceConfigException, IOException,
			UnsupportedDeviceTypeException {

		this.configuration = new HCSR04Config();

		// Trigger Pin
		trigger = (GPIOPin) DeviceManager.open(new GPIOPinConfig.Builder()
				.setControllerNumber(0).setPinNumber(_trigger)
				.setDirection(GPIOPinConfig.DIR_OUTPUT_ONLY)
				.setDriveMode(GPIOPinConfig.MODE_OUTPUT_PUSH_PULL)
				.setTrigger(GPIOPinConfig.TRIGGER_NONE).setInitValue(false)
				.build());

		// Echo Pin
		echo = (GPIOPin) DeviceManager.open(new GPIOPinConfig.Builder()
				.setControllerNumber(0).setPinNumber(_echo)
				.setDirection(GPIOPinConfig.DIR_INPUT_ONLY)
				.setDriveMode(GPIOPinConfig.MODE_INPUT_PULL_UP)
				.setTrigger(GPIOPinConfig.TRIGGER_NONE).setInitValue(false)
				.build());

		try {
			Thread.sleep(500);
		} catch (InterruptedException ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * Sends a trigger to the sensor and waits for the echo. Calculates distance
	 * depending on the echo timespan.
	 * 
	 * @return Measured distance from object to sensor in cm.
	 */
	public double pulse() {
		long distance = 0;
		try {
			// send pulse trigger
			trigger.setValue(true);
			// wait 10 microseconds
			try {
				Thread.sleep(0, PULSE);
			} catch (InterruptedException ex) {
				ex.printStackTrace();
			}
			trigger.setValue(false);
			long starttime = System.nanoTime();
			long stop = starttime;
			long start = starttime;
			// echo will go 0 to 1 and need to save time for that. 2 seconds
			// difference
			while ((!echo.getValue())
					&& (start < starttime + 1000000000L * 2)) {
				start = System.nanoTime();
			}
			while ((echo.getValue()) && (stop < starttime + 1000000000L * 2)) {
				stop = System.nanoTime();
			}
			long delta = (stop - start);
			// echo from 0 to 1 depending on object distance
			distance = delta * SPEEDOFSOUND;
		} catch (IOException ex) {
			Logger.getGlobal().log(Level.WARNING, ex.getMessage());
		}
		return distance / 2.0 / (1000000000L); // cm/s
	}

	/**
	 * Closes the GPIO Pins used for trigger and echo.
	 */
	public void close() {
		try {
			if (trigger != null && echo != null) {
				trigger.close();
				echo.close();
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	public HCSR04Config getConfig() {
		return this.configuration;
	}

	/**
	 * Inner class providing metadata and configuration for the Sensor.
	 */
	class HCSR04Config {

		private String sensorId;
		private String thingId;
		private double latitude;
		private double longitude;
		private long delay;
		private double waterLevelReference;
		private double warnLevel;
		private double riskLevel;
		private boolean run;

		/**
		 * Creates a new Configuration file. By default the id is empty, the
		 * delay is set to 5 seconds and the sensor will not yet measure.
		 */
		HCSR04Config() {
			this.thingId = "";
			this.sensorId = "";
			this.delay = 5000L;
			this.warnLevel = 0;
			this.riskLevel = 0;
			this.run = false;
		}

		public String getSensorId() {
			return this.sensorId;
		}

		public void setSensorId(final String sensorId) {
			this.sensorId = sensorId;
		}

		public String getThingId() {
			return this.thingId;
		}

		public void setThingId(final String thingId) {
			this.thingId = thingId;
		}

		public double getLatitude() {
			return latitude;
		}

		public void setLatitude(final double latitude) {
			this.latitude = latitude;
		}

		public double getLongitude() {
			return longitude;
		}

		public void setLongitude(final double longitude) {
			this.longitude = longitude;
		}

		public long getDelay() {
			return delay;
		}

		public void setDelay(final long delay) {
			this.delay = delay;
		}

		public double getWaterLevelReference() {
			return waterLevelReference;
		}

		public void setWaterLevelReference(final double waterLevelReference) {
			this.waterLevelReference = waterLevelReference;
		}

		public double getWarnLevel() {
			return this.warnLevel;
		}

		public void setWarnLevel(final double warnLevel) {
			this.warnLevel = warnLevel;
		}

		public double getRiskLevel() {
			return this.riskLevel;
		}

		public void setRiskLevel(final double riskLevel) {
			this.riskLevel = riskLevel;
		}

		public boolean isRunning() {
			return this.run;
		}

		public void setRun(final boolean run) {
			this.run = run;
		}

		public String toString() {
			return "ThingId: " + getThingId() + ", SensorId: " + getSensorId()
					+ ", Latitude: " + getLatitude() + ", Longitude: "
					+ getLongitude() + ", Delay: " + getDelay()
					+ ", WaterLevelReference: " + getWaterLevelReference()
					+ ", Warn Level: " + getWarnLevel() + ", Risk Level: "
					+ getRiskLevel() + ", Running: " + isRunning();
		}

	}

}
