Here you can find the source code for the Raspberry Pi's architecture.

## Running the SensorController from Eclipse IDE

* Instructions for Raspberry Pi
	* Download *Java ME Embedded* from the [Oracle Website](http://www.oracle.com/technetwork/java/embedded/javame/embed-me/downloads/java-embedded-java-me-download-2162242.html "Java ME Embedded Download") and install it on your Raspberry Pi.
	* Run *Java ME Embedded* on the Pi. Navigate to your installation directory and run `sudo .\usertest.sh`.
* Instructions for Eclipse IDE
	* Install the *Oracle Java ME SDK* on your computer. You can find the SDKs on the [Oracle Website](http://www.oracle.com/technetwork/java/embedded/javame/javame-sdk/downloads/index.html?ssSourceSiteId=ocomen "Java ME SDK Download"). 
	* In Eclipse, install the *Oracle Java ME SDK Eclipse Plugin*
	* Change to the Java ME Perspective by selecting "*Window* -> *Perspective* -> *Open Perspective* -> *Java ME*".
	* Import the *SensorController* as *Java ME Project*
	* Make sure the Raspberry Pi is connected to your computer via the *Device Connections Manager*. If your device is not yet connected, add the connection with the *Device Connections Manager*. The *Device Connections Manager* is installed with the *Oracle Java ME SDK*. You can add connections by selecting *Add new device connection...*.
	* In Eclipse, change the execution environment to your Pi. Open the *Application Descriptor* and in the Overview Tab select "*Add...* -> *Manage Devices...* -> *Manual Install...*". In the *Manual Device Installation* Dialog select *Browse* and browse to your *Java ME SDK* installation directory. Close the *Preferences* Dialog and in the Device Selection of the *Add Configuration* Dialog select your Raspberry Pi.
	* If you start the *SensorController* now, it will be temporarily installed and executed on the Raspberry Pi.
* Further assistance:
	* Refer to [this tutorial](https://docs.oracle.com/javame/8.0/get-started-rpi/toc.htm "Java ME Embedded Getting Started Guide") if you have problems installing *Java ME Embedded* on the Raspberry Pi.
	* Refer to [this tutorial](https://docs.oracle.com/javame/config/cldc/rel/3.3/win/gs/html/getstart_win32/toc.htm "Java ME Embedded Getting Started Guide") if you want to learn more about developing with the *Java ME SDK* or if you are using NetBeans.
	* Refer to [this tutorial](http://www.oracle.com/webfolder/technetwork/tutorials/obe/java/RaspberryPi_Setup/RaspberryPi_Setup.html "Configuring the Raspberry Pi as an Oracle Jave ME Embedded Development Platform") if you have problems connecting the Raspberry Pi to your IDE or if you are using NetBeans.

## Deploying the SensorController on the Raspberry Pi

* Export the *SensorController* as *MIDlet Package*. If you are using Eclipse, you can use the *Export* Dialog.
* Move the resulting *.jar* and *.jad* files to your Raspberry Pi, for example by using `pscp`.
* Install the *SensorController* by running `[path to your Java ME directory]/installSuite.sh [path to SensorController.jar]`. If the installation is successful, a *MIDlet ID* is returned.
* You can now run the *SensorController* by typing `[path to your Java ME directory]/runSuite.sh [MIDlet ID]`. If you forget the *MIDlet ID* you can check all installed MIDlets by running `[path to your Java ME directory]/listMidlets.sh`.  
* The *SensorController* will start up.

