var projectID = req.params.projectID;
var datasetID = req.params.datasetID;
var token = req.params.token;

var authToken = "Bearer " + token;

var options = {
	uri: "https://www.googleapis.com/bigquery/v2/projects/" + projectID + "/datasets/" + datasetID,
	headers: {
		"Authorization": authToken
	}
}

var request = Requests();
request.delete(options, function(err, data) {
	resp.success(data);
})
