function TwilioSMS(req, resp){
    function sendSMS(){
        var options = {
        "auth":{
            user: "account sid",
            pass : "auth_token"
        },
        uri : "https://api.twilio.com/2010-04-01/Accounts/<account sid>/SMS/Messages.json",
        "body":{
            "Body" : "Test_message",
            "To" : "Verified_phone_no (+1 XXX-XXX-XXXX)",
            "From": "Phone no given by twilio (+1 XXX-XXX-XXXX)"
        },
        "form":true
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
    
    ClearBlade.init({request:req});
    sendSMS();
}