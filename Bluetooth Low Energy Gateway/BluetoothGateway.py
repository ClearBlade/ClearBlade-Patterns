import os
import re
import time
import json
import sys
import atexit
from MQTT import MQTT
from BluetoothLE import BluetoothLE
from bluepy.btle import Scanner, ScanEntry, DefaultDelegate, BTLEException

class BluetoothGateway:
        connectedBLEDevices = {}
        
        def __init__(self, credentials):
                self.credentials = credentials
                self.scanner = None

                self.gwBTMac = self.GetMacAddress()
                self.StartGateway()


        def GetMacAddress(self):
                #Execute the hcitool command and extract the mac address using a regular expression
                mac = re.search('hci0\s*(([0-9a-fA-F]{2}:){5}([0-9a-fA-F]{2}))', os.popen('hcitool -i hci0 dev').read()).group(1)
                return mac

        def StartGateway(self):
                print("Starting Bluetooth Gateway\n")
                print("Connecting the MQTT Broker")
                self.mqtt = MQTT(self.credentials)
                time.sleep(2)

                #Subscribe to the BLE Commands topic
                #print "\nSubscribing to topic: ble/" + self.gwBTMac + "/BLECommands"
                self.mqtt.SubscribeToTopic("ble/" + self.gwBTMac + "/BLECommands", self.BleCommandReceived)

                
                #Publish the gateway status message
                #print "Publishing topic: " + "ble/" + self.gwBTMac + "/BLEGatewayStatus"
                self.PublishGatewayOnlineEvent()

                time.sleep(2)

                #Register an exit handler to set the gateway offline when an exit happens
                atexit.register(self.setGatewayOffline)

                try:
                        while True:
                                self.reconcileDevices()
                                
                                #Scan for devices every two minutes
                                self.ScanForDevices()
                                time.sleep(self.credentials['scanInterval'])
                except KeyboardInterrupt:
                        print "Gateway stopping..."

        def reconcileDevices(self):
                #If a device is in the connectedBLEDevices dictionary has a scanned attribute of false,
                #it has gone offline. Update the device status and delete the previous device
                for key in self.connectedBLEDevices.keys():
                        if self.connectedBLEDevices[key]['scanned'] == False:
                                print "Device disconnected, deleting device", key
                                self.setDeviceStatus(self.connectedBLEDevices[key]['peripheral'], False)
                                del self.connectedBLEDevices[key]['peripheral']
                                del self.connectedBLEDevices[key]

        def setDeviceStatus(self, device, online):
                dev = {}
                dev['deviceAddress'] = device.deviceAddress
                dev['deviceType'] = device.deviceType
                dev['deviceAddrType'] = device.addrType

                if online:
                        dev['status'] = "Connected"
                        print "Setting the device to Connected"
                else:
                        dev['status'] = "Offline"
                        print "Setting the device to Offline"

                #Publish the device status message
                self.PublishMessage(json.dumps(dev), "BLEDeviceStatus",  None)

        def setGatewayOffline(self):
                #Publish the gateway status message
                print "Setting the gateway to offline"
                self.PublishGatewayOfflineEvent()

                #Give some time for the offline message to be published
                time.sleep(1)

        def ScanForDevices(self):
                #Before we re-scan again, set the scanned attribute of the existing devices to false
                for key in self.connectedBLEDevices.keys():
                        self.connectedBLEDevices[key]['scanned'] = False

                print("Scanning for devices")
                if self.scanner == None:
                        self.scanner = Scanner().withDelegate(ScanDelegate(self))

                #devices will contain an array of ScanEntry objects
                devices = self.scanner.scan(5)
                
        def PublishMessage(self, message, messageType, callback):
                if messageType == "addBLEdevice":
                        self.mqtt.PublishTopic(messageType, message, callback)
                else:
                        topic = "ble/" + self.gwBTMac + "/" + messageType
                        self.mqtt.PublishTopic(topic, message, callback)

        def PublishGatewayOnlineEvent(self):
                messageToPublish = "{\"gatewayAddress\":\"" + self.gwBTMac + "\", \"status\": \"Online\"}"
                #self.PublishMessage(messageToPublish, "BLEGatewayStatus", self.OnStatusPublished)
                self.PublishMessage(messageToPublish, "BLEGatewayStatus", None)

        def PublishGatewayOfflineEvent(self):
                messageToPublish = "{\"gatewayAddress\":\"" + self.gwBTMac + "\", \"status\": \"Offline\"}"
                self.PublishMessage(messageToPublish, "/BLEGatewayStatus", None)

        def PublishGatewayOfflineEvent(self):
                messageToPublish = "{\"gatewayAddress\":\"" + self.gwBTMac + "\", \"status\": \"Offline\"}"
                self.PublishMessage(messageToPublish, "/BLEDeviceStatus", None)

        def PublishError(self, error):
                self.PublishMessage(error, "BLEErrors", None)

        def OnStatusPublished(self, client, userdata, mid):
                print "Gateway status set to online"        

        def BleCommandReceived(self, client, obj, message):
                arrivedMessageJSON = message.payload

                try:
                        parsedMessage = json.loads(arrivedMessageJSON)
                        if parsedMessage['command'] == 'connect':
                                deviceAddress = parsedMessage['deviceAddress']
                                deviceType = parsedMessage['deviceType']
                                deviceAddrType = parsedMessage['deviceAddrType']
                                try:
                                        #If the device already exists, use the existing peripheral instance
                                        # and re-read the data values
                                        if self.connectedBLEDevices.get(deviceAddress) == None:
                                                print "Creating new device"
                                                peripheral = BluetoothLE(deviceAddress, deviceType, deviceAddrType, self)
                                                device = {}
                                                device['peripheral'] = peripheral
                                                device['scanned'] = True
                                                self.connectedBLEDevices[deviceAddress] = device
                                        else:
                                                print "Connecting to existing device"
                                                self.connectedBLEDevices[deviceAddress]['scanned'] = True
                                                self.connectedBLEDevices[deviceAddress]['peripheral'].ConnectToBLEDevice(False)

                                except BTLEException as be:
                                        print("BTLEException: " + str(be))
                                        self.PublishError("BTLEException: Code = " + str(be.code) + ", Message = " + be.message)
                                except:
                                        print(sys.exc_info())
                                        print("Could not connect to " + deviceType)
                                        self.PublishError("Could not connect to " + deviceType)
                        elif parsedMessage['command'] == 'write':
                                writeDeviceAddress = parsedMessage['deviceAddress']
                                if (writeDeviceAddress in self.connectedBLEDevices) == True:
                                        try:
                                                self.connectedBLEDevices[writeDeviceAddress]['peripheral'].WriteValue(parsedMessage['data'], parsedMessage['uuid'])
                                        except:
                                                print("Error writing to BLE device" + deviceAddress)
                                                self.PublishError("Error writing to BLE device " + deviceAddress)
                                else:
                                        print(writeDeviceAddress + ": No such device found in device dictionary. Please connect the device first and then try again")
                                        self.PublishError(writeDeviceAddress + \
                                                ": No such device found in device dictionary. Please connect the device first and then try again")
                except:
                        print "Invalid JSON received in BTLE command"
                        print arrivedMessageJSON
                        print(sys.exc_info())
                        self.PublishError("Invalid JSON received in BTLE command")

