function CalculateCount(resp, req) {
    var count = -1;
    var options = {
            uri: "https://rtp.clearblade.com/api/v/2/analytics/count?query={%22scope%22:{%22system%22:%22" + req.systemKey + "%22},%22filter%22:{%22query%22:[%22Services%22,%22Collections%22,%22Users%22,%22Systems%22,%22Developers%22]}}",
            headers: {
                "clearblade-devtoken": req.userToken
            }
        };
        
    var requestObject = ClearBlade.http().Request();
    requestObject.get(options, function(err,response) {
        var json;        
        if (err) {
            json = JSON.parse(response);
            resp.success(json)
        } else {
            var parsedJson = JSON.parse(response);
            count = parsedJson.Services + parsedJson.Collections + parsedJson.Users + parsedJson.Systems + parsedJson.Developers;
        }
    });
    
    return count;
}