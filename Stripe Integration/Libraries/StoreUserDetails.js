function StoreUserDetails(firstName, lastName, organization, email, tier, stripeCustomerID, resp, req) {
    var storeData = function() {
        var callback = function(err, response) {
            if (err) {
                resp.error(response);
            }
        }
        var collection = ClearBlade.Collection("Your collectionID");
        var newItem = {
            firstname: firstName,
            lastname: lastName,
            org: organization, 
            email: email,
            stripeid: stripeCustomerID,
            tier: tier
        }
        collection.create(newItem, callback);
    }
    
    var initClearBlade = function() {
        var initCallback = function(err, data) {
            if (err) {
                resp.error(data);
            }
            else {
                storeData();
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