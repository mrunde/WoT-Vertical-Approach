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

	private GPIOPin trigger = null;
	private GPIOPin echo = null;

	/**
	 * Constructor for HCSR04 Ultrasonic sensor handler.
	 * @param _trigger The GPIO Pin number of the trigger interface.
	 * @param _echo The GPIO Pin number of the echo listener.
	 * @throws UnavailableDeviceException
	 * @throws DeviceNotFoundException
	 * @throws InvalidDeviceConfigException
	 * @throws IOException
	 * @throws UnsupportedDeviceTypeException
	 */
	public HCSR04Device(int _trigger, int _echo) 
			throws UnavailableDeviceException, DeviceNotFoundException, InvalidDeviceConfigException, IOException, UnsupportedDeviceTypeException {

		// Trigger Pin
		trigger = (GPIOPin) DeviceManager.open(new GPIOPinConfig.Builder().setControllerNumber(0)
				.setPinNumber(_trigger).setDirection(GPIOPinConfig.DIR_OUTPUT_ONLY)
				.setDriveMode(GPIOPinConfig.MODE_OUTPUT_PUSH_PULL).setTrigger(GPIOPinConfig.TRIGGER_NONE)
				.setInitValue(false).build());

		// Echo Pin
		echo = (GPIOPin) DeviceManager.open(new GPIOPinConfig.Builder().setControllerNumber(0).setPinNumber(_echo)
				.setDirection(GPIOPinConfig.DIR_INPUT_ONLY).setDriveMode(GPIOPinConfig.MODE_INPUT_PULL_UP)
				.setTrigger(GPIOPinConfig.TRIGGER_NONE).setInitValue(false).build());
		
		I2CUtils.I2Cdelay(500);
	}

	/**
	 * Sends a trigger to the sensor and waits for the echo.
	 * Calculates distance depending on the echo timespan.
	 * @return Measured distance from object to sensor in cm.
	 */
	public double pulse() {
		long distance = 0;
		try {
			// send pulse trigger
			trigger.setValue(true); 
			// wait 10 microseconds						
			I2CUtils.I2CdelayNano(0, PULSE);
			trigger.setValue(false);
			long starttime = System.nanoTime();
			long stop = starttime;
			long start = starttime;
			// echo will go 0 to 1 and need to save time for that. 2 seconds difference
			while ((!echo.getValue()) && (start < starttime + 1000000000L * 2)) {
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

}
