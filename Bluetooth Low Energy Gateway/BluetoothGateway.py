from MQTT import MQTT

class BluetoothGateway:
	def StartGateway(self, credentials):
		print "Starting Bluetooth Gateway\n"
		print "Connecting the MQTT Broker"
		self.mqtt = MQTT(credentials)