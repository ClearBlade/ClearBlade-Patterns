var consumerKey = req.params.consumerKey;
var consumerSecret = req.params.consumerSecret;
var userSecret = req.params.userSecret;
var username = req.params.username;
var password = req.params.password;

var authBody = "grant_type=password&client_id=" + consumerKey + "&client_secret=" + consumerSecret + "&username=" + username + "&password=" + password + userSecret;

var requestObject = Requests();
var options = {
    "uri": "https://login.salesforce.com/services/oauth2/token",
    "body": authBody,
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

requestObject.post(options, function(err, data) {
    if(err) {
        log("Error: " + JSON.stringify(data))
        resp.error(data);
    } else {
        data = JSON.parse(data);
        token = data.access_token;
        instance_url = data.instance_url;
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
        
        requestObject.get(queryOptions, function(err, data) {
            if(err) {
                log("Error getting contact info " + JSON.stringify(data));
                resp.error("Error getting contact info " + JSON.stringify(data));
            } else {
                resp.success(data);
            }
        });
    }
});