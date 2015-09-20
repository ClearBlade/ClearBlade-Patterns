function SendMail(req, resp){
    
    function sendMail(){
        var options = {
            auth: {
                user: "api",
                pass : "key-342745b4ea1c0e38a469274cc687581f"
            },
            uri : "https://api.mailgun.net/v3/sandboxaefcf6628e5f4e65b5ccd5b1362b4ee7.mailgun.org/messages",
            qs: {
                "from": "Mailgun Sandbox <mailgun@sandboxaefcf6628e5f4e65b5ccd5b1362b4ee7.mailgun.org>",
                "to": "Aaron <aallsbrook@clearblade.com>",
                "subject": "Test message using mailgun",
                "text": "Hi Aaron. This is a test message from code service using mailgun http api!"
            },
            strictSSL: false
        };
    
        var requestObject = ClearBlade.http().Request();
        requestObject.post(options,function(err,result){
            if(err){
                resp.error("Failed");
            }else{
                resp.success(result);
            }
        });   
    }
    
    function initClearBlade() {
        var initCallback = function(err, response) {
            if (err) {
                resp.error(response);
            }
        };
        var initOptions = {
            systemKey: req.systemKey,
            systemSecret: req.systemSecret,
            email: "rohan@clearblade.com",
            password: "rohanbendre",
            callback: initCallback
        };
        ClearBlade.init(initOptions);
    }
    
    initClearBlade();
    sendMail();
}
