var latitude = req.params.items[0].latitude;
var longitude = req.params.items[0].longitude;

resp.success("Latitude: " + latitude + ", Longitude: " + longitude);