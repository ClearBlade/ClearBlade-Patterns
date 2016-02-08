/**
  * This creates a TRACT account. A json object containing POST body params needs to be passed in as an argument to this function.
  */

function createAccount(json) {
    var billCycleEID = json.billCycle;
    var fname = json.firstname;
    var lname = json.lastname;
    var mname = json.middlename;
    var city = json.city;
    var state = json.state;
    var zip = json.zip;
    var line1 = json.line1;
    var areaCode = json.areaCode;
    var number = json.number;
    var email = json.email;
    var billingAccountCategoryEID = json.billAccountCat;
    var productEID = json.product;
    var serviceResourceCategoryEID = json.service;
    var result;
    var postBody =  "<salesOrder xmlns=\"http://www.tractbilling.com/billing/1_28/domain\">"+
                    "<billingAccount billType=\"EMAIL\" automaticRecurringPayment=\"false\">"+
                    "<monthlyBillCycle eid=\"" + billCycleEID + "\"/>"+
                    "<person firstName=\"" + fname + "\" lastName=\"" + lname + "\" middleName=\"" + mname + "\">"+
                    "<addresses>"+
                    "<postalAddress city=\"" + city + "\" regionOrState=\"" + state + "\" postalCode=\"" + zip + "\" line1=\"" + line1 + "\" purpose=\"BILLING\"/>"+
                    "<telecomAddress  areaCode=\"" + areaCode + "\" number=\"" + number + "\" purpose=\"MOBILE\"/>"+
                    "<emailAddress email=\"" + email + "\" purpose=\"PRIMARY\"/>"+
                    "</addresses>"+
                    "</person>"+
                    "<billingAccountCategory eid=\"" + billingAccountCategoryEID + "\"/>"+
                    "</billingAccount>"+
                    "<orderItems>"+
                    "<orderItem description=\"my description\" quantity=\"1\">"+
                    "<product eid=\"" + productEID + "\"/>"+
                    "<serviceResources>"+
                    "<serviceResource identifier=\"" + email + "\" status=\"AVAILABLE\">"+
                    "<category eid=\"" + serviceResourceCategoryEID + "\"/>"+
                    "</serviceResource>"+
                    "</serviceResources>"+
                    "</orderItem>"+
                    "</orderItems>"+
                    "</salesOrder>";
    
    var options = {
            uri: "https://partners.gotransverse.com/t/s/r/1.28/salesOrders",
            auth: {
                "user": "username",
                "pass": "password"
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