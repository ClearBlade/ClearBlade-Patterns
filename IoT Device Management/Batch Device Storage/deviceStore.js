var devicesJsonArray = req.params.devices;

var devicesCollectionID = "COLLECTION_ID";

function addDevices() {
	var collectionCallback = function(err, result) {
		if (err) {
			resp.error(result);
		} else {

		}
	}

	var collection = ClearBlade.Collection(devicesCollectionID);

	for (var i = 0; i < devicesJsonArray.length; i++) {
		var newDevice = {
			"deviceid": devicesJsonArray[i].deviceID,
			"deviceKey": devicesJsonArray[i].deviceKey
		}
		collection.create(newDevice, collectionCallback);
	}
}

function initClearBlade() {
	var initCallback = function(err, result) {
		if (err) {
			resp.error(result);
		} else {
			addDevices();
			resp.success("Added Devices");
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
