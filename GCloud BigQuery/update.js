var projectID = req.params.projectID;
var datasetID = req.params.datasetID;
var requestBody = req.params.body;
var token = req.params.token;

var authToken = "Bearer " + token;

var options = {
	uri: "https://www.googleapis.com/bigquery/v2/projects/" + projectID + "/datasets/" + datasetID,
	body: requestBody,
	headers: {
		"Authorization": authToken
	}
}

var request = Requests();
request.put(options, function(err, data) {
	resp.success(data);
})