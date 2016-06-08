function BLE(req, resp){
    log("Starting");
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
			}
		}
	});

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
    if((topicEnd !== "executed") && (topicEnd !== "messages")) {
        ProcessTopic(topicEnd, mac, message, resp);
    }
}