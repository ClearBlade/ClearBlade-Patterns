function ChargeCustomer(bill, resp, req) {
    var email = req.userEmail;
    
    function charge(ID) {
        var options = {
                uri: "https://api.stripe.com/v1/charges",
                auth: {
                    user: "sk_test_BQokikJOvBiI2HlWgH4olfQ2",
                    pass: ""
                },
                body: {
                    customer: ID,
                    currency: "usd",
                    amount: bill*100
                }
            };
            
        var requestObject = ClearBlade.http().Request();
        requestObject.post(options, function(err,response) {
            var json;        
            if (err) {
                json = JSON.parse(response);
                resp.success(json);
            } else {
                var parsedJson = JSON.parse(response);
                resp.success(parsedJson);
            }
        });
    }
    
    var getData = function() {
        var callback = function(err, response) {
            if (err) {
                resp.error(response);
            } else {
                charge(response.DATA[0].stripeid);
            }
        }
        var query = ClearBlade.Query({"collectionID": "your collectionID"});
        query.equalTo("email", email);
        query.fetch(callback);
    }
    
    var initClearBlade = function() {
        var initCallback = function(err, data) {
            if (err) {
                resp.error(data);
            }
            else {
                getData();
            }
        };
        
        var options = {
            systemKey: req.systemKey,
            systemSecret: req.systemSecret,
            email: "your email",
            password: "your password",
            callback: initCallback
        };
        
        ClearBlade.init(options);
    }
    
    initClearBlade();
        
}