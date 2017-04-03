function BLEGatewayStatus(deviceID, message, resp) {
    var query = ClearBlade.Query({collectionName: "BLEGateway"});
        query.equalTo("bluetooth_mac", deviceID); // Check if gateway exists in the collection
        query.fetch(function(err, data) {
            if(err) {
                log("BLE Error: " + data);
                resp.error({error: true, result: data});
            } else {
                var gateway = data.DATA;
                if(gateway.length === 0) { // Gateway not found in collection, create it
                    log("No gateway found in collection");
                    
                    var newGateway = {
                        bluetooth_mac: deviceID,
                        status: message
                    };
                    
                    var callback = function (err, data) {
                        if (err) {
                            resp.success({error: true, result: "Error creating new gateway: " + JSON.stringify(data)});
                        } else {
        	                resp.success(data);
                        }
                    };
                    
                    log("Adding gateway to collection")
                    var col = ClearBlade.Collection({collectionName: "BLEGateway" });
                    col.create(newGateway, callback);
                } else { // Gateway found
                    var changes = {
                        status: message // Update gateway status
                    };
                    
                    query.update(changes, function(err, data) { // Commit changes
                        if(err) {
                            resp.error({error: true, result: data});
                        } else {
                            resp.success({error: false, result: data});
                        }
                    });
                }
            }
        });
}