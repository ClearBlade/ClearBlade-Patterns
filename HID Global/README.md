# HID Global NFC Tag authentication using ClearBlade

The ClearBlade Platform can be used to authenticate HID Global's NFC Tags. When you tap the tag on your device, it sends a GET request to ClearBlade. The parameters from the GET request are captured by the ClearBlade Platform. A Code Service on the platform then constructs a POST request body with the captured parameters and makes a POST request to the HID REST Endpoint to verify the authenticity of the tag. The response from the POST is written to a Collection on the ClearBlade platform and the authentication status is given back to the client who made the request.

### Create a Collection
- Create a new Collection on the ClearBlade Console and add columns named tagid, tac, description and timestamp of type string.
- Update the permissions of the Collection so that an authenticated user can create, read, write and delete.
- Make a note of the collection ID.

### Create a Code Service
- Create a new Code Service and require the **http** and **clearblade** libraries to it.
- Copy and paste the code from VerifyTags.js included in this folder.
- Replace the collection ID, HID username and password and ClearBlade username and password in the code with your credentials.

In order to test authentication for the tags, we have a simple HTTP server written in Go lang which listens to port 80, intercepts the GET request made by the tag, takes the tagID and tac parameters from the GET request and executes a Code Service that you just created.

- In your Go workspace create the following folder structure: ```/yourGoWorkspace/src/github.com/clearblade/``` and cd into it.
- First of all, you will need to download the ClearBlade Go SDK. Do a ```git clone https://github.com/ClearBlade/Go-SDK.git``` and ```git clone https://github.com/ClearBlade/mqttclient.git``` and ```git clone https://github.com/ClearBlade/mqtt_parsing.git```
- Inside the clearblade folder do a ```mkdir hid-test``` and ```cd hid-test```
- Copy the files and folders from GoCode from this repo and paste them in the hid-test directory.
- Go to ```/hid-test/codeservice/codeservice.go``` and change the system key, system secret, username, password and platform URL with your information.
- You will also need to change the name of the Code Service in the Go program to the one you just created.
- Currently this Go program listens to all request on port 80 that have ```/demo?``` format. You can change it to wherever your tag points to.
- cd into the codeservice directory and do a ```go install```
- cd back to the GoCode directory and do a ```go build request_interceptor.go```
- Start the HTTP server by doing ```sudo ./request_interceptor```
