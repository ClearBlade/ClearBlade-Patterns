# Real Time Location using the ClearBlade Platform

With the help of MQTT, REST Services and Code Services with Triggers on the ClearBlade Platform, users can implement efficient and reliable real time systems with very little work.

## realTimeLocation-MQTT.js

Users can use MQTT to send the location (latitude and longitude) of their device to the ClearBlade Platform and have a Code Service do the heavy lifting.

#### Create a Code Service with a Messaging Trigger
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
**Note: Devices can also use a REST endpoint to send messages to the MQTT Broker on the ClearBlade Platform. More information about the endpoint can be found at http://docs.clearblade.com/v/2/static/restapi/index.html#!/messaging/publish_post_1**
- This Code Service will get executed every time there is a publish event from your device to the topic you specified in the trigger
- ```var longitude``` and ```var latitude``` will contain the longitude and latitude sent by your device respectively.
- The user can then apply business logic on the location coordinates within the Code Service itself.


## realTimeLocation-Data.js

Code Services can also have a Data Trigger which will execute the Code Service when a data manupulation event takes place on a Collection on the platform. In this case, devices will use a REST endpoint to store location data in a collection which will trigger an Item Created trigger that will in turn execute a Code Service with business logic. 

#### Create a Collection to store the location data
- Go to the ```Data``` tab on the ClearBlade Console and click the ```+New``` icon to create a new Collection.
- Create two columns named **latitude** and **longitude** of type **float**.
- Change the permissions of the collection to allow read, create and update and you are all set!

#### Create a Code Service with a Data Trigger
- Go to the ```Code``` tab on the ClearBlade Console and click the ```+New``` icon to create a new Code Service.
- Give your Code Service a name.
- Click the Settings (Gear icon) to open Code Service Settings and go to the ```Triggers``` tab.
- Create a new trigger and name it 'Real Time Trigger'.
- Select **Data** as the source.
- Select **Item Created** as the action and enter the name of the collection that your device is going to send location data to.
- Hit Apply.
- Now, copy and paste the code from reatTimeLocation-Data.js into your code service and you are done!
- Your device should use the REST API to create an Item in the collection you just created. More information about the REST endpoint can be found at http://docs.clearblade.com/v/2/static/restapi/index.html#!/data/fetch_post_6
- This Code Service will get executed every time there is an item created event from your device to the collection you specified in the trigger
- ```var longitude``` and ```var latitude``` will contain the longitude and latitude sent by your device respectively.
- The user can then apply business logic on the location coordinates within the Code Service itself.
