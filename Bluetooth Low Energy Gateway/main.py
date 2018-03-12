from BluetoothGateway import BluetoothGateway
import sys, getopt, argparse

credentials = {}

def _parseArgs(argv):
    #TODO - Add a flag to specify mac address filters
    parser = argparse.ArgumentParser(description='Start BLE Adapter')
    parser.add_argument('--systemKey', required=True, help='The System Key of the ClearBlade platform the BLE adapter will connect to.')
    parser.add_argument('--systemSecret', required=True, help='The System Secret of the ClearBlade platform the BLE adapter will connect to.')
    parser.add_argument('--deviceName', required=True, \
                        help='The name of the device, defined within the devices table of the ClearBlade platform, representing the BLE Adapter.')
    parser.add_argument('--activeKey', required=True, \
                        help='The Active Key, defined within the devices table of the ClearBlade platform, corresponding to the BLE Adapter.')
    parser.add_argument('--scanInterval', dest="scanInterval", default=120, type=int, \
                        help='The amount of time to wait between each successive scan for BLE devices. The default is 120 (2 minutes)')
    parser.add_argument('--platformUrl', dest="platformURL", default="https://localhost:9000", \
                        help='The url of the ClearBlade platform the BLE adapter will connect to. The default is https://localhost:9000')

    return vars(parser.parse_args(args=argv[1:]))

credentials = _parseArgs(sys.argv)
gateway = BluetoothGateway(credentials)
