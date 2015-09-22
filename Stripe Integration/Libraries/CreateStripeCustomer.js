// Creates a Stripe customer ID
function CreateStripeCustomer(stripeToken, resp) {
    var result;
    var options = {
            uri: "https://api.stripe.com/v1/customers",
            auth: {
                user: "sk_test_BQokikJOvBiI2HlWgH4olfQ2",
                pass: ""
            },
            qs: {
                source: stripeToken
            }
        };
        
    var requestObject = ClearBlade.http().Request();
    requestObject.post(options, function(err,response) {
        var json;        
        if (err) {
            json = JSON.parse(response);
            result = {error: true, response: json};
        } else {
            var parsedJson = JSON.parse(response);
            json = parsedJson.id;
            result = {error: false, response: json};
        }
    });
        
    return result;
}