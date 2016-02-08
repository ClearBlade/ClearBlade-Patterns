function getAWSAccess(req, resp){
    function getAccess() {
        var callback = function(err, data) {
            if (err) {
                resp.error(data);
            } else {
                resp.success(data);
            }
        }
        var query = ClearBlade.Query({'collectionID': 'ccd5d7e00ae096f1c2afafc8c9ae01'});
        query.fetch(callback);
    }
    
    ClearBlade.init({request:req});
    getAccess();
}