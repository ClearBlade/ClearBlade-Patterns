# Java Message Service (JMS) integration for ClearBlade

## Importing project in Eclipse
- Open Eclipse and go to File->Import and select __Existing Maven Project__
- You will need to change the credentials in App.java
- Replace ```YOUR_SYSTEM_KEY, YOUR_SYSTEM_SECRET, YOUR_PLATFORM_URL, YOUR_MESSAGING_URL, YOUR_EMAIL, YOUR_PASSWORD``` with your own
- All messages are sent and received on the ___jms-test__ topic. You can change the default topic by changing the ```JMS_TOPIC``` variable