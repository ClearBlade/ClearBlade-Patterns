function SendMail(req, resp){

    var options = {
        auth: {
            // User is the literal string "api"
            user: "api",
            // Insert your API_KEY
            pass : <API_KEY>
        },
        uri : "https://api.mailgun.net/v3/<YOUR_DOMAIN>/messages",
        qs: {
            "from": "Mailgun Sandbox <mailgun@sandboxaefcf6628e5f4e65b5ccd5b1362b4ee7.mailgun.org>",
            // ex. "Rob <rob@clearblade.com>"
            "to": <RECIPIENT_EMAIL>,
            // ex. "Hey!"
            "subject": <SUBJECT>,
            // "How are you?"
            "text": <MESSAGE_BODY>
        },
        strictSSL: false
    };

    var requestObject = ClearBlade.http().Request();
    requestObject.post(options,function(err,result){
        if(err){
            resp.error("Unable to post email: "+result);
        }else{
            resp.success(result);
        }
}
}
