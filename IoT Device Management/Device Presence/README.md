# IoT Device Presence using the ClearBlade Platform

Devices can send messages over MQTT to indicate their presence. The ```/status``` topic should be used for this purpose. Devices can not only indicate their presence but also ask for other devices to do the same.

- When a device connects to the ClearBlade Plaform via MQTT, it can send a message to the ```/status``` topic to ask for the presence of other devices. 
- But first it needs to subscribe to the ```/status``` topic.
- The message payload will be as follows:
```{"presence": "Who is present?"}```
- Since the device sending the message is also subscribed to the same topic, it will send back its presence as well.
- The presence message has the following format:
```{"presence": deviceID + " is present"}```
- Other devices on the network will also send a similar message indicating their presence of each other.