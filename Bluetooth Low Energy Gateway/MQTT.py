import sys
from clearblade import auth
from clearblade import Client
from clearblade import Messaging

class MQTT:
	def __init__(self, credentials):
		self.systemKey = credentials['systemKey']
		self.systemSecret = credentials['systemSecret']
		self.username = credentials['deviceName']
		self.password = credentials['activeKey']
		self.platformURL = credentials['platformURL']

                #Connect to MQTT
                self.messagingClient = self.Connect()

	def Connect(self):
                cbAuth = auth.Auth()

                #Authenticate using device auth
                device = Client.DevClient(self.systemKey, self.systemSecret, self.username, self.password, self.platformURL)
                cbAuth.Authenticate(device)
                messagingClient = Messaging.Messaging(device)

                messagingClient.InitializeMQTT()
		return messagingClient

	def PublishTopic(self, topic, message, callback):
                self.messagingClient.publishMessage(topic, message, 0, callback)

	def SubscribeToTopic(self, topic, callback):
		self.messagingClient.subscribe(topic, 0, callback)
