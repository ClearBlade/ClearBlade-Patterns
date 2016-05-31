var repoOwner = req.params.repoOwner;
var repoName = req.params.repoName;
var endpoint = req.params.endpoint;
var uri = "";

if(endpoint === "RepoDetails") {
    uri = "https://api.github.com/repos/" + repoOwner + "/" + repoName;
} else if(endpoint === "UserRepos") {
    uri = "https://api.github.com/users/" + repoOwner + "/repos";
} else if(endpoint === "OrgRepos") {
    uri = "https://api.github.com/orgs/" + repoOwner + "/repos";
} else {
    resp.error("Invalid Endpoint");
}

var requestObject = Requests();
var options = {
    "uri": uri
};

requestObject.get(options, function(err, data) {
   resp.success(data); 
});