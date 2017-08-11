# CoAP Lib

A ClearBlade library for parsing and building CoAP packets.

**Under construction!**
Parsing works but building does not.

## Usage

### Import to ClearBlade Platform

Currently, the easiest way to do this is by copy/pasting this into a new library.
Then make sure you include it as a dependency in any service you're calling it from. 

### Parsing

Parsing assumes your packet is an array of integers. 

```javascript
// Make a CoAP object
var coap = CoAP();

// This is the packet we want to parse
var packet = [65,1,0,1,0,186,99,108,101,97,114,98,108,97,100,101,97,50];

// Parsing the packet returns an object like below
var parsed = coap.parse(packet);
log(parsed);
/*
{
  "CoAP Version": 1,
  "Request Type": "Confirmable",
  "Command": {
    "Code": "0.01",
    "Name": "GET",
    "Type": "Request"
  },
  "Message ID": "0001",
  "Token": "00",
  "Options": {
    "Uri-Path": "clearblade",
    "Accept": "application/json"
  }
}
*/
```

### Building

_(remember that buiding doesn't work yet so don't you go expecting anything)_

Building assumes you construct your options object in the following format.

```javascript
var options = {
	"Request Type": "Confirmable",
	"Command": "POST",
	"Message ID": 24,
	"Token": 1,
	"Options": {
		"Uri-Path": "clearblade_rgb",
		"Content-Type": "application/octet-stream",
		"Payload": [0, 255, 112, 255, 0]
};

// Make a CoAP object
var coap = CoAP();

// Building a packet returns an array of integers
var newPacket = coap.build(options);
log(newPacket);
// [65, 2, 0, 24, 1, 185, 114, 103, 98, 45, 108, 105, 103, 104, 116, 97, 42, 255, 0, 255, 112, 255, 0]
```