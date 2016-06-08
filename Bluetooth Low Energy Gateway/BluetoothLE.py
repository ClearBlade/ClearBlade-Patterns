import thread
import time
from bluepy.btle import Peripheral
from bluepy.btle import Scanner
from bluepy.btle import UUID

class BluetoothLE:
	def __init__(self, deviceAddress, deviceType, uuids, mqttConnection):
		self.deviceAddress = deviceAddress
		self.deviceType = deviceType
		self.uuids = uuids
		self.mqtt = mqttConnection
		self.bleConnection = self.ConnectToBLEDevice()

	def ConnectToBLEDevice(self):
		bleConnection = Peripheral(self.deviceAddress, "random")
		print "Connected to " + self.deviceAddress
		messageToPublish = "{\"deviceType\":\"" + self.deviceType + "\", \"deviceAddress\":\"" + self.deviceAddress + "\", \"status\": \"connected\"}"
		self.mqtt.PublishMessage(messageToPublish, "BLEDeviceStatus")
		thread.start_new_thread(self.ReadLoop, ())
		return bleConnection

	def ReadLoop(self):
		while True:
			for uuid in self.uuids:
				try:
					self.ReadValue(uuid)
				except:
					print "Failed to read data"

			time.sleep(2)

	def ReadValue(self, uuid):
		uuidValue = UUID(uuid)
		characteristics = self.bleConnection.getCharacteristics(uuid=uuid)[0]
		readValue = characteristics.read()
		print
		messageToPublish = "{\"deviceType\":\"" + self.deviceType + "\", \"deviceAddress\":\"" + self.deviceAddress + "\", \"readData\": \"" + readValue + "\"}"
		self.mqtt.PublishMessage(messageToPublish, "BLEReadData")

	def WriteValue(self, data, uuid):
		uuidValue = UUID(uuid)
		characteristics = self.bleConnection.getCharacteristics(uuid=uuid)[0]
		characteristics.write(data, True)
		print "Successfully wrote data to device " + self.deviceAddress
