package de.ifgi.gwot.SensorController.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;

import com.oracle.json.Json;
import com.oracle.json.JsonObject;
import com.oracle.json.JsonReader;


public class JSONUtil {
	
	public static String encodeObservation(String id, String uom, double value, double lat, double lon){
		return "";
	}
	
	public static HashMap<String,Object> decodeConfiguration(String json) throws Exception{		
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
