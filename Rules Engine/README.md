Write your own business rules in the ClearBlade platform.

1.  Add RulesLib.js to your System Library
2.  Create a new ClearBlade service
3.  From your service require the RulesLib library
4.  Define a trigger on the service  EX: Message received from a topic "/iot/sensors"
5.  Write your rule

```function mySensorRule(req, resp) {
  var sensorRule = new Rule();
  
  var sensorRuleResult = function(valid, message){
    if (valid){
      //the rule was invalid - OPTIONALLY - publish message, log event, call another service
    } else {
      //the rule was invalidated - OPTIONALLY - publish message, log event, call another service
    }
  };
  sensorRule.greaterThan(req.params.temperature, 50)
      .contains(["asdfw23", "23lis0"], req.params.sensorid)
      .equals(req.params.status, 1);
  sensorRule.validateRule(callback);
}```

