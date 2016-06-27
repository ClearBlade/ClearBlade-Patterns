log(req.params.body);
var jsonBody = req.params.body;
jsonBody = JSON.parse(jsonBody);
var oid = jsonBody.oid;
log("OID: " + oid);
var receivedData = jsonBody.data;
log("Received data: " + receivedData);
var initCallback = function(err, data) {
    if(err) {
        log("Init error: " + data);
        resp.error(data);
    } else {
        log("CB init successfull");
        var collection = ClearBlade.Collection({collectionName: "SNMP_Data"});
        var newItem = {
            "oid": oid.toString(),
            "received_data": receivedData.toString()
        };
        collection.create(newItem, function(err, data) {
           if(err) {
               log("Error adding data to collection: " + data);
               resp.error(data);
           } else {
               log("Successfully added data to collection: " + data);
               resp.succes(data);
           }
        });
    }
}
var initOptions = {
    systemKey: req.systemKey,
    systemSecret: req.systemSecret,
    email: "test@clearblade.com",
    password: "clearblade",
    callback: initCallback
};

ClearBlade.init(initOptions);