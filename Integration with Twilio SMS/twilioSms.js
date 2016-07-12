/*

1. Go To Settings > Requires > Add `http` and `ClearBlade`
2. Change `TwilioSMS` below to the name of your particular service

*/

function TwilioSMS(req, resp){
    
    ClearBlade.init({request:req});
    sendSMS();

    function sendSMS(){
        var options = {
        "auth":{
            user: <ACCOUNT_SID>,
            pass : <AUTH_TOKEN>
        },
        uri : "https://api.twilio.com/2010-04-01/Accounts/<ACCOUNT_SID>/SMS/Messages.json",
        "body":{
            "Body" : <MESSAGE>,
            "To" : <VERIFIED_PHONE_NUMBER> ,
            "From": <TWILIO_PHONE_NUMBER_ASSIGNED_TO_ACCOUNT>
        },
        "form":true
    };

    /*
    Example
    function sendSMS(){
        var options = {
        "auth":{
            user: "fffffffffffffffffffffffff477ddf",
            pass : "fffffffffffffffffffffffed2ef55de"
        },
        uri : "https://api.twilio.com/2010-04-01/Accounts/fffffffffffffffffffffffff477ddf/SMS/Messages.json",
        "body":{
            "Body" : "Your friend says hi!",
            "To" : "(+1 555-555-5555)",
            "From": "<+1 777-777-7777>"
        },
        "form":true
    };
    */
    
        var requestObject = ClearBlade.http().Request();
        requestObject.post(options,function(err,result){
            if(err){
                resp.error("Failed");
            }else{
                resp.success(result);
            }
        });   
    }
}