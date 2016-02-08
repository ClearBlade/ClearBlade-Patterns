// Email is required as an input parameter

function ForgotPassword(req, resp){
    
    initClearBlade();
    var user = ClearBlade.User();
    var query = ClearBlade.Query();
    query.equalTo('email',req.params.email);
    user.allUsers(query, function(err,userArray) {
        if(err) {
            resp.success("Error");
        }
        else {
            var resetToken = Math.floor((Math.random() * 1000000) + 1);
            var d = new Date();
            var collection = ClearBlade.Collection('collection_ID'); // reset collection has only admin perms
            
            var cb = function(err,result) {
                if(err) {
                    resp.error("Error!" + req);
                }
                else {
                    var transport = mailer().createTransport({
                    host:"smtp.gmail.com",
                    port:"587"
                    });
                    transport.sendMail({
                        from: "your_gmail_id",
                        password:"your_password",
                        to: "user_email",  // req.params.email
                        subject: "Reset Token to change password",
                        text: "Hi. Your reset token to change password is " + resetToken
                    }, function(error, response){
                        transport.close();
                        if(error){
                            resp.error(error);
                        }else{
                            resp.success("Reset token has been sent to " + req.params.email);
                        }
                    });
                }
            }
            
            var resetData = {
                email:req.params.email,
                reset_token:resetToken.toString(),
                createdon: d.toISOString()
            };
            collection.create(resetData,cb);
            // resp.success(resetToken);
        }
    });
    
    function initClearBlade() {
        var initCallback = function(err, response) {
            if (err) {
                resp.error(response);
            }
        };
        var initOptions = {
            systemKey: req.systemKey,
            systemSecret: req.systemSecret,
            email: "your_email",
            password: "your_password",
            callback: initCallback
        };
        ClearBlade.init(initOptions);
    }
    
    
}