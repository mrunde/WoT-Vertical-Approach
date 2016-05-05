package de.ifgi.gwot.SensorController.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;

import com.oracle.json.Json;
import com.oracle.json.JsonObject;
import com.oracle.json.JsonReader;


public class JSONUtil {
	
	/**
	 * Encodes an observation to Json.
	 * @param id The sensorId.
	 * @param value The measured value.
	 * @return Observation encoded as Json String.
	 */
	public static String encodeObservation(String id, double value){
		JsonObject observation = Json.createObjectBuilder()
				.add("sensorId", id)
				.add("date", DateUtil.getISO8601Date())
				.add("value", value)
				.build();
		return observation.toString();
	}
	
	/**
	 * Reads a json encoded configuration message for the sensor.
	 * If the api key is correct, the new configuration is decoded and
	 * returned.
	 * @param json The json encoded configuration String.
	 * @return HashMap containing the new configuration.
	 */
	public static HashMap<String,Object> decodeConfiguration(String json){		
		HashMap<String, Object> configs = new HashMap<String, Object>();
		
		InputStream input = new ByteArrayInputStream(json.getBytes());
		JsonReader reader = Json.createReader(input);		
		JsonObject jsonObject = reader.readObject();
		
		if(jsonObject.getString("key").equals("verticalintegration")){
			if(jsonObject.containsKey("latitude"))
				configs.put("latitude", jsonObject.getJsonNumber("latitude").doubleValue());
			if(jsonObject.containsKey("longitude"))
				configs.put("longitude", jsonObject.getJsonNumber("longitude").doubleValue());
			if(jsonObject.containsKey("delay"))
				configs.put("delay", jsonObject.getJsonNumber("delay").longValue());
			if(jsonObject.containsKey("waterLevelReference"))
				configs.put("waterLevelReference", jsonObject.getJsonNumber("waterLevelReference").doubleValue());
		}
		
		return configs;
	}

}
