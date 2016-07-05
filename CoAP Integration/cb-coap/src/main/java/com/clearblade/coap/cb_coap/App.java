package com.clearblade.coap.cb_coap;

import java.util.HashMap;

import org.eclipse.californium.core.CoapClient;
import org.eclipse.californium.core.CoapResponse;
import org.eclipse.californium.core.Utils;

import com.clearblade.java.api.ClearBlade;
import com.clearblade.java.api.ClearBladeException;
import com.clearblade.java.api.InitCallback;
import com.clearblade.java.api.Message;

/**
 * Hello world!
 *
 */
public class App 
{
	private static String SYSTEM_KEY = "YOUR_SYSTEM_KEY";
	private static String SYSTEM_SECRET = "YOUR_SYSTEM_SECRET";
	private static String PLATFORM_URL = "YOUR_PLATFORM_URL";
	private static String MESSAGING_URL = "YOUR_MESSAGING_URL";
	private static String EMAIL = "YOUR_EMAIL";
	private static String PASSWORD = "YOUR_PASSWORD";
	private static HashMap<String, Object> initOptions = new HashMap<String, Object>();
	private static Message message = null;
	private static boolean initFlag = false;

    public static void main( String[] args )
    {
    	boolean initStatus = initializeCB();
    	if(!initStatus) {
    		return;
    	}
    	
    	String clientID = "ClearBladeCOAPTest"; 
	    message = new Message(clientID);
	    
    	CoapClient client = new CoapClient("coap://californium.eclipse.org:5683/obs");

		System.out.println("SYNCHRONOUS");
		
		CoapResponse response = client.get();
		
		if (response!=null) {
			System.out.println(Utils.prettyPrint(response));
			String messagePayload = Utils.prettyPrint(response);
			message.publish("coap-test", messagePayload);
			
		} else {
			System.out.println("No response received.");
		}
    }
    
    private static boolean initializeCB() {
    	InitCallback initCallback = new InitCallback(){
    	    @Override
    	    public void done(boolean results){
    	    	initFlag = true;
    		}
    		@Override
    		public void error(ClearBladeException exception){ 
    		   //initialization failed, given a ClearBladeException with the cause
    	        System.out.println("CB init error: " + exception.getMessage());
    	    }
    	};
    	initOptions.put("platformURL", PLATFORM_URL);
		initOptions.put("messagingURL", MESSAGING_URL);
		initOptions.put("email", EMAIL);
		initOptions.put("password", PASSWORD);
		
		ClearBlade.initialize(SYSTEM_KEY, SYSTEM_SECRET, initOptions, initCallback);
		
		return initFlag;
    }
}
