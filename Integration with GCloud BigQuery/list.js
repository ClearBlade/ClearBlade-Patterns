var projectID = req.params.projectID;
var token = req.params.token;

var authToken = "Bearer " + token;

var options = {
	uri: "https://www.googleapis.com/bigquery/v2/projects/" + projectID + "/datasets",
	headers: {
		"Authorization": authToken
	}
}

var request = Requests();
request.get(options, function(err, data) {
	resp.success(data);
})