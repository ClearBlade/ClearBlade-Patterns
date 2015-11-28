# GCloud PubSub Integration

To integrate Google Cloud's PubSub with ClearBlade, use the code in this repository. The go program is a Go gCloud client that authenticates with gCloud and publishes and pulls messages. Upon pulling the message, it sends it to the MQTT Broker on the ClearBlade Platform which can be used to execute a Code Servie using a Trigger. 

## Setting up gCloud Account  
- Set up a service account on gcloud and enable the PubSub API for that account  
- Download the JSON file for that service account to your computer  
- Set up a topic name __topic1__ and subscription name __sub1__ on your gCloud Developers Console to publish and pull messages  

## Setting up the gCloud Client  
- Replace the constants in the pubsub-test.go file with your credentials:  
```USERNAME       = "YOUR_USERNAME"
	SYSTEM_KEY     = "YOUR_SYSTEM_KEY"
	SYSTEM_SECRET  = "YOUR_SYSTEM_SECRET"
	PASSWORD       = "YOUR_PASSWORD"
	TOPIC          = "YOUR_TOPIC"
	PLATFORM_URL   = "PLATFORM_URL"
	MESSAGING_URL  = "MESSAGING_URL"
	PROJECT_ID     = "YOUR_PROJECT_ID"
	JSON_FILE_PATH = "YOUR_FILE_PATH"
	```  
- Do a ```go get```. This will donload all the dependencies for the client  
- Do a ```go build``` to build the client executable  
- Execute the client using ```./executable_name```  

## Set up a Code Service Trigger  
- On the ClearBlade Console create a new Code Service and create a new trigger for it  
- Create a Publish trigger specifiying the topic for it  
- Now you can execute the business logic of your choice within the Code Service  
- This logic will execute when you do a pull from gCloud's pubsub  