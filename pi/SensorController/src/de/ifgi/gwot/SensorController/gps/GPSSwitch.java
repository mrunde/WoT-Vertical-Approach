/**
 * 
 */
package de.ifgi.gwot.SensorController.gps;

import java.io.IOException;

import jdk.dio.ClosedDeviceException;
import jdk.dio.DeviceManager;
import jdk.dio.UnavailableDeviceException;
import jdk.dio.gpio.GPIOPin;
import jdk.dio.gpio.GPIOPinConfig;

/**
 * 
 *
 */
public class GPSSwitch {
	private static final int Switch_Pin = 5;
	private GPIOPin switch1;
	private boolean switchState = true;
	
	public void start() throws IOException {
		// Open the Switch-GPIO-Pin (Output)
		switch1 = DeviceManager.open(new GPIOPinConfig.Builder()
				.setControllerNumber(0).setPinNumber(Switch_Pin)
				.setDirection(GPIOPinConfig.DIR_OUTPUT_ONLY)
				.setDriveMode(GPIOPinConfig.MODE_OUTPUT_PUSH_PULL)
				.setTrigger(GPIOPinConfig.TRIGGER_NONE).setInitValue(false)
				.build());
		
		try{
			Thread.sleep(5000);
		} catch(InterruptedException ex) {
			ex.printStackTrace();
		}
		
	}
	
	public void close() {
		try{
			if (switch1 != null){
				switch1.setValue(false);
				switch1.close();
			}
		}
		catch (IOException ioex){
			System.out.println("Exception closing Switch-Pin:" + ioex);
		}
	}
	
	/**
	 * Method for activating the GPS-Sensor
	 * @throws UnavailableDeviceException
	 * @throws ClosedDeviceException
	 * @throws IOException
	 */
	public void setSwitchOn() throws UnavailableDeviceException, ClosedDeviceException, IOException{
		switch1.setValue(false);
		this.switchState = true; 
	}
	
	/**
	 * Method for deactivating the GPS-Sensor
	 * @throws UnavailableDeviceException
	 * @throws ClosedDeviceException
	 * @throws IOException
	 */
	public void setSwitchOff() throws UnavailableDeviceException, ClosedDeviceException, IOException {
		switch1.setValue(true);
		this.switchState = false; 
	}
	
	/**
	 * Function for checking the GPS-Switch-State
	 * @return Switch state as Boolean
	 * @throws UnavailableDeviceException
	 * @throws ClosedDeviceException
	 * @throws IOException
	 */
	public boolean getSwitchState() throws UnavailableDeviceException, ClosedDeviceException, IOException{
		if (switchState){
			return true;
		}
		else {
			return false;
		}
	}

}
