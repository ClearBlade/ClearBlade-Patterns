function AddNewBLEDevice(req, resp){
    var deviceAddress = "55:95:1A:36:37:F1";
    var gatewayAddress = "B8:27:EB:F5:08:30";
    var uuid = 0x2A07
    var deviceType = "Proximity Sensor"
    log("Starting Add new BLE Device");
    ClearBlade.init({
		systemKey: req.systemKey,
		systemSecret: req.systemSecret,
		email: "test@clearblade.com",
		password: "clearblade",
		callback: function(err, body) {
			if(err) {
			    log("Init Error: " + JSON.stringify(body));
				resp.error("initialization error " + JSON.stringify(body));
			} else {
			    log("Init success");
				//resp.success(body);
				var topic = "ble/" + gatewayAddress + "/BLECommands";
				var payload = {"command": "connect", "deviceAddress": deviceAddress, "deviceType": deviceType, "uuids": [uuid]};
				var msg = ClearBlade.Messaging({}, function(){});
                msg.publish(topic, JSON.stringify(payload));
                resp.success("Done");
			}
		}
	});
}