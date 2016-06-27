package com.clearblade.snmp;

import java.io.IOException;
import java.util.HashMap;

import org.snmp4j.smi.OID;

import com.clearblade.java.api.ClearBlade;
import com.clearblade.java.api.ClearBladeException;
import com.clearblade.java.api.InitCallback;
import com.clearblade.java.api.Message;
import com.jayway.snmpblogg.SimpleSnmpClient;

public class ClearBladeSNMP {
	private static String SYSTEM_KEY = "b48f8cf70ae6878a84bcb7a2da50";
	private static String SYSTEM_SECRET = "B48F8CF70AB092E0C8ABA0E0CA71";
	private static String PLATFORM_URL = "https://staging.clearblade.com";
	private static String MESSAGING_URL = "tcp://staging.clearblade.com:1883";
	private static String EMAIL = "test@clearblade.com";
	private static String PASSWORD = "clearblade";
	private static HashMap<String, Object> initOptions = new HashMap<String, Object>();
	private static Message message = null;
	private static String messagePayload = null;
	private static String OID = ".1.3.6.1.2.1.1.1.0";

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		SimpleSnmpClient client = new SimpleSnmpClient("udp:192.168.6.141/161");
		String sysDescr = client.getAsString(new OID(OID));
		System.out.println(sysDescr);
		messagePayload = "{\"oid\":\"" + OID + "\", \"data\":\"" + sysDescr + "\"}";
		
		InitCallback initCallback = new InitCallback(){
    	    @Override
    	    public void done(boolean results){
    		    System.out.println("Initialized CB");
    		    String clientID = "ClearBladeSNMPTest"; 
    		    message = new Message(clientID);
    		    message.publish("snmp-test", messagePayload);
    		    message.disconnect();
    		}
    		@Override
    		public void error(ClearBladeException exception){ 
    		   //initialization failed, given a ClearBladeException with the cause
    	        System.out.println("CB init error: " + exception.getMessage());
    	    }
    	};
		
		authWithClearBlade(initCallback);
	}
	
	private static void authWithClearBlade(InitCallback callback) {
		initOptions.put("platformURL", PLATFORM_URL);
		initOptions.put("messagingURL", MESSAGING_URL);
		initOptions.put("email", EMAIL);
		initOptions.put("password", PASSWORD);
		
		ClearBlade.initialize(SYSTEM_KEY, SYSTEM_SECRET, initOptions, callback);
	}

}
