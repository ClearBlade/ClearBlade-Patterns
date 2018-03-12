function BLEDeviceStatus(bluetoothMac, message, resp) {
    log("BLE Device Joined");
    log("Message: " + message);
    message = JSON.parse(message);
    
    var addBLEDeviceToCollection = function() {
       log("Checking for ble device existance : "+ message.deviceAddress);
       var nodeQuery = ClearBlade.Query({collectionName: "BLEDevice"});
       nodeQuery.equalTo("ble_device_mac", message.deviceAddress);
       nodeQuery.fetch(function(err, data) {
          if(err) {
              log("Fetch failed while adding ble device: " + data);
              resp.error({error: true, result: data});
          } else {
              var node = data.DATA;
              if(node.length === 0) { // Ble device not found, add new ble device
                log("Ble device not found in collection, adding new ble device");
                var newItem = {
                    gateway_mac: bluetoothMac,
                    ble_device_mac: message.deviceAddress,
                    device_status: message.status,
                    device_type: message.deviceType,
                    device_addr_type: message.deviceAddrType
                };
                log("New item: " + newItem);
                var collection = ClearBlade.Collection({collectionName: "BLEDevice"}); 
                collection.create(newItem, function(err, data) { // Add new entry for ble device in the collection
                    if(err) {
                        log("Error while adding new ble device to collection: " + data);
                        resp.error({error: true, result: data});
                    } else {
                        log("Successfully added new ble device: " + data);
                        resp.success({error: false, result: data});
                    }
                });
              } else {
                  log("Ble device already exists, updating entry in collection with new ble device");
                  var updateItem = {
                    gateway_mac: bluetoothMac,
                    ble_device_mac: message.deviceAddress,
                    device_status: message.status,
                    device_type: message.deviceType,
                    device_addr_type: message.deviceAddrType
                };
                log("Updated item: " + updateItem);
                nodeQuery.update(updateItem, function(err, data) { 
                    if(err) {
                        log("Error while updating new ble device to collection: " + data);
                        resp.error({error: true, result: data});
                    } else {
                        log("Successfully updated new ble device: " + data);
                        resp.success({error: false, result: data});
                    }
                });
              }
          }
       });
    };
    
        log("Before query");
        log(bluetoothMac);
     var query = ClearBlade.Query({collectionName: "BLEGateway"});
        query.equalTo("bluetooth_mac", bluetoothMac); // Check if gateway exists in the collection
        query.fetch(function(err, data) {
            if(err) {
                log(data);
                resp.error({error: true, result: data});
            } else {
                log("Checking gateway existence");
                var gateway = data.DATA;
                if(gateway.length === 0) { // Gateway not found
                    resp.error({error: true, result: "No gateway found. Please register gateway first"});
                } else { // Gateway found
                    log("Gateway Found");
                    addBLEDeviceToCollection();
                }
            }
        });
}