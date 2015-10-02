function sendBulkUsage() {
    var result;
    var postBody = "<bulkUsageEvents xmlns=\"http://www.tractbilling.com/billing/1_28/domain/rest\" xmlns:dom=\"http://www.tractbilling.com/billing/1_28/domain\">" +
                   "<dom:usageEvent serviceResourceId=\"sanket@deshpande.com\" startTime=\"" + new Date().toISOString().slice(0, 21) + "\" usageUom=\"COUNT\" usageAmount=\"10\" text01=\"API\" description=\"Test event\">" +
                   "<dom:serviceResourceType>GENERICSRVCRESOURCE</dom:serviceResourceType>" +
                   "</dom:usageEvent>" + 
                   "</bulkUsageEvents>";
    
    var options = {
            uri: "https://partners.gotransverse.com/t/s/r/1.28/usageEvents/bulk",
            auth: {
                "user": "cbapi",
                "pass": "san28ket!"
            },
            isSoap: true,
            headers: {
                "content-type":"application/xml"
            },
            body: postBody
        };
        
    var requestObject = Requests();
    requestObject.post(options, function(err,response) {
       result = response;
    });
    
    return result;
}