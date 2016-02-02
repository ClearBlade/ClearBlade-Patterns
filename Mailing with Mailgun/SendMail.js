function SendMail(req, resp){
    
    function sendMail(){
        var options = {
            auth: {
                // Drop in YOUR_API_KEY
                user: "api",
                pass : "YOUR_API_KEY"
            },
            // Drop in YOUR_DOMAIN
            uri : "https://api.mailgun.net/v3/YOUR_DOMAIN/messages",
            qs: {
                "from": "Mailgun Sandbox <mailgun@sandboxaefcf6628e5f4e65b5ccd5b1362b4ee7.mailgun.org>",
                "to": "foo <xyz@foo.com>",
                "subject": "Test message using mailgun",
                "text": "Hi xyz. This is a test message from code service using mailgun http api!"
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
            email: "your_user",
            password: "your_password",
            callback: initCallback
        };
        ClearBlade.init(initOptions);
    }
    
    initClearBlade();
    sendMail();
}
