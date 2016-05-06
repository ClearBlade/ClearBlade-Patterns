var projectID = req.params.projectID;
var datasetID = req.params.datasetID;
var tableID = req.params.tableID;
var token = req.params.token;

var authToken = "Bearer " + token;

var requestObject = Requests();
var options = {
    "uri":"https://www.googleapis.com/bigquery/v2/projects/" + projectID + "/datasets/" + datasetID + "/tables/" + tableID + "/insertAll",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": authToken
    },
    "body": {
      "rows": 
      [
        {
          "json": 
          {
            "column1": "value",
            "column2": "value"
          }
        }
      ]
    }
};
    
requestObject.post(options, function(err, data) {
  if(err) {
    resp.error(err + data);
  } else {
    resp.success(data);
  }
});