    var token = req.params.token;
    var firstName = req.params.firstName;
    var lastName = req.params.lastName;
    var organization = req.params.org;
    var email = req.params.email;
    var tier = req.params.tier;
    var stripeCustomerID = "";
    
    var result = CreateStripeCustomer(token, resp);
    if (!result.error) {
        stripeCustomerID = result.response;
    } else {
        resp.error("Could not get customer ID");
    }
    
    if (stripeCustomerID !== "") {
        StoreUserDetails(firstName, lastName, organization, email, tier, stripeCustomerID, resp, req);
        resp.success("Done");
    }