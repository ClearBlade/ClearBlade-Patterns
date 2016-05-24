function qTest(req, resp){
    
    function requestAPage() {
        var request = Requests();
        var options = {
            "uri":"https://www.google.com",
        }
        var deferred = Q.defer();
     
        request.get(options, function(err,resp){
            if(err){
                //the error is a JSON value of the error in question, shaped like {"error":"message"}
                deferred.reject(new Error("Status code was " + JSON.stringify(err)));
            }else{
                //resp is JSON of the response
                deferred.resolve(resp);
            }
        } );
     
        return deferred.promise;
    }
    
    
    requestAPage()
        .then(function (value) {
                resp.success("promise was successful with value:"+value);
            }, function (reason) {
                resp.failure("promside failed because: "+reason);
            }
        );
}