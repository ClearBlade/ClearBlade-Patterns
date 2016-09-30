angular.module(app_name)
.service('cb', ['$q', function ($q) {

	var cbObj = new ClearBlade();

	var init = function (email, password) {
		var deferred = $q.defer();

		var initOptions = {
			systemKey: <SYSTEM_KEY>,
			systemSecret: <SYSTEM_SECRET>,
			URI: "https://platform.clearblade.com",

			callback: function (err, body) {
				if (err) {
					deferred.reject(body);
				} else {
					deferred.resolve(body);
				}
			}
		}
		if (typeof email != undefined){
			initOptions.email = email
		}
		if (typeof password != undefined){
			initOptions.password = password
		}

		cbObj.init(initOptions);

		return deferred.promise;
	}

	var runCode = function (funcName, params, retryCounter) {
		var deferred = $q.defer();
		if(typeof retryCounter == 'undefined'){
			retryCounter = 0;
		}
		var retryMax = 4;

		function go() {
			cbObj.Code().execute(funcName, params, function (err, body) {
				if (err) {
					if(retryCounter<retryMax){
						retryCounter++;
						go();
					}else{
						if(body.message === 'Not Authorized'){
							code = 'code:4';
							resp = body + '\n' + code
							deferred.reject(resp);
						}
						else {
							code = 'code:3';
							resp = body + '\n' + code 
							deferred.reject(resp);
						}
					}
				} else {
                        //if service returned a status code - there was an error
                        if (body.results.code) {
                        	if(retryCounter<retryMax){
                        		retryCounter++;
                        		go();
                        	}else{
                        		deferred.reject(body.results.message);
                        	}
                        } else {
                        	if(body.results === 'not callable' && body.success === false)
                        		body.code = '2';
                        	else if(body.results.search('SyntaxError')>=0 || body.success === false)
                        		body.code = '6';
                        	else if(body.success === true)
                        		body.code = '1';
                        	console.log(body);
                        	deferred.resolve(body);
                        }
                    }
                });
}
if (!cbObj.user) {
	init().then(function () {
		go();
	}, function (err) {
		if(retryCounter<retryMax){
			retryCounter++;
                  runCode(funcName, params, retryCounter); //try again from the start
              }else{
              	deferred.reject(err);
              }
          });
} else {
	go()
}

return deferred.promise;
}

return {
	ClearBlade: cbObj,
	init: init,
	runCode: runCode
}
}])