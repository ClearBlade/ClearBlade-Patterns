var projectID = req.params.projectID;

var options = {
	uri: "https://www.googleapis.com/bigquery/v2/projects/projectId/datasets"
}

var request = Requests();
request.get(options, function(err, data) {
	resp.success(data);
})