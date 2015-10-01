# Create new user account for Transverse and a developer account for ClearBlade

This pattern creates a new TRACT account first. If the account creation is successful, it will create a new developer account in ClearBlade.

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
- Create 3 different libraries in the ClearBlade Console named getEID, createAccount and registerDeveloper and copy and paste the code from ```/Libraries/getEID.js, /Libraries/createAccount.js and /Libraries/registerDeveloper.js``` respectively in those libraries.
- Require the **http** library in all of the 3 libraries that you just created.
- Now, create a new Code Service named createTRACTAccount and copy and paste the code from ```/Code Service/createTRACTAccount.js``` to this Code Service.
- Require the 3 libraries that you created earlier in this Code Service and you are done!

Now all you need to do is call the Code Service 'createTRACTAccount' with the required params. The list of required params can be found in the source code of the Code Service. 