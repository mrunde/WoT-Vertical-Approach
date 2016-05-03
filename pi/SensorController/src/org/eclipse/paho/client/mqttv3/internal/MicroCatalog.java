/* 
 * Copyright (c) 2009, 2012 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Dave Locke - initial API and implementation and/or initial documentation
 */
package org.eclipse.paho.client.mqttv3.internal;

/**
 * Catalog of human readable error messages.
 */
import java.util.Hashtable;

import org.eclipse.paho.client.mqttv3.MqttException;

import com.cwm.util.PropertyResourceBundle;


public class MicroCatalog extends MessageCatalog {

	private PropertyResourceBundle bundle;
	Hashtable messages = new Hashtable();
	
	public MicroCatalog() throws MqttException {
		bundle = PropertyResourceBundle.getBundle("org.eclipse.paho.client.mqttv3.internal.nls.messages", true);
	}
	
	protected String getLocalizedMessage(int id) {
		String message = bundle.getString(""+id);
		return (!message.equals("")) ? message : "MqttException";
	}

}
