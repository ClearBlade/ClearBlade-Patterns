function VerifyTags(req, resp){
    
    var tagID = String(req.params.tagID);
    var tac = String(req.params.tac);

    var url = "https://test.activid.hidglobal.com/RESTGateway/TTAuthentication/TTS/TrustedTagTAC/Verify";
    var collectionID = "your collection ID";
    
    function storeTagData(result) {
        var collection = ClearBlade.Collection(collectionID);
        var newItem = {
            tagid: tagID,
            tac: tac,
            description: result,
            timestamp: Date()
        }
        collection.create(newItem, function(err, result) {
            if (err) {
                resp.error("result");
            }
        });
    }
    
    function verifyTag() {
        var options = {
            uri: url,
            strictSSL: false,
            body: { 
                "systemUserName":"your HID username", 
                "systemPassword":"your HID password", 
                "tagID":tagID, 
                "tac":tac
            } 
        };
        
        var requestObject = ClearBlade.http().Request();
        requestObject.post(options, function(err,response) {
           if (err) {
               resp.error(response);
           } else {
               storeTagData(JSON.parse(response).description);
               resp.success(JSON.parse(response).response);
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
            email: "your email",
            password: "your password",
            callback: initCallback
        };
        ClearBlade.init(initOptions);
    }
    
    initClearBlade()
    verifyTag();
}