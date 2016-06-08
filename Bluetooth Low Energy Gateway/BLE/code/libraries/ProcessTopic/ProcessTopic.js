function ProcessTopic(topic, deviceID, message, resp) {
    if(topic === "BLEGatewayStatus") {
        BLEGatewayStatus(deviceID, message, resp);
    } else if(topic === "BLEDeviceStatus") {
        BLEDeviceStatus(deviceID, message, resp);
    } else if(topic === "BLEErrors") {
        LogErrors(deviceID, message, resp);
    } else if(topic === "BLEReadData") {
        BLEReadData(deviceID, message, resp);
    } else {
        resp.error({error: true, result: "Invalid topic"});
    }
}