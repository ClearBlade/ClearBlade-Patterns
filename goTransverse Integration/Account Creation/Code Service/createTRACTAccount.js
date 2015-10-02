/**
  * This code service gets the EIDs of the product, bill cycle, billing account category and service resource category from 
  * the getEID library. It then makes a POST call to Transverse with all the EIDs and user credentials using the createAccount
  * library. If TRACT account is created successfully, it will call the registerDeveloper library to create a developer
  * account on the ClearBlade Platform. 
  * Required parameters to this Code Service are:
  * tier, fname(firstname), lname(lastname), mname(middlename), city, state, zip, line1(line 1 address), areacode, number, 
  * email, password and org(organization)
  */

function createTRACTAccount(req, resp){
    
    var productEID = getEID("Product", req.params.tier);
    if (productEID === -1) {
        resp.error({err: true, cause: "Could not find product/tier EID"});
    }
    
    var billCycleEID = getEID("Bill Cycle", "");
    if (billCycleEID === -1) {
        resp.error({err: true, cause: "Could not find bill cycle EID"});
    }
    
    var billingAccountCategoryEID = getEID("Billing Account Category", "");
    if (billingAccountCategoryEID === -1) {
        resp.error({err: true, cause: "Could not find billing account category EID"});
    }
    
    var serviceResourceCategoryEID = getEID("Service Resource Category", "");
    if (serviceResourceCategoryEID === -1) {
        resp.error({err: true, cause: "Could not find service resource category EID"});
    }
    
    var postParams = {
        "billCycle": billCycleEID,
        "firstname": req.params.fname,
        "lastname": req.params.lname,
        "middlename": req.params.mname,
        "city": req.params.city,
        "state": req.params.state,
        "zip": req.params.zip,
        "line1": req.params.line1,
        "areaCode": req.params.areacode,
        "number": req.params.number,
        "email": req.params.email,
        "billAccountCat": billingAccountCategoryEID,
        "product": productEID,
        "service": serviceResourceCategoryEID
    };
    
    var result = createAccount(postParams);
    if (typeof JSON.parse(result)[0].Attr.eid === "undefined") {
        resp.error({err: true, cause: "Failed to create TRACT user"});
    } else {
        var output = registerDeveloper(req);
        var devtoken = JSON.parse(output).dev_token;
        var didStore = storeUser(req);
        
        if (didStore) {
            resp.success({err: false, cause: "https://p1.clearblade.com/#/"});
        } else {
            resp.success({err: true, cause: "Could not store developer to a Collection"});
        }
    }
}