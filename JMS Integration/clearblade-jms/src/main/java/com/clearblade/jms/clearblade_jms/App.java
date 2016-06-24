package com.clearblade.jms.clearblade_jms;

import java.util.HashMap;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Queue;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnectionFactory;

import com.clearblade.java.api.ClearBlade;
import com.clearblade.java.api.ClearBladeException;
import com.clearblade.java.api.InitCallback;
import com.clearblade.java.api.Message;
import com.clearblade.java.api.MessageCallback;


public class App 
{
	static Message message = null;
	static String JMS_TOPIC = "jms-test";
    public static void main( String[] args ) throws JMSException {
    	Connection connection = null;
    	String SYSTEM_KEY = "YOUR_SYSTEM_KEY";
    	String SYSTEM_SECRET = "YOUR_SYSTEM_SECRET";
    	HashMap<String, Object> initOptions = new HashMap<String, Object>();
    	initOptions.put("platformURL", "YOUR_PLATFORM_URL");
    	initOptions.put("messagingURL", "YOUR_MESSAGING_URL");
    	initOptions.put("email", "YOUR_EMAIL");
    	initOptions.put("password", "YOUR_PASSWORD");
    	
    	InitCallback initCallback = new InitCallback(){
    	    @Override
    	    public void done(boolean results){
    		    System.out.println("Initialized CB");
    		    String clientID = "ClearBladeJMSTest"; 
    		    message = new Message(clientID);
    		    subscribe(message);
    		}
    		@Override
    		public void error(ClearBladeException exception){ 
    		   //initialization failed, given a ClearBladeException with the cause
    	        System.out.println("CB init error: " + exception.getMessage());
    	    }
    	};
    	
    	ClearBlade.initialize(SYSTEM_KEY, SYSTEM_SECRET, initOptions, initCallback);
        
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connection = connectionFactory.createConnection();
        Session session = connection.createSession(false,
        Session.AUTO_ACKNOWLEDGE);
        Queue queue = session.createQueue(JMS_TOPIC);
        MessageConsumer consumer = session.createConsumer(queue);
        connection.start();
        while(true) {
        	TextMessage textMessage = (TextMessage) consumer.receive();   
        	System.out.println("JMS Consumer message: " + textMessage.getText());
        	if(message != null) {
        		message.publish(JMS_TOPIC, textMessage.getText());
        	}
        	if(textMessage.getText().equals("END")) {
        		break;
        	}
        }

    }
    
    public static void subscribe(final Message message) {
    	Thread thread = new Thread() {
    		public void run() {
    			MessageCallback messageCallback = new MessageCallback() {
    				@Override
    				public void done(String topic, String messageString) {
    					System.out.println("MQTT message arrived: " + messageString);
    				}
    			};
    			message.subscribe(JMS_TOPIC, messageCallback);
    		}
    	};
    	thread.start();
    }
}
