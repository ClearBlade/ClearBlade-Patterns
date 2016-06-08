function LogErrors(deviceID, message, resp) {
    var collection = ClearBlade.Collection({collectionName: "BLEErrors"});
    var newItem = {
        error_message: message
    };
    
    collection.create(newItem, function(err, data) {
       log("Log Errors: " + data); 
    });
        
}