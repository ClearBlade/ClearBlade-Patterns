function AddNewBLEDevice(req, resp){
    var deviceAddress = "FC:FC:48:9F:E6:E7";
    var gatewayAddress = "f4:0f:24:22:89:cd";
    var uuid = 0x2A06
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
				var topic = "ble/" + gatewayAddress + "/BLEDeviceStatus";
				var payload = {"command": "connect", "deviceAddress": deviceAddress, "deviceType": deviceType, "uuids": [uuid]};
				var msg = ClearBlade.Messaging({}, function(){});
                msg.publish(topic, JSON.stringify(payload));
                resp.success("Done");
			}
		}
	});
}