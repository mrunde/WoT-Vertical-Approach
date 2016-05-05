package de.ifgi.gwot.SensorController.util;

import java.util.Calendar;
import java.util.TimeZone;

public class DateUtil {
	
	
	/**
	 * Returns the current default time in
	 * ISO8601 encoding. Time is returned as
	 * Central European Time.
	 * @return Current Time as ISO8601 String.
	 */
	public static String getISO8601Date(){
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		
		int seconds = calendar.get(Calendar.SECOND);
		int minutes = calendar.get(Calendar.MINUTE);
		int hours = calendar.get(Calendar.HOUR_OF_DAY);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);
		
		String isodate = fillZero(year) + "-" + fillZero(month) + "-" + fillZero(day) + "T" + 
				fillZero(hours) + ":" + fillZero(minutes) + ":" + fillZero(seconds) + "+01:00";
		
		return isodate;
	}
	
	// inserts leading zeros for numbers < 10
	private static String fillZero(int number){
		if(number < 10)
			return "0" + number;
		return number + "";
	}
}