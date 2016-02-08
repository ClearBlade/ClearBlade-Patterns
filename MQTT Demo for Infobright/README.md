# Infobright Demo

This demo uses a Go program to publish weather messages via MQTT to the ClearBlade Platform. A Code Service with a data publish trigger executes when there is a publish on the 'weather' topic. This Code Service stores the weather data in a Collection on the platform. At the same time there is a Java MQTT client that is subscribed to the same topic and receives the weather messages.

**Note: Please replace the credentials (systemkey, systemsecret, platform url, messaging url, username, password and collection ID) in the Go, Java and JS programs with yours. You will also need to install the ClearBlade Go and Java SDKs from https://github.com/ClearBlade/Go-SDK and https://github.com/ClearBlade/ClearBladeJavaSDK**

### Create a Collection
- Create a new Collection with collumns payload and topic of type string.
- Give the Collection CRUD permissions for an authenticated user.
- Note the collection ID.

### Create a Code Service
- Create a new Code Service and copy and paste the code from demo.js.
- Apply execute permissions for an authenticated user and require the clearblade library.
- Place a publish trigger on the Code Service for the topic 'Austin Weather'.

Start the Java client so that it listens on incoming messages. Then execute the Go program to publish the weather information. Verify that the code service is being executed by checking the collection for weather data. Verify whether the Java client receives messages.