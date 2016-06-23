import socket
import thread
import time
from clearblade import auth
from clearblade import Client
from clearblade import Code

def authWithClearBlade():
	authCB = auth.Auth()
	userClient = Client.UserClient("c8bdc0f60ad0ddd88c8da2e7b6e701", "C8BDC0F60AE6A4EF9EA2CF8F8816", "test@clearblade.com", "PASSWORD", "PLATFORM_URL") 
	authCB.Authenticate(userClient)

	return userClient

def parsePacket(rawPacket):
	cbClient = authWithClearBlade();
	codeService = Code.CodeService(cbClient)
	codeService.CB_ADDR = "PLATFORM_URL"
	params = {"packet": str(rawPacket) }
	codeService.CallService("ParsePacket", params, "false")

def receiveData(socket):
	while True:
		data = socket.recv(128)
		print "Received data: " + data

		parsePacket(data);

def main():
	sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	try:
		sock.bind(("10.10.10.1", 17754))
	except:
		print "Failed to bind to socket"

	receiveData(sock);

	return 0


if __name__ == "__main__":main()