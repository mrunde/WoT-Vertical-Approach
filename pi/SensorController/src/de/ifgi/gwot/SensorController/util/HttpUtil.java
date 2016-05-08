package de.ifgi.gwot.SensorController.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.microedition.io.Connector;
import javax.microedition.io.HttpConnection;

public class HttpUtil {
	
	/**
	 * Triggers a HTTP POST request to the url specified and 
	 * with the body given. The body has to be a json encoded
	 * string.
	 * @param url The url to send the request to.
	 * @param body The body of the POST request in json encoding.
	 * @return The server response.
	 * @throws IOException
	 */
	public static String post(String url, String body) throws IOException{
		HttpConnection httpConn = null;
		
		InputStream is = null;
		OutputStream os = null;
		
		String result = "";
		try{
			httpConn = (HttpConnection)Connector.open(url);
			httpConn.setRequestMethod(HttpConnection.POST);
			
			httpConn.setRequestProperty("User-Agent", "SensorMidlet/1.0");
			httpConn.setRequestProperty("Content-Type", "application/json");
			httpConn.setRequestProperty("Accept_Language", "en-US");
			httpConn.setRequestProperty("Content-length", body.getBytes().length + "");
			
			os = httpConn.openOutputStream();
			os.write(body.getBytes());
			//os.flush();
			
			StringBuffer sb = new StringBuffer();
			is = httpConn.openInputStream();
			int chr;
			while((chr = is.read()) != -1)
				sb.append((char)chr);
			
			result = sb.toString();
		} finally{
			if(is != null)
				is.close();
			if(os != null)
				os.close();
			if(httpConn != null)
				httpConn.close();
		}
		return result;
	}
	
	
	/**
	 * Triggers a HTTP GET request to the url specified.
	 * @param url The url to send the request to.
	 * @return The server response.
	 * @throws IOException
	 */
	public static String get(String url) throws IOException{
		String response = "";
		HttpConnection httpConn = null;
		
		InputStream is = null;
		OutputStream os = null;
		
		try{
			httpConn = (HttpConnection)Connector.open(url);
			
			httpConn.setRequestMethod(HttpConnection.GET);
			httpConn.setRequestProperty("User-Agent", "SensorMidlet/1.0");
			
			int responseCode = httpConn.getResponseCode();
			if(responseCode == HttpConnection.HTTP_OK){
				StringBuffer sb = new StringBuffer();
				os = httpConn.openOutputStream();
				is = httpConn.openInputStream();
				int chr;
				while((chr = is.read()) != -1){
					sb.append((char)chr);
				}
				response = sb.toString();
			} else{
				System.out.println("Error in opening HTTP Connection. Error: " + responseCode);
			} 			
		} finally{
			if(is != null)
				is.close();
			if(os != null)
				os.close();
			if(httpConn != null)
				httpConn.close();
		}
		return response;
	}

}
