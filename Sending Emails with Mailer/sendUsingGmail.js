function sendMailGmail(req, resp){
    var transport = mailer().createTransport({
        host:"smtp.gmail.com",
        port:"587"
    });
    
    function sendEmail(requestObj){
        transport.sendMail({
            from: <GMAIL_USERNAME>,
            password:<GMAIL_PASSWORD>,
            to: <RECEIVER_EMAIL>,
            subject: "Subject",
            text: "Hi. How are you doing today?"
        }, function(error, response){
            transport.close();
            if(error){
                resp.error(error);
            }else{
                resp.success("Thank you! Your request has been submitted");
            }
        });
    }
    
    ClearBlade.init({request:req});
    sendEmail();
}