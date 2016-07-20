package de.ifgi.gwot.SensorController.gps;

/**
 * The current position of the GPS sensor
 *
 */
public class Position {

    private final long timeStamp;
    private final double latitude;
    private final char latitudeDirection;
    private final double longitude;
    private final char longitudeDirection;
    private final double altitude;

    /**
     * Constructor
     *
     * @param time The current time
     * @param latitude The latitude of this position
     * @param latitudeDirection Direction of longitude
     * @param longitude The longitude of this position
     * @param longitudeDirection Direction of latitude
     * @param altitude The altitude of this position
     */
    public Position(long time, double latitude, char latitudeDirection,
            double longitude, char longitudeDirection, double altitude) {
        this.timeStamp = time;
        this.latitude = latitude;
        this.latitudeDirection = latitudeDirection;
        this.longitude = longitude;
        this.longitudeDirection = longitudeDirection;
        this.altitude = altitude;
    }

    /**
     * Get the time this position was recorded
     *
     * @return The time this position was recorded in seconds from the epoch
     */
    public long getTime() {
        return timeStamp;
    }

    /**
     * Get the current latitude
     *
     * @return The latitude in decimal degrees
     */
    public double getLatitude() {
        return latitude;
    }

    /**
     * Get the direction of latitude (N or S)
     *
     * @return The latitude direction as a single character
     */
    public char getLatitudeDirection() {
        return latitudeDirection;
    }

    /**
     * Get the longitude
     *
     * @return The longitude in decimal degrees
     */
    public double getLongitude() {
        return longitude;
    }

    /**
     * Get the longitude direction (E or W)
     *
     * @return The longitude direction as a single character
     */
    public char getLongitudeDirection() {
        return longitudeDirection;
    }

    /**
     * Get the altitude (in meters above sea level)
     *
     * @return The altitude in meters above sea level
     */
    public double getAltitude() {
        return altitude;
    }

    /**
     * Get the data in the right format for the client
     *
     * @return A formatted data string
     */
    @Override
    public String toString() {
        return String.format("timestamp: %d\n"
                + "latitude: %s%c\n"
                + "longitude: %s%c\n"
                + "altitude: %.2f meters",
                timeStamp,
                decimalToDMS(latitude),
                latitudeDirection,
                decimalToDMS(longitude),
                longitudeDirection,
                altitude);
    }

    /*
     * Convert a NMEA decimal-decimal degree value into degrees/minutes/seconds
     * First. convert the decimal-decimal value to a decimal:
     * 5144.3855 (ddmm.mmmm) = 51 44.3855 = 51 + 44.3855/60 = 51.7397583 degrees
     * 
     * Then convert the decimal to degrees, minutes seconds:
     * 51 degress + .7397583 * 60 = 44.385498 = 44 minutes 
     * .385498 = 23.1 seconds
     * Result: 51 44' 23.1"
     *
     * @return String value of the decimal degree, using the proper units 
     */
    private String decimalToDMS(double value) {
        String result = null;
        double degValue = value / 100;
        int degrees = (int) degValue;
        double decMinutesSeconds = ((degValue - degrees)) / .60;
        double minuteValue = decMinutesSeconds * 60;
        int minutes = (int) minuteValue;
        double secsValue = (minuteValue - minutes) * 60;
        result = degrees + "\u00B0" + " " + minutes + "' " + String.format("%.1f", secsValue) + "\" ";
        return result;
    }
}
