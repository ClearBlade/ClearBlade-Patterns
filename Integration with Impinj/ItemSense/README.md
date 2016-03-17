#Integration wtih Impinj ItemSense
This ClearBlade pattern provides integration and sample code for integration with Impinj ItemSense.  

**About ItemSense** - ItemSense is a software platform that aggregates and transforms torrents of raw RAIN RFID data into real-time, business-driven Item Intelligence.  [API Docs](http://developer.impinj.com/itemsense/docs/api/)


The items api are available with the attached Library code.

### Requires:
	http library

### Usage:
```
	...
	itemsenseConfig.username = 'admin';
    itemsenseConfig.password = 'admindefault';
    itemsenseConfig.itemsenseUrl = 'http://192.168.0.113/itemsense';
    var itemSense = new ItemSense(itemsenseConfig);
    var callback = function(err, response) {
        if (err) {
            resp.error("failed to get items: "+response);
        }else {
            resp.success("success" + JSON.stringify(response));
        }
    }
    itemSense.getItems({}, callback);
    ...

```
