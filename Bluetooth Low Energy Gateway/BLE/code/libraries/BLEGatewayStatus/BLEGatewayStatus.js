function BLEGatewayStatus(deviceID, message, resp) {
    var query = ClearBlade.Query({collectionName: "BLEGateway"});
        query.equalTo("bluetooth_mac", deviceID); // Check if gateway exists in the collection
        query.fetch(function(err, data) {
            if(err) {
                log("BLE Error: " + data);
                resp.error({error: true, result: data});
            } else {
                var gateway = data.DATA;
                if(gateway.length === 0) { // No gateway found in collection
                    log("No gateway found in collection");
                    resp.success({error: true, result: "No gateway found"});
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