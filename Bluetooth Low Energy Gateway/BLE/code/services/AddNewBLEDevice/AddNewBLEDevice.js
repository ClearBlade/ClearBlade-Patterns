function AddNewBLEDevice(req, resp){
    log("In Add New BLE Device");
    log(JSON.stringify(req));
    
    var body = JSON.parse(req.params.body)
    
    log("Starting Add new BLE Device");
    ClearBlade.init({request: req});

	var topic = "ble/" + body.gatewayAddress + "/BLECommands";
	var payload = {"command": "connect", "deviceAddress": body.deviceAddress, "deviceType": body.deviceType, "uuids": body.uuids, "deviceAddrType": body.deviceAddrType};
	
	var msg = ClearBlade.Messaging();
	
	log("Publishing topic: " + topic + " with payload " + JSON.stringify(payload));
	
    msg.publish(topic, JSON.stringify(payload));
    resp.success("Done");
}