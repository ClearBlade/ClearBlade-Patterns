import json
from clearblade import auth
from clearblade import Client
from clearblade import Messaging
from BluetoothLE import BluetoothLE

class MQTT:
	connectedBLEDevices = {}
	def __init__(self, credentials):
		self.systemKey = credentials['systemKey']
		self.systemSecret = credentials['systemSecret']
		self.username = credentials['username']
		self.password = credentials['password']
		self.platformURL = credentials['platformURL']
		self.gwBTMac = credentials['gwBTMac']
		self.mqttConnection = self.ConnectToMQTT()
		messageToPublish = "{\"gatewayAddress\":\"" + self.gwBTMac + "\", \"status\": \"Online\"}"
		self.mqttConnection.publishMessage("ble/" + self.gwBTMac + "/BLEGatewayStatus", messageToPublish, 0)
		self.Subscribe("ble/" + self.gwBTMac + "/BLECommands", self.MessageArrivedCallback)
		while True:
			pass

	def ConnectToMQTT(self):
		cbAuth = auth.Auth()
		user = Client.UserClient(self.systemKey, self.systemSecret, self.username, self.password, self.platformURL)
		cbAuth.Authenticate(user)
		messagingClient = Messaging.Messaging(user)
		messagingClient.InitializeMQTT()
		return messagingClient

	def PublishMessage(self, message, messageType):
		topic = "ble/" + self.gwBTMac + "/" + messageType
		self.mqttConnection.publishMessage(topic, message, 0)

	def MessageArrivedCallback(self, client, obj, message):
		arrivedMessageJSON = message.payload
		print arrivedMessageJSON

		try:
			parsedMessage = json.loads(arrivedMessageJSON)
			if parsedMessage['command'] == 'connect':
				deviceAddress = parsedMessage['deviceAddress']
				deviceType = parsedMessage['deviceType']
				uuids = parsedMessage['uuids']
				try:
					bleConnection = BluetoothLE(deviceAddress, deviceType, uuids, self)
					self.connectedBLEDevices[deviceAddress] = bleConnection
				except:
					print "Could not connect to " + deviceAddress
					self.PublishMessage("Could not connect to " + deviceAddress, "BLEErrors")
			elif parsedMessage['command'] == 'write':
				writeDeviceAddress = parsedMessage['deviceAddress']
				if self.connectedBLEDevices.has_key(writeDeviceAddress) == True:
					try:
						self.connectedBLEDevices[writeDeviceAddress].WriteValue(parsedMessage['data'], parsedMessage['uuid'])
					except:
						print "Error writing to BLE device"
						self.PublishMessage("Error writing to BLE device " + deviceAddress, "BLEErrors")
				else:
					print writeDeviceAddress + ": No such device found in device dictionary. Please connect the device first and then try again"
					self.PublishMessage(writeDeviceAddress + ": No such device found in device dictionary. Please connect the device first and then try again", "BLEErrors")
		except:
			print "Invalid JSON"
			self.PublishMessage("Invalid JSON", "BLEErrors")

	def Subscribe(self, topic, callback):
		self.mqttConnection.subscribe(topic, 0, callback)