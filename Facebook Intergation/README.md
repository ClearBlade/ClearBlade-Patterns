# Facebook Integration using the ClearBlade Platform

To use functions provided by the facebook JS SDK in a Code Service, create a new library and copy and paste the code from fb.js. Require this newly created library in your Code Service and you are all set!

The facebook library can be used in the following way:
```javascript
function FBLibraryTest(req, resp) {
	FB().setAccessToken("your_access_token");
	FB().api('/platform', function(response) {
	    resp.success(response);
	});
}

More information can be found at https://github.com/Thuzi/facebook-node-sdk