	var count = -1;
    count = CalculateCount(resp, req);
    
    if (count !== -1) {
        var finalBill = 250 + count;
        ChargeCustomer(finalBill, resp, req);
    } else {
        resp.success("could not get count");
    }