# IoT Device Discovery using the ClearBlade Platform

Device discovery on the ClearBlade Platform is done over MQTT, which executes a Code Service due to a publish trigger and stores current device information in a user created Collection. The ```/discovery``` topic is used for device discovery. Following methods are supported for device discovery:

- AddDeviceState: Adds a new device to the 'Device Discovery' collection and sets its state and other parameters as well
- UpdateDeviceState: Updates the state of an existing device in the collection
- GetDeviceState: Gets the current device state of an existing device in the collection
- RemoveDevice: Removes a device from the collection
- GetAllDevices: Gets all the devices in the collection

The message payload sent by the devices needs to be in the following format:
```{"requestType": "AddDeviceState", "deviceState":"online", "isDiscoverable":true, "location":"1244.4141, 23535.252523"}```

requestType can have the following values:
- "AddDeviceState"
- "UpdateDeviceState"
- "GetDeviceState"
- "RemoveDevice"
- "GetAllDevices"

deviceState can have the following values:
- "online"
- "offline"
- "sleeping"
- "idle"

isDiscoverable can be true or false and location will contain comma separated latitude and longitude of the device. 


### Create a Collection
- Create a new collection to store device discovery information.
- Add columns state and location of type string and another column named isDiscoverable of type boolean.
- Update the permissions of the collection to allow an authenticated user to create, update, read and delete.


### Create a Code Service

- Create a new Code Service to handle device discovery.
- Create a new Publish Trigger for the code service on the ```/discovery``` topic.
- Copy and paste the code from discovery.js to the code service.
- Replace the collection Id with the one that you just created and you are all set!