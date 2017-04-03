import thread
import sys
import time
import json
import string
from bluepy.btle import Peripheral
from bluepy.btle import Scanner
from bluepy.btle import UUID
from bluepy.btle import BTLEException

class BluetoothLE:
	def __init__(self, deviceAddress, deviceType, addrType, mqttConnection):
		self.deviceAddress = deviceAddress
		self.deviceType = deviceType
		self.mqtt = mqttConnection
		self.addrType = addrType
		self.bleConnection = None
		
		self.ConnectToBLEDevice(True)

	def ConnectToBLEDevice(self, createNew):
                print "Connecting to device ", self.deviceType
                if createNew:
                        self.bleConnection = Peripheral(self.deviceAddress, self.addrType)
                        self.mqtt.setDeviceStatus(self, True)
                else:
                        self.bleConnection.connect(self.deviceAddress, self.addrType)
                        
		print "Connected to " + self.deviceType
		thread.start_new_thread(self.ReadLoop, ())


	def ReadLoop(self):
                readData = {}
		characteristics = self.bleConnection.getCharacteristics()

		for char in characteristics:
                        if char.supportsRead():
                                try:
                                        value = char.read()
                                        printable = True
                                        #if the value is not printable, string escape it
                                        for c in value:
                                                if c in string.printable:
                                                        printable = False
                                                        break

                                        if not printable:
                                                value = value.encode('string-escape')

                                        readData[str(char.uuid.getCommonName())] = value
                                except:
                                        print "Failed to read data for uuid ", str(char.uuid.getCommonName())
                                        print sys.exc_info()

                readData["services"] = []
		
		services = self.bleConnection.getServices()
		for service in services:
                        serviceData = {}
                        serviceData["name"] = str(service.uuid.getCommonName())

                        serviceChars = service.getCharacteristics()
                        for serviceChar in serviceChars:
                                if serviceChar.supportsRead():
                                        try:
                                                value = serviceChar.read()
                                                printable = True
                                                #if the value is not printable, string escape it
                                                for c in value:
                                                        if c in string.printable:
                                                                printable = False
                                                                break
                                                if not printable:
                                                        value = value.encode('string-escape')

                                                serviceData[str(serviceChar.uuid.getCommonName())] = value
                                        except:
                                                print "Failed to read data for uuid ", str(serviceChar.uuid.getCommonName())
                                                print sys.exc_info()

                        if serviceData:
                                readData["services"].append(serviceData)

                print readData

		message = {}
		message["deviceAddress"] = self.deviceAddress
		message["deviceType"] = self.deviceType
		message["readData"] = str(readData)

		self.mqtt.PublishMessage(json.dumps(message), "BLEReadData", None)

		#Disconnect the peripheral once we are done reading data
		self.bleConnection.disconnect()

	def ReadValue(self, uuid):
		characteristics = self.bleConnection.getCharacteristics(uuid=uuid)[0]
		readValue = characteristics.read()

		messageToPublish = "{\"deviceType\":\"" + self.deviceType + "\", \"deviceAddress\":\"" + self.deviceAddress + "\", \"readData\": \"" + readValue + "\"}"
		self.mqtt.PublishMessage(messageToPublish, "BLEReadData", None)

	def WriteValue(self, data, uuid):
		uuidValue = UUID(uuid)
		characteristics = self.bleConnection.getCharacteristics(uuid=uuid)[0]
		characteristics.write(data, True)
		print "Successfully wrote data to device " + self.deviceAddress
