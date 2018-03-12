# Bluetooth Low Enegry Gateway for ClearBlade

This is a BLE Gateway for the ClearBlade Platform that can be executed on any Linux operating system (including Raspberry Pi) supporting bluetooth. The adapter requires the bluez library to be installed. The adapter connects to the ClearBlade platform over MQTT and sends status and error messages back to the platform for processing. In addition, the adapter will automatically scan for BLE devices and add those devices to the ClearBlade Platform.

Commands can be sent to this gateway from the platform for reading and writing data to and from connected BLE devices.

## Prerequisites
- Install the cb-cli tool from http://docs.clearblade.com/v/2/4-Developer_Reference/CLI/1_GettingStarted/ 
- You will need the ClearBlade Python SDK installed. Instructions can be found at https://github.com/ClearBlade/Python-API  
- Eclipse Paho Python SDK is required. Installation instructions can be found at https://eclipse.org/paho/clients/python/ 
- Lastly, the bluepy BLE library for Python is required and can be downloaded from https://github.com/IanHarvey/bluepy 

## Import the BLE System
- Create a new account on the ClearBlade platform if you haven't already
- Clone this repository
- You will need to import the __BLE__ system into your account 
- After you have installed the cb-cli tool ```cd``` into the __BLE__ directory
- Then run ```cb-cli import -importrows -importusers```
- It will ask you for the platform URL and your account username and password and then the system will be successfully imported
- This system contains all the code needed to process messages coming from the bluetooth gateway and also send messages to the gateway
- The __BLEGateway__ collection contains the gateway status.
- The __BLEDevice__ collection contains the low energy devices connected to the gateway.
- The __BLEReadValues__ collection contains the data read from these low energy devices.
- The __BLEErrors__ collection contains various error messages sent from the gateway.

## Add device entry to devices table
Before we start the gateway, we need to add a device, representing the gateway, to the ClearBlade Platform.
- From the BLE system within the ClearBlade Platform Developers console, select __Auth --> Devices__
- Click __+ Device__
- Enter the following information in the __New Device__ dialog:
  - __Name__: The name of the device
  - __Type__: A description of the type of device being added (for example: Raspberry Pi 3 model B)
  - __Enabled__: _ _YES_ _
  - __Allow Key Authorization__: _ _YES_ _
- Click __Create__
- In the newly inserted row, double click within the __active_key__ cell and enter an authentication key (ex. 1234567890)

## Starting the Gateway  
- Open a terminal session on the device where the gateway will run and enter the following command:
  - sudo python main.py --systemKey <SYSTEM_KEY> --systemSecret <SYSTEM_SECRET>  --deviceName <DEVICE_NAME>  --activeKey <ACTIVE_KEY>  [--platformUrl <PLATFORM_URL>] [--scanInterval <SCAN_INTERVAL>]
    - Alternatively, you can also use the shorter versions of the flags:
      - sudo python main.py -k <SYSTEM_KEY> -s <SYSTEM_SECRET> -n <DEVICE_NAME> -a <ACTIVE_KEY> -u <PLATFORM_URL>
- Once the gateway has started, it will automatically:
  1. Start scanning for BLE devices
  2. Add any found devices to the platform
  3. Read any available information from the device
  4. Store data read from the device in the BLEReadValues collection