package de.ifgi.gwot.SensorController.gps;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;


/**
 * Common code for GPS sensor. This is an abstract class
 * so the implementation of the readDataLine method can be implemented in
 * subclasses that can use different methods to communicate with the GPS
 * receiver.
 *
 */
public abstract class GPSSensor implements AutoCloseable {

  private static final String POSITION_TAG = "GPGGA";

  private final ArrayList<String> fields = new ArrayList<>();
  protected BufferedReader serialBufferedReader;
  
  private GPSSwitch gpsswitch;
  
  public GPSSensor() throws IOException {
	  this.gpsswitch = new GPSSwitch();
	  this.gpsswitch.start();
  }

  /**
   * Get a line of raw data from the GPS sensor
   *
   * @return The complete line of data
   * @throws IOException If there is an IO error
   */
  protected String readDataLine() throws IOException {
    String dataLine = null;

    /**
     * All data lines start with a '$' character so keep reading until we find a
     * valid line of data
     */
    do {
      dataLine = serialBufferedReader.readLine();

      /* Got a valid line, so break out of the loop */
      if (dataLine.startsWith("$") && checkCheckSum(dataLine)) {
        break;
      }
    } while (true);

    /* Return what we got */
    return dataLine;
  }

  /**
   * Get a string of raw data from the GPS receiver. How this happens is
   * sub-class dependent.
   *
   * @param type The type of data to be retrieved
   * @return A line of data for that type
   * @throws IOException If there is an IO error
   */
  public String getRawData(String type) throws IOException {
    boolean foundGGAData = false;
    String dataLine = null;

    do {
      /**
       * Retrieve a line with the appropriate tag. Return null in the case of an
       * error
       */
      try {
        dataLine = readDataLine();
      } catch (IOException ex) {
        return null;
      }

      /* Extract the type of the data */
      String dataType = dataLine.substring(1, 6);

      /* If this is the type we're looking break out of the loop */
      if (dataType.compareTo(type) == 0) {
        break;
      }
    } while (!foundGGAData);

    return dataLine.substring(7);
  }

  /**
   * Get the current position
   *
   * @return The position data
   * @throws IOException If there is an IO error
   */
  public Position getPosition() throws IOException {
    String rawData;
    long timeStamp = 0;
    double latitude = 0;
    double longitude = 0;
    double altitude = 0;
    char latitudeDirection = 0;
    char longitudeDirection = 0;

    /* Read data repeatedly, until we have valid data */
    while (true) {
      rawData = getRawData(POSITION_TAG);
      System.out.println(rawData);

      /* Handle situation where we didn't get data */
      if (rawData == null) {
          System.out.println("NULL position data received");
        continue;
      }

      if (rawData.contains("$GP")) {
        System.out.println("Corrupt position data");
        continue;
      }

      int fieldCount = splitCSVString(rawData);

      /**
       * The position data must have 10 fields to it to be valid, so reject the
       * data if we don't have the correct number
       */
      if (fieldCount < 10) {
        System.out.println("Incorrect position field count");
        continue;
      }

      /* Record a time stamp for the reading */
      Date now = new Date();
      timeStamp = now.getTime() / 1000;

      /**
       * Parse the relevant fields into values that we can use to create a new
       * Position object.
       */
      try {
        latitude = Double.parseDouble(fields.get(1));
        latitudeDirection = fields.get(2).toCharArray()[0];
      } catch (NumberFormatException nfe) {
        System.out.println("Badly formatted latitude number: " + nfe);
        continue;
      }

      try {
        //longitude = Double.parseDouble(fields.get(3)) / 100;
        longitude = Double.parseDouble(fields.get(3));
        longitudeDirection = fields.get(4).toCharArray()[0];
      } catch (NumberFormatException nfe) {
        System.out.println("Badly formatted longitude number: " + nfe);
        continue;
      }

      try {
        altitude = Double.parseDouble(fields.get(8));
      } catch (NumberFormatException nfe) {
        System.out.println("Badly formatted altitude number: " + nfe);
        continue;
      }

      /* Passed all the tests so we have valid data */
      break;
    }

    /* Return the encapsulated data */
    return new Position(timeStamp, latitude, latitudeDirection,
            longitude, longitudeDirection, altitude);
  }

  /**
   * Break a comma separated value string into its individual fields. We need to
   * have this as explicit code because Java ME does not support String.split or
   * java.util.regex and StringTokenizer has a bug that affects empty fields.
   *
   * @param input The CSV input string
   * @return The number of fields extracted
   */
  private int splitCSVString(String input) {
    /* Clear the list of data fields */
    fields.clear();
    int start = 0;
    int end;

    while ((end = input.indexOf(",", start)) != -1) {
      fields.add(input.substring(start, end));
      start = end + 1;
    }

    return fields.size();
  }

  /**
   * Check a NMEA sentence
   *
   * @param dataLine one NMEA sentence
   * @return true if CRC is correct
   * @author Peter.Kutschera@gmx.at
   */
  private boolean checkCheckSum(String dataLine) {
    boolean debug = false;
    if (debug) {
      System.err.println("dataline: " + dataLine);
    }
    if (dataLine == null) {
      // no dataLine at all
      return false;
    }
    if (dataLine.length() < 9) {
      // $GPxxx*ss is the absolute minimum
      return false;
    }
    if (!dataLine.startsWith("$")) {
      // dataLine needs to start with $
      return false;
    }
    int indexStar = dataLine.indexOf('*');
    if (indexStar < 0) {
      // and there needs to ba a * near the end of the line
      return false;
    }
    String crcActual = dataLine.substring(indexStar + 1);
    if (debug) {
      System.err.println("crcActual:     " + crcActual);
    }
    if (crcActual.length() != 2) {
      // The checksum is 2 characters
      return false;
    }
    // lets calculate the checksum: XOR all characters between $ and *
    char crc = 0;
    for (int i = 1; i < indexStar; i++) {
      crc ^= dataLine.charAt(i);
    }
    // Make a 2 digit hex string
    String crcCalculated = ("00" + Integer.toHexString(crc & 0xFF));
    crcCalculated = crcCalculated.substring(crcCalculated.length() - 2);
    if (debug) {
      System.err.println("crcCalcualted: " + crcCalculated);
    }
    // CRCs need to match
    return crcActual.equalsIgnoreCase(crcCalculated);
  }

}
