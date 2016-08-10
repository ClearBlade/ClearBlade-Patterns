import paho.mqtt.client as paho
import RPi.GPIO as GPIO
import json, time, math
import clearblade
from clearblade import auth
from clearblade import Client
from urlparse import urlparse

#Fill init values
systemKey = ______
secretKey = ______
userName = _______
userPW = _______
edgeIP = "http://_______:9000"

auth = auth.Auth()
userClient = Client.UserClient(systemKey, secretKey, userName, userPW, edgeIP)
auth.Authenticate(userClient)
print "Authenticated"

sequence = [
	[1,1,0,0],
	[0,1,1,0],
	[0,0,1,1],
	[1,0,0,1]
]

ccwseq = [
    [1,0,0,1],
    [0,0,1,1],
	[0,1,1,0],
	[1,1,0,0]
]	

time.sleep(1)
GPIO.setmode(GPIO.BOARD)

controlPinArray = [31, 33, 35,37]

for pin in controlPinArray:
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin,0)

# Stepper motor logic
def StepMotor(controlState, angle):
        step = math.ceil(int(angle) * 1.4222222)
        print step
        stepAngle = int(step)
        print "Step Angle "+str(stepAngle)
	if controlState == "CW":
	        for i in range(stepAngle):
        	        for fullStep in range(4):
				for pin in range(4):
					GPIO.output(controlPinArray[pin], sequence[fullStep][pin])
	                        time.sleep(0.0015)
	else:
		 for i in range(stepAngle):
                        for halfStep in range(4):
                                for pin in range(4):
                                        GPIO.output(controlPinArray[pin], ccwseq[halfStep][pin])
                                time.sleep(0.002)



# Define event callbacks
def on_connect(mosq, obj, rc):
	print("rc: " + str(rc))

def on_message(mosq, obj, msg):
	print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
	command = msg.payload
	commandJson = json.loads(command)
	controlState = str(commandJson['controlState'])
	angle = commandJson['state']
	print ("Control State :"+controlState)
	print ("Angle:"+str(angle))
	StepMotor(controlState, angle)
	print "Done"

def on_publish(mosq, obj, mid):
	print("mid: " + str(mid))

def on_subscribe(mosq, obj, mid, granted_qos):
	print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mosq, obj, level, string):
	print(string)

mqttc = paho.Client()
# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

# Connect to clearblade
mqttc.username_pw_set(userClient.UserToken, userClient.systemKey)
msgAddr = urlparse(userClient.platform)
msgAddr = msgAddr.hostname
mqttc.connect(msgAddr,"1883", 30)

# Start subscribe, with QoS level 0
mqttc.subscribe("motor/angle", 0)

# Continue the network loop, exit when an error occurs
rc = 0
while rc == 0:
    rc = mqttc.loop()
