var username = req.params.username;
var password = req.params.password;

var base64credentials = Base64.encode(username + ":" + password);

var requestObject = Requests();
var options = {
    "uri": "https://api.github.com/users/" + username,
    "headers": {
        "Authorization": "Basic " + base64credentials
    }
};

requestObject.get(options, function(err, data) {
   resp.success(data); 
});