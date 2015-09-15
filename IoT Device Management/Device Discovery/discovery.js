var requestType = req.params.body.requestType;
var deviceState = req.params.body.deviceState;
var discoverable = req.params.body.isDiscoverable;
var geolocation = req.params.body.deviceLocation;
var deviceItemID = req.params.body.itemID;

var collectionID = "YOUR_COLLECTIONID";

ClearBlade.setUser(req.userToken, req.userEmail);

function addDeviceState() {
	var collectionCallback = function(err, result) {
		if (err) {
			resp.success(result);
		} else {
			var itemID = result[0].item_id
			resp.success(itemID);
		}
	}
	var collection = ClearBlade.Collection(collectionID);
	var newItem = {
		state: deviceState,
		isDiscoverable: discoverable,
		location: geolocation
	};
	collection.create(newItem, collectionCallback);
}

function updateDeviceState() {
	var updateCallback = function(err, result) {
		if (err) {
			resp.success(result);
		} else {
			resp.success("Update successful");
		}
	}
	var collection = ClearBlade.Collection(collectionID);
	var query = ClearBlade.Query();
	query.equalTo("Item Id", deviceItemID);
	var changes = {
		state: deviceState,
		isDiscoverable: discoverable,
		location: geolocation
	};
	collection.update(query, changes, updateCallback);
}

function getDeviceState() {
	var getCallback = function(err, result) {
		if (err) {
			resp.success(result);
		} else {
			resp.success(result);
		}
	}
	var query = ClearBlade.Query({'collectionID': collectionID});
	query.equalTo("Item Id", deviceItemID);
	query.fetch(getCallback);
}

function removeDevice() {
	var removeCallback = function(err, result) {
		if (err) {
			resp.success(result);
		} else {
			resp.success("Remove successful");
		}
	}
	var collection = ClearBlade.Collection(collectionID);
	var query = ClearBlade.Query();
	query.equalTo("Item Id", deviceItemID);
	collection.remove(query, removeCallback);
}

function getAllDevices() {
	var fetchCallback = function(err, result) {
		if (err) {
			resp.success(result);
		} else {
			resp.success(result);
		}
	}
	var collection = ClearBlade.Collection(collectionID);
	var query = ClearBlade.Query();
	collection.fetch(query, fetchCallback);
}

if (requestType === "AddDeviceState") {
	addDeviceState();
} else if (requestType === "UpdateDeviceState") {
	updateDeviceState();
} else if (requestType === "GetDeviceState") {
	getDeviceState();
} else if (requestType === "RemoveDevice") {
	removeDevice();
} else if (requestType === "GetAllDevices") {
	getAllDevices();
} else {
	resp.error("Invalid request type");
}