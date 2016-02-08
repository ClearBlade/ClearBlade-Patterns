/**
  * This gets the EIDs according to the param. For 'Product' EID, tier is required. For others it can be a null ("") string
  */

function getEID(param, tier) {
    var eid = -1;
    var url = "";
    if (param === "Product") {
        if (tier === "Free") {
            url = "https://partners.gotransverse.com/t/s/r/1.28/products?name=Free";
        } else if (tier === "Flex") {
            url = "https://partners.gotransverse.com/t/s/r/1.28/products?name=Flex";
        } else {
            return eid;
        }
    } else if (param === "Bill Cycle") {
        url = "https://partners.gotransverse.com/t/s/r/1.28/billCycles?name=Monthly";
    } else if (param === "Billing Account Category") {
        url = "https://partners.gotransverse.com/t/s/r/1.28/billingAccountCategories";
    } else if (param === "Service Resource Category") {
        url = "https://partners.gotransverse.com/t/s/r/1.28/serviceResourceCategories?name=" + encodeURIComponent("email address");
    } else {
        return eid;
    }
    var options = {
        uri: url,
        auth: {
            user: "username",
            pass: "password"
        },
        isSoap: true
    };
        
    var requestObject = Requests();
    requestObject.get(options, function(err,response) {
        eid = JSON.parse(response)[0].Children[0].Attr.eid;
    });
    
    return eid;
}