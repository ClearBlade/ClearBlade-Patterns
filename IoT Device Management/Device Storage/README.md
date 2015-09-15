# IoT Device Storage in the ClearBlade Platform

This lets you store devices (JSON Object containing device authentication parameters) to a collection on the ClearBlade Platform. The user needs to create a Collection, create a Code Service and then execute that Code Service by providing a JSON object of the device ID of the device that is to be stored in the collection.  

### Create a Collection  
- First, you will need to create a ```Collection``` to store the device credentials.
- Go to the ```Data``` tab on the console of the ClearBlade Platform and create a new Collection by clicking the ```+New``` icon.
- Give your collection a name and note down the collection ID. We will be using this later for device authentication.
- Add two columns named **deviceid** and **devicekey** of type ```String``` to your collection.
- Update the permissions of this collection so that an Authenticated user can Create, Read, Update and Delete

### Create a User
- If you haven't created a user you need to go to the ```Auth``` tab and create a new user.
- This will be used by the Code Service to access the Collection and also during device authentication.

### Create a Code Service
- Next step is to create a Code Service that will accept a JSON Object containing the device ID. When this executes, it will automatically generate a device key and add the device to the collection you just created and return the generated device key.
- Go to the ```Code``` tab on the ClearBlade console and create a new Code Service by clicking the ```+New``` icon.
- Give your Code Service a name and copy and paste the code from Iot Device Management/Device Storage/deviceStorage.js included in this repository into your Code Service.
- Replace ```var devicesCollectionID = "COLLECTION_ID";``` with the collection ID of the collection you just created.
- Replace the email and password in initOptions with the email and password of the user that you created.
``` 
var initOptions = {
		systemKey: req.systemKey,
		systemSecret: req.systemSecret,
		email: "email@email.com",
		password: "password",
		callback: initCallback
	}
```
- Click the ```Save``` icon to save the Code Service.
- Click the settings (gear) icon and change the security to 'Anonymous' and add the ```clearblade``` library in requires.
- Hit Apply and Save the Code Service.

### Construct the JSON Object for your device
- Construct a JSON object in the following format:
```
{"deviceID":"yourDeviceId"}
```
- At the bottom of the Code Service that you created, click the ```Test Parameters``` link and click the ```+``` icon to add a new parameter.
- Enter the parameter name as **device** and copy and paste the JSON Object in the parameter value field. 
- Hit **Save and Test** to execute the Code Service.
- If the device is saved successfully, the newly generated device key will be returned and you are all set!
- Alternatively, you can execute the Code Service while programming your device.


