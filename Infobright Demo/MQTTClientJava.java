package com.clearblade.java.api;

import java.util.HashMap;

public class MQTTClientJava {

	private static Message message;
	
	public static void main(String[] args) {
		
		initClearBlade();
		subscribe();
		//publish();
		//message.disconnectMQTTService();

	}
	
	private static void initClearBlade() {
		
		InitCallback initCallback = new InitCallback() {
			
			@Override
			public void done(boolean results) {
					
				System.out.println("ClearBlade platform initialized");
				message = new Message("test", 1);
				message.connectToMQTTService();
			}
			
			@Override
			public void error(ClearBladeException error) {
				
				String message = error.getMessage();
				System.out.println(message);
			}
		};
		
		String systemKey = "systemkey";
		String systemSecret = "systemsecret";
		String userEmail = "username";
		String userPassword = "password";
		String platformURL = "platformURL";
		String messagingURL = "messagingURL";
		
		HashMap<String, Object> options = new HashMap<String, Object>();
		options.put("email", userEmail);
		options.put("password", userPassword);
		options.put("platformURL", platformURL);
		options.put("messagingURL", messagingURL);
		
		ClearBlade.initialize(systemKey, systemSecret, options, initCallback);
	}
	
	private static void subscribe() {
		
		/*MessageCallback messageCallback = new MessageCallback() {
			
			@Override
			public void done(String topic, byte[] message){
				
				String receivedMessage = new String(message);
				System.out.println("Message received: " + receivedMessage);
			}
			
			@Override
			public void error(ClearBladeException exception) {
				
				String message = exception.getLocalizedMessage();
				System.out.println("CB Subscribe Exception: " + message);
			}
		};*/
		
		String topic = "Austin Weather";
		
		message.subscribe(topic);
	}
	
	private static void publish() {
		
		message.publish("test", "this is a test123");
	}

}
