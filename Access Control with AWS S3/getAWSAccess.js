function getAWSAccess(req, resp){
    function getAccess() {
        var callback = function(err, data) {
            if (err) {
                resp.error(data);
            } else {
                resp.success(data);
            }
        }
        var query = ClearBlade.Query({'collectionName': <COLLECTION_NAME>});
        query.fetch(callback);
    }
    
    ClearBlade.init({request:req});
    getAccess();
}