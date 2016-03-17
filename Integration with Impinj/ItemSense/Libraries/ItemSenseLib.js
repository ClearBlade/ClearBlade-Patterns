var itemsenseConfig = {
    username : "",
    password : "",
    itemsenseUrl : ""
} 

function ItemSense(config){
    this.items=[];
    this.config = config;
    this.getItems = function(queryParams, callback) {
        var url = config.itemsenseUrl+"/data/v1/items/show";
        
        var options = {
            uri: url,
            strictSSL: false,
            qs : queryParams,
            auth:{"user":config.username,"pass":config.password}, 
        };
        
        var requestObject = Requests();
        requestObject.get(options, function(err,response) {
           if (err) {
               resp.error(response);
               callback(err, response);
           } else {
                var r = JSON.parse(response);
                callback(err, r);
           }
        });
    };
    
    this.getItemsHistory = function(queryParams, callback){
        var url = config.itemsenseUrl+"/data/v1/items/show/history";
        
        var options = {
            uri: url,
            strictSSL: false,
            qs : queryParams,
            auth:{"user":config.username,"pass":config.password}, 
        };
        
        var requestObject = Requests();
        requestObject.get(options, function(err,response) {
           if (err) {
               resp.error(response);
               callback(err, response);
           } else {
                var r = JSON.parse(response);
                callback(err, r);
           }
        });
    };
}