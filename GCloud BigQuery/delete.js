var projectID = req.params.projectID;
var datasetID = req.params.datasetID;

var options = {
	uri: "https://www.googleapis.com/bigquery/v2/projects/projectId/datasets/datasetId"
}

var request = Requests();
request.delete(options, function(err, data) {
	resp.success(data);
})
