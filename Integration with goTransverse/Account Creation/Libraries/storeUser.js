function storeUser(req) {
    var flag = false;

    function store() {
        var newItem = {
            firstname: req.params.fname,
            middlename: req.params.mname,
            lastname: req.params.lname,
            organization: req.params.org,
            email: req.params.email,
            address: req.params.line1,
            city: req.params.city,
            state: req.params.state,
            zip: req.params.zip,
            phone: req.params.areacode + req.params.number,
            tier: req.params.tier,
            timestamp: Date()
        };
        
        var collection = ClearBlade.Collection("Collection ID"); // Replace this
        collection.create(newItem, function(err, data) {
            if (err) {
                
            } else {
                flag = true;
            }
        });
    }
    
    function initCB() {
        var initCallback = function(err, result) {
            if (err) {
                
            } else {
                store();
            }
        }
        
        var initOptions = {
            systemKey: req.systemKey,
            systemSecret: req.systemSecret,
            email: "email",  // Replace this
            password: "password",  // Replace this
            callback: initCallback
        };
        
        ClearBlade.init(initOptions);
    }
    
    initCB();
    return flag;
}