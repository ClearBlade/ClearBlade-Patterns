var repoOwner = req.params.repoOwner;
var repoName = req.params.repoName;

var requestObject = Requests();
var options = {
    "uri": "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/commits"
};

requestObject.get(options, function(err, data) {
   resp.success(data); 
});