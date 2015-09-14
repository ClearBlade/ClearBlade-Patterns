
var deviceID = req.params.deviceID;
var deviceKey = req.params.deviceKey;

var authToken;
var deviceInfoCollectionID = "COLLECTION_ID";

function checkIfDeviceExists() {
    var queryCallback = function(err, result) {
        if (err) {
            resp.error(result);
        } else {
            resp.success(authToken);
        }
    }
    
	var query = ClearBlade.Query({'collectionID': deviceInfoCollectionID});
	query.equalTo("deviceid", deviceID);
	query.equalTo("devicekey", deviceKey)
	query.fetch(queryCallback);
}
    
function initClearBlade() {
	var initCallback = function(err, result) {
		if (err) {
			resp.error(result);
		} else {
			authToken = result.authToken;
			checkIfDeviceExists();
		}
	}

	var initOptions = {
		systemKey: req.systemKey,
		systemSecret: req.systemSecret,
		email: "email@email.com",
		password: "password",
		callback: initCallback
	}
    
    ClearBlade.init(initOptions);
}
    
initClearBlade();
