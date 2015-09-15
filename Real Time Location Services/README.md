# Real Time Location using the ClearBlade Platform

With the help of MQTT, REST Services and Code Services with Triggers on the ClearBlade Platform, users can implement efficient and reliable real time systems with very little work.

## realTimeLocation-MQTT.js

Users can use MQTT to send the location (latitude and longitude) of their device to the ClearBlade Platform and have a Code Service do the heavy lifting.

#### Create a Code Service with a Trigger
- Go to the ```Code``` tab on the ClearBlade Console and click the ```+New``` icon to create a new Code Service.
- Give your Code Service a name.
- Click the Settings (Gear icon) to open Code Service Settings and go to the ```Triggers``` tab.
- Create a new trigger and name it 'Real Time Trigger'.
- Select **Messaging** as the source.
- Select **Publish** as the action and enter the name of the topic that your device is going to send messages to.
- Hit Apply.
- Now, copy and paste the code from reatTimeLocation-MQTT.js into your code service and you are done!
- The format of the message that will be sent by your device needs to be as follows:
```{"lat":1234.684, "lon":46148.1414}```
- This Code Service will get executed every time there is a publish event from your device to the topic you specified in the trigger
- ```var longitude``` and ```var latitude``` will contain the longitude and latitude sent by your device respectively.
- The user can then apply business logic on the location coordinates within the Code Service itself.
