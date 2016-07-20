package de.ifgi.gwot.SensorController.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.oracle.json.Json;
import com.oracle.json.JsonArray;
import com.oracle.json.JsonObject;
import com.oracle.json.JsonReader;


public class JSONUtil {
	
	/**
	 * Encodes an observation to Json.
	 * @param id The sensorId.
	 * @param value The measured value.
	 * @param token User token required for autorization.
	 * @return Observation encoded as Json String.
	 */
	public static String encodeObservation(String id, double value, String token){
		JsonObject observation = Json.createObjectBuilder()
				.add("sensorId", id)
				.add("date", DateUtil.getISO8601Date())
				.add("value", value)
				.add("token", token)
				.build();
		return observation.toString();
	}
	
	/**
	 * Encodes a request to create a new thing
	 * in Json.
	 * @param latitude
	 * @param longitude
	 * @param userId The id of the Thing's user.
	 * @param token User token required for authentication.
	 * @return Body of Thing.Post Request as Json String.
	 */
	public static String encodePostThingRequest(double latitude, double longitude, String userId, String token){
		JsonObject register = Json.createObjectBuilder()
				.add("name", "HCSR04Sensor created by JavaMe")
				.add("token", token)
				.add("loc", Json.createObjectBuilder()
						.add("type", "Point")
						.add("coordinates", Json.createArrayBuilder()
								.add(latitude)
								.add(longitude)))
				.add("userId", userId)
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
	 * @param interval Time to wait between taking measurements in ms.
	 * @param refLevel Reference Level used to calculate the water level from.
	 * @param warnLevel Water level to trigger warn notifications at.
	 * @param riskLevel Water level to trigger alerts at.
	 * @param token User token required for authentication.
	 * @return The POST body as json string.
	 */
	public static String encodePostSensorRequest(String description, String thingId, String featureId, int interval, double refLevel, double warnLevel, double riskLevel, String token){
		JsonObject sensor = Json.createObjectBuilder()
				.add("name", description)
				.add("thingId", thingId)
				.add("featureId", featureId)
				.add("interval", interval)
				.add("refLevel", refLevel)
				.add("warnLevel", warnLevel)
				.add("riskLevel", riskLevel)
				.add("token", token)
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
}
