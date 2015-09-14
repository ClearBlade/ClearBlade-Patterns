# IoT Device Authentication using the ClearBlade Platform

This is a mockup of the Code Service that will be used to authenticate your IoT devices with the ClearBlade Platform. **This requires that you have a collection set up on the ClearBlade Platform. This collection must contain device IDs and keys associated with all of your devices. The collection must also have necessary permissions set.** If you have not created a collection, please follow the instructions given at https://github.com/ClearBlade/ClearBlade-Patterns/tree/master/IoT%20Device%20Management/Batch%20Device%20Storage 

Here are the steps you need to take to get started:  
- Go to the ```Auth``` tab on the ClearBlade console and create a new user. You will give this user's auth token back to the devices if they exist in the collection you created earlier.
- Next go to the ```Code``` tab and create a new Code Service by clicking the ```+New``` button and give your Code Service a name. 
- Copy and paste the code from the deviceAuthentication.js file included in this repository under ```IoT Device Management/Device Authentication/deviceAuthentication.js``` into your Code Service.
- Replace ```var deviceInfoCollectionID = "COLLECTION_ID";``` with the collection ID of the collection you created earlier.
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
- Click the settings(gear) icon and change the permissions for the Code Service to ```Anonymous``` and then require the ```clearblade``` library and hit apply.
- Your Code Service is now set up. Now all you have to do is call this Code Service anonymously from your device by passing in the Device ID and Device Key as parameters.
- If the device exists in the collection you created earlier, you should get an auth token back on your device after successful execution of the Code Service.
