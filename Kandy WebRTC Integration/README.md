# WebRTC Integration for the ClearBlade Platform using Kandy

### Create a Code Service
- Create a new Code Service and copy and paste the code from AddKandyUser.js. 
- Replace the project API key and secret with yours.
- This Code Service checks whether the supplied user is present in your Kandy account and returns the password. If the user is not present, it will register the user for you.
- The 'userID' param needs to be passed to the Code Service.
- Require the http and clearblade libraries and enable execute permissions for an authenticated user. 

### Client side Javascript
- Before you log in to Kandy, you first need to execute the Code Service that you created in your app to get the password of the user. 
- Follow the instructions given on the Kandy website: https://developer.kandy.io/tutorials