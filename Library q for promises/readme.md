This qLib is a modified version of the nodeJS package https://www.npmjs.com/package/q

Simply import this as a library into your ClearBlade Platform system
Require the qLib in the service of your choice
Begin using q as normal

Ex: 

```
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
```

Note: only modifications from original library include
 removal of unneeded environment recongition code during entry
 removal of calls to setTimeouts (not honored in ClearBlade Platform).  These calls are unnecessary in ClearBlade Platform as they are only hacks to help performance in NodeJS
