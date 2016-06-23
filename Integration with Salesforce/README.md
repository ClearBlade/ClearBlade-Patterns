# Salesforce Integration for ClearBlade  

## Creating a Code Service  
- Create a new Code Service and copy and paste the code from salesforce.js  
- Require the __http__ and __log__ libraries and enable logging  
- Required parameters are consumer key, consumer secret, user secret, username and password and the parameter format is:  
```js
{"consumerKey": "your_consumer_key", "consumerSecret": "your_consumer_secret", "userSecret": "your_user_secret", "username": "your_username", "password": "your_password"}
```


## CRUD Operations using Salesforce REST API  
- The salesforce.js Code Service fetches __contact__ information from the user's account by performing a query  
- You can change the Code Service to perform the operation of your choice by editing the following lines of code:  
```js
var queryOptions = {
    "uri": instance_url + "/services/data/v20.0/query/",
    "qs": {
        "q": "SELECT phone from Contact where name = 'John Doe'"
    },
    "headers": {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    }
};
```
- For more information on the Salesforce REST API, please visit https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/ and for more information on the ClearBlade HTTP library, please visit http://docs.clearblade.com/v/2/4-Developer_Reference/NoviJS/HTTP.js/ 