#This class is used by the btle.Scanner class. The class provides methods
#invoked by the scanner when device related events occur
class ScanDelegate(DefaultDelegate):
        def __init__(self, gateway):
                self.gateway = gateway
                DefaultDelegate.__init__(self)

        #Invoked when advertising data is received from a BLE device
        def handleDiscovery(self, dev, isNewDev, isNewData):
                #Add the device to the internal array
                #self.gateway.connectedBLEDevices[dev.addr] = dev

                #We only want to use the device if we can connect to it
                if dev.connectable:
                        #Only add the device if it is new
                        #TODO - Handle isNewData later
                        if isNewDev:
                                #Initialize the device type
                                deviceType = "Unknown"

                                #Loop through the advertising data to try and find the name tuples
                                scanData = dev.getScanData()
                                for tuple in scanData:
                                        if tuple[0] == 8 or tuple[0] == 9:
                                                print "Setting device type to " + dev.getValueText(tuple[0])
                                                deviceType = dev.getValueText(tuple[0])

                                if deviceType != "Unknown":
                                        self.addDeviceToPlatform(str(dev.addr), dev.addrType, str(deviceType))

        #Invoked when a notification is received from a connected Peripheral object
        def handleNotification(self, charHandle, data):
                #Print the data that was received
                print data

        def addDeviceToPlatform(self, mac, addrType, deviceType):
                print "Adding device to platform"

                #Add the device to the platform
                device = {}
                device["deviceAddress"] = mac
                device["deviceType"] = deviceType
                device["deviceAddrType"] = addrType
                device["gatewayAddress"] = self.gateway.gwBTMac

                self.gateway.PublishMessage(json.dumps(device), "addBLEdevice", None)
