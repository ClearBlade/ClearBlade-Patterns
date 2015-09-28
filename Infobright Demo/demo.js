var collection = 'collectionID';
  
   var createCb = function(err, body) {
      if(err) {
          resp.error("Error");
      } else {
          resp.success("success");
      }
  };
  
  var initCallback = function() {
    var col = ClearBlade.Collection(collection);
    //row to be inserted into collection
    var publishObj = {data: req.params.body, topic: req.params.topic};

    col.create(publishObj, createCb);
  };
      
    // initialize ClearBlade object
  var initOptions = {
      systemKey: "systemkey",
      systemSecret: "systemsecret",
      email:"email",
      password:"password",
      callback: initCallback
  };
  ClearBlade.init(initOptions);