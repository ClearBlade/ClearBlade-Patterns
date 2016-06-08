from BluetoothGateway import BluetoothGateway

credentials = {'systemKey': 'SYSTEMKEY', 'systemSecret': 'SYSTEMSECRET', 'username': 'test@clearblade.com', 'password': 'clearblade', 'platformURL': 'PLATFORM_URL', 'gwBTMac': 'GATEWAY_BLUETOOTH_MAC'}

gateway = BluetoothGateway()
gateway.StartGateway(credentials)