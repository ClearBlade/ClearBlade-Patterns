# Bluetooth Low Enegry Gateway for ClearBlade

This is a BLE Gateway for the Raspberry Pi. It connects to the ClearBlade platform over MQTT and sends status and error messages back to the platform for processing. Commands can be sent to this gateway from the platform for adding new BLE devices, reading and writing data to and from these devices.

## Prerequisites
- Install the cb-cli tool from http://docs.clearblade.com/v/2/4-Developer_Reference/CLI/1_GettingStarted/ 
- You will need the ClearBlade Python SDK installed. Instructions can be found at https://github.com/ClearBlade/Python-API  
- Eclipse Paho Python SDK is required. Installation instructions can be found at https://eclipse.org/paho/clients/python/ 
- Lastly the bluepy BLE library for Python is required and can be downloaded from https://github.com/IanHarvey/bluepy 

## Import the BLE System
- Create a new account on the ClearBlade platform if you haven't already
- Clone this repository
- You will need to import the __BLE__ system into your account 
- After you have installed the cb-cli tool ```cd``` into the __BLE__ directory
- Then run ```cb-cli import -importrows -importusers```
- It will ask you for the platform URL and your account username and password and then the system will be successfully imported
- This system contains all the code to process messages coming from the bluetooth gateway and also send messages to the gateway
- The __BLEGateway__ collection contains the gateway status, __BLEDevice__ collection contains the attached low energy devices to the gateway, __BLEReadValues__ collection contains the data read from these low energy devices and __BLEErrors__ collection contains the different error messages sent from the gateway

## Add the Gateway MAC Address to the BLEGateway Collection
- Before we start the gateway, we need to add the gateway's bluetooth MAC address to the __BLEGateway__ collection
- Create a new row in the __BLEGateway__ collection and copy and paste the bluetooth MAC address of your gateway under the __bluetooth_mac__ column


## Starting the Gateway  
-  Edit __main.py__ and fill the __credentials__ dictionary with your own credentials
- Run ```python main.py``` to start the gateway

## Add a new Bluetooth Low Energy device to the gateway
- To add a new device to the gateway, go to the __AddNewBLEDevice__ Code Service and change the deviceAddress, gatewayAddress, uuid and deviceType to that of the device you want to add and hit __Save and Test__
- This will add the new device and start reading data from the specified uuid 
- You can check for errors in the __BLEErrors__collection
- The new device, if added successfully will appear in the __BLEDevice__ collection and the data read from that device will be visible in the __BLEReadValues__ collection