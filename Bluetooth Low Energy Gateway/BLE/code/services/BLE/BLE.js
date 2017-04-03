function BLE(req, resp){
    log("Starting");
    
    ClearBlade.init({request:req});
    
	var topic = req.params.topic;
    var message = req.params.body;
  
    var topicSplit = topic.split('/');
    if(topicSplit[0] !== "ble") {
        log("Invalid topic");
        resp.error({"error": true, "result": "Invalid Topic"});
    }
    
    var mac = topicSplit[1]; // Gateway bluetooth MAC
    var topicEnd = topicSplit[2];
    
    log("Processing Topic: " + topicEnd);
    if(topicEnd !== "BLECommands" && topicEnd !== "messages") {
        if(topicEnd != "connect") {
            log("Here");
            ProcessTopic(topicEnd, mac, message, resp);
        }
    }
}
