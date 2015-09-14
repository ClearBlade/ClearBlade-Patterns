var devicesJsonObject = req.params.device;

var deviceKey = "";
var devicesCollectionID = "COLLECTION_ID";

function generateDeviceKey() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function addDevices() {
	var collectionCallback = function(err, result) {
		if (err) {
			resp.error(result);
		} else {

		}
	}

	deviceKey = generateDeviceKey();

	var collection = ClearBlade.Collection(devicesCollectionID);

	var newDevice = {
		"deviceid": devicesJsonObject.deviceID,
		"deviceKey": deviceKey
	}
	collection.create(newDevice, collectionCallback);
}

function initClearBlade() {
	var initCallback = function(err, result) {
		if (err) {
			resp.error(result);
		} else {
			addDevices();
			if (deviceKey !== "") {
				resp.success(deviceKey);
			} else {
				resp.error("Could not add device");
			}
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
