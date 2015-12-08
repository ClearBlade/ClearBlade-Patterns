var options = {
        uri: "https://maker.ifttt.com/trigger/tweet/with/key/YOUR_KEY",
        body: {
            "value1": "",
            "value2": "",
            "value3": ""
        },
        headers: {
            "Content-Type": "application/json"
        }
};
    
var request = Requests();
request.post(options, function(err, data) {
    if(err) {
        resp.error(data);
    } else {
        resp.success(data)
    }
});