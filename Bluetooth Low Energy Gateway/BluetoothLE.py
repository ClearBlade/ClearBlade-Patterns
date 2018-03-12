import thread
import sys
import time
import json
import string
import struct
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

	text_characters = "".join(map(chr, range(32, 127)))
	_null_trans = string.maketrans("", "")

	def isText(self, s, text_characters=text_characters, threshold=0.30):
                # if s contains any null, it's not text:
                if "\x00" in s:
                        return False
                # an "empty" string is "text" (arbitrary but reasonable choice):
                if not s:
                        return True
                # Get the substring of s made up of non-text characters
                t = s.translate(self._null_trans, text_characters)
                # s is 'text' if less than 30% of its characters are non-text ones:
                return len(t)/len(s) <= threshold

        def formatValue(self, value):
                #We need to determine if we have hex data or a character string
                #The best we can do, without hard coding characteristic ID's is to
                #see if the valueis alphanumeric or contains only 1 or 2 characters.
                #If the value is not alphanumeric or is a length of 1 or 2, assume it is hex data
                theValue = value

                if not self.isText(theValue) or len(theValue) ==1 or len(theValue) == 2:
                        #Assume the data is hex. We now need to unpack it
                        if len(theValue) == 1:
                                #Assume signed char
                                theValue = struct.unpack('b', theValue)[0]
                        elif len(theValue) ==2:
                                #Assume short
                                theValue = struct.unpack('h', theValue)[0]
                        elif len(theValue) == 4:
                                #Assume long
                                theValue = struct.unpack('l', theValue)[0]
                        elif len(theValue) == 8:
                                #Assume long long
                                theValue = struct.unpack('q', theValue)[0]
                        else:
                                #Only other thing we can do
                                theValue = theValue.encode('string-escape')

                return theValue

	def ReadLoop(self):
                readData = {}
		characteristics = self.bleConnection.getCharacteristics()

		for char in characteristics:
                        if char.supportsRead():
                                try:
                                        value = self.formatValue(char.read())
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
                                                value = self.formatValue(serviceChar.read())
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
                self.bleConnection.connect(self.deviceAddress, self.addrType)
		characteristics = self.bleConnection.getCharacteristics(uuid=uuid)[0]
		readValue = self.formatValue(characteristics.read())

		messageToPublish = {}
		messageToPublish["deviceType"] = self.deviceType
		messageToPublish["deviceAddress"] = self.deviceAddress
		messageToPublish["readData"] = readValue

		self.mqtt.PublishMessage(json.dumps(messageToPublish), "BLEReadData", None)
		self.bleConnection.disconnect()

		print "Successfully read data from device. Data value = ", readValue

	def WriteValue(self, data, uuid):
                self.bleConnection.connect(self.deviceAddress, self.addrType)
		uuidValue = UUID(uuid)
		characteristics = self.bleConnection.getCharacteristics(uuid=uuid)[0]
		characteristics.write(data, True)
		print "Successfully wrote data to device " + self.deviceAddress
		self.bleConnection.disconnect()