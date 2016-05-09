package de.ifgi.gwot.SensorController.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;

import com.oracle.json.Json;
import com.oracle.json.JsonArray;
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
	 * Encodes a request to create a new thing
	 * in Json.
	 * @return Body of Thing.Post Request as Json String.
	 */
	public static String encodePostThingRequest(){
		JsonObject register = Json.createObjectBuilder()
				.add("name", "HCSR04Sensor")
				.add("loc", Json.createObjectBuilder()
						.add("type", "Point")
						.add("coordinates", Json.createArrayBuilder()
								.add(51.969113)
								.add(7.595793)))
				.add("userId", "573091fbc9c43a042017eeb2")
				.build();

		return register.toString();
	}
	
	/**
	 * Decodes the response of the Thing.Post server request 
	 * and returns the id of the thing returned.
	 * @param response Server Response String.
	 * @return ThingId of Thing returned from server.
	 */
	public static String decodePostThingRequest(String response){
		InputStream input = new ByteArrayInputStream(response.getBytes());
		JsonReader reader = Json.createReader(input);
		JsonObject jsonObject = reader.readObject();
		
		return jsonObject.getString("_id");
	}
	
	/**
	 * Encodes the body of a post request to create a new Feature.
	 * @param description Feature description.
	 * @param unitOfMeasurement Unit of Measurement.
	 * @return The body of the request as json string.
	 */
	public static String encodePostFeatureRequest(String description, String unitOfMeasurement){
		JsonObject feature = Json.createObjectBuilder()
				.add("name", description)
				.add("unit", unitOfMeasurement)
				.build();

		return feature.toString();
	}
	
	/**
	 * Decodes the response of a post feature request and returns the 
	 * id of the feature created.
	 * @param response The server response.
	 * @return The Feature id.
	 */
	public static String decodePostFeatureRequest(String response){
		InputStream input = new ByteArrayInputStream(response.getBytes());
		JsonReader reader = Json.createReader(input);
		JsonObject jsonObject = reader.readObject();
		
		return jsonObject.getString("_id");
	}
	
	
	/**
	 * Decodes the server response of a GET all features request.
	 * The features returned are searched for a specific description.
	 * If a feature is found, its id is returned. Else, an emptry string
	 * is returned.
	 * @param response The server response.
	 * @return The id of the feature or an empty string.
	 */
	public static String decodeGetFeaturesRequest(String response){
		InputStream input = new ByteArrayInputStream(response.getBytes());
		JsonReader reader = Json.createReader(input);
		JsonArray jsonArr = reader.readArray();
		
		for(int i = 0; i < jsonArr.size(); i++){
			JsonObject jsonO = jsonArr.getJsonObject(i);
			if(jsonO.containsKey("name") && jsonO.getString("name").toLowerCase().equals("water level")){
				return jsonO.getString("_id");
			}
		}
		return "";
	}
	
	/**
	 * Encodes a POST sensor request.
	 * @param description Sensor description.
	 * @param thingId Id of the sensor thing.
	 * @param featureId Id of the feature observed.
	 * @return The POST body as json string.
	 */
	public static String encodePostSensorRequest(String description, String thingId, String featureId){
		JsonObject sensor = Json.createObjectBuilder()
				.add("name", description)
				.add("thingId", thingId)
				.add("featureId", featureId)
				.build();
		return sensor.toString();
	}
	
	
	/**
	 * Decodes a POST sensor request and returns the id of the
	 * new sensor.
	 * @param response The server response.
	 * @return The id of the new sensor.
	 */
	public static String decodePostSensorRequest(String response){
		InputStream input = new ByteArrayInputStream(response.getBytes());
		JsonReader reader = Json.createReader(input);
		JsonObject jsonObject = reader.readObject();
		
		return jsonObject.getString("_id");
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
		
		if(jsonObject.getString("apikey").equals("verticalintegration")){
			if(jsonObject.containsKey("latitude"))
				configs.put("latitude", jsonObject.getJsonNumber("latitude").doubleValue());
			if(jsonObject.containsKey("longitude"))
				configs.put("longitude", jsonObject.getJsonNumber("longitude").doubleValue());
			if(jsonObject.containsKey("delay"))
				configs.put("delay", jsonObject.getJsonNumber("delay").longValue());
			if(jsonObject.containsKey("waterLevelReference"))
				configs.put("waterLevelReference", jsonObject.getJsonNumber("waterLevelReference").doubleValue());
			if(jsonObject.containsKey("run"))
				configs.put("run", jsonObject.getBoolean("run", true));
		} else{
			System.out.println("Wrong API Key.");
		}
		
		return configs;
	}

}
