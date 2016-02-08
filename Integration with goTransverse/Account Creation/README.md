# Create new user account for Transverse and a developer account for ClearBlade

This pattern creates a new TRACT account first. If the account creation is successful, it will create a new developer account in ClearBlade and store the developer account details in a Collection.

- Firstly you will need to replace the username and password in the HTTP options object of the http library in ```/Libraries/getEID.js``` and ```/Libraries/createAccount.js```.
```javascript
	var options = {
	    uri: url,
	    auth: {
	        user: "username",
	        pass: "password"
	    },
	    isSoap: true
	};
```
- You will also need to create a new Collection (having Administrator CRUD permissions) and an administrator user. 
- Replace the credentials with your in the ```/Libraries/storeUser.js``` file.
- Create 4 different libraries in the ClearBlade Console named getEID, createAccount and registerDeveloper and copy and paste the code from ```/Libraries/getEID.js, /Libraries/createAccount.js, /Libraries/storeUser.js and /Libraries/registerDeveloper.js``` respectively in those libraries.
- Require the **http** library in the 3 libraries excluding storeUser that you just created. And require the **clearblade** library in the storeUser library.
- Now, create a new Code Service named createTRACTAccount and copy and paste the code from ```/Code Service/createTRACTAccount.js``` to this Code Service.
- Require the 4 libraries that you created earlier in this Code Service and you are done!

Now all you need to do is call the Code Service 'createTRACTAccount' with the required params. The list of required params can be found in the source code of the Code Service. 