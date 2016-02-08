    var userID = req.params.userID;
    var projectAPIKey = "YOUR_API_KEY";
    var projectAPISecret = "YOUR_API_SECRET";
    var found = false;
    function executeGET(address) {
        var result;
        var options = {
            uri: address
              
        };
            
        var requestObject = ClearBlade.http().Request();
        requestObject.get(options, function(err,response) {
            if (err) {
                resp.error(response);
            } else {
                result = response;
            }
        });
        
        return result;
    }
    
    function checkForUser(users) {
        var location = -1;
        if (users.length !== 0) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].user_id === userID) {
                    found = true;
                    location = i;
                }
            }
        }
        
        return {find: found, loc: location};
    }
    
    function createUser(accessToken) {
        var options = {
            uri: "https://api.kandy.io/v1.2/domains/users/user_id?key=" + encodeURIComponent(accessToken),
            json: true,
            body: {
                user_id: userID,
                user_country_code: "US",
            }  
        };
            
        var requestObject = ClearBlade.http().Request();
        requestObject.post(options, function(err,response) {
            if (err) {
                resp.error(response);
            } else {
                resp.success(JSON.parse(response).result.user_password);
            }
        });
    }
    
    function addUser() {
        var response = executeGET("https://api.kandy.io/v1.2/domains/accesstokens?key=" + encodeURIComponent(projectAPIKey) + "&domain_api_secret=" + encodeURIComponent(projectAPISecret));
        var token = JSON.parse(response).result.domain_access_token
        
        var userresponse = executeGET("https://api.kandy.io/v1.2/domains/users?key=" + token);
        var isUserPresent = checkForUser(JSON.parse(userresponse).result.users);
        
        if (isUserPresent.find) {
            resp.success(JSON.parse(userresponse).result.users[isUserPresent.loc].user_password);
        } else {
            createUser(token);
        }
        resp.success(JSON.parse(userresponse).result.users);
    }
        
    addUser();