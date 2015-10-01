/**
  * This registers a new developer on the ClearBlade Platform.
  */

function registerDeveloper(req) {
    var result;
    var options = {
        uri: "https://rtp.clearblade.com/admin/reg",
        body: {
            "fname": req.params.fname,
            "lname": req.params.lname,
            "org": req.params.org,
            "email": req.params.email,
            "password": req.params.password
        }
    };
        
    var requestObject = Requests();
    requestObject.post(options, function(err,response) {
        result = response;
    });
    
    return result;
}