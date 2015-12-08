# Twitter Integration using IFTTT  

## Create a IFTTT Recipe  
- Go to the IFTTT website and create a new account and choose 'Create new Recipe'  
- The __THIS__ should be a __Maker Channel__ and the __THAT__ should be a __Twitter__ channel  
- For the maker channel, select __Receive a web request__ and give your event a name  
- For the twitter channel choose __Post a tweet__  
- Choose the action message that you want and select value 1, value 2 and/or value 3 to be included in the tweet. The values come from the POST request body from ClearBlade to IFTTT  
- Hit create action and then hit create recipe and you are done!  

## Create a Code Service  
- Copy and paste the code from tweet.js into a new Code Service on the ClearBlade Console  
- Replace __YOUR_KEY__ with the key provided by IFTTT and add values to value1, value2 or value3 in the request body as needed
- Now wherever you execute the Code Service, the values in the POST body will be tweeted to your Twitter account
