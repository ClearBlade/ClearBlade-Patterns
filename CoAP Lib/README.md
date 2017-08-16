# CoAP Lib

A ClearBlade library for parsing and building CoAP packets.

Written in accordance to the [RFC 7252](https://tools.ietf.org/html/rfc7252) specification.

## Usage

### Import to ClearBlade Platform

Currently, the easiest way to do this is by copy/pasting this into a new library.
Then make sure you include it as a dependency in any service you're calling it from. 

### Parsing

Parsing assumes your packet is an array of integers. 

Assuming you pass in a valid packet, the parse function will return an object with the following key-value pairs:

 - CoAP Version (int) - should always be 1.
 - Request Type (string) - one of: Confirmable, Non-confirmable, Acknowledgement, or Reset.
 - Command (dict) - contains:
  - Type (string) - either Request or Response.
  - Name (string) - something like GET or Not Found.
  - Code (string) - the code associated with this response/request name.
 - Message ID (string) - the hex string representation of the message ID.
 - Token (string) - the hex string representation of the token.
 - Options (dictionary) - option names and their associated values (if any are present).

##### Example

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

Building assumes you construct your options object in the following format.
The first four keys are required, options is _optionary_.

- Request Type (string) - one of: Confirmable, Non-confirmable, Acknowledgement, or Reset.
- Command (string) - either the code or name of the request/response.
- Message ID (string) - the hex string representation of the message ID.
- Token (string) - the hex string representation of the token.
- Options (dict) - option names and their associated values.
   Options will expect their values in the following formats:
 - If-Match - integer array representing the raw hex bytes.
 - Uri-Host - string. Max of 255 characters.
 - ETag - integer array representing the raw hex bytes.
 - If-None-Match - empty array.
 - Uri-Port - integer.
 - Location-Path - string. Max of 255 characters.
 - Uri-Path - string. Max of 255 characters.
 - Content-Format - string. 
   One of:
     - text/plain
     - application/link-format
     - application/xml
     - application/octet-stream
     - application/exi
     - application/json
 - Max-Age - integer.
 - Uri-Query - string. Max of 255 characters.
 - Accept - string.
    Same options as Content-Format.
 - Location-Query - string. Max of 255 characters.
 - Proxy-Uri - string. Max of 1034 characters.
 - Proxy-Scheme - string. Max of 255 characters.
 - Size1 - integer.

##### Example

```javascript
var options = {
	"Request Type": "Confirmable",
	"Command": "POST",
	"Message ID": 24,
	"Token": 1,
	"Options": {
		"Uri-Path": "clearblade_rgb",
		"Content-Format": "application/octet-stream",
		"Payload": [0, 255, 112, 255, 0]
	}
};

// Make a CoAP object
var coap = CoAP();

// Building a packet returns an array of integers
var newPacket = coap.build(options);
log(newPacket);
// [65, 2, 0, 24, 1, 189, 1, 99, 108, 101, 97, 114, 98, 108, 97, 100, 101, 95, 114, 103, 98, 17, 42, 255, 0, 255, 112, 255, 0]
```