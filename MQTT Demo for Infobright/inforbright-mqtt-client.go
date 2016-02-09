package main

import (
	"encoding/json"
	"fmt"
	"os"

	owm "github.com/briandowns/openweathermap"
	gosdk "github.com/clearblade/Go-SDK"
	mqtt "github.com/clearblade/mqtt_parsing"
)

type ClearBladeInfo struct {
	UserClient      *gosdk.UserClient
	ReceivedMessage <-chan *mqtt.Publish
}

const (
	SYSTEM_KEY    = "your_system_key"
	SYSTEM_SECRET = "your_system_secret"
	USERNAME      = "your_username"
	PASSWORD      = "your_password"
	COLLECTION_ID = "your_collectionID"
)

func checkError(e error) {

	if e != nil {
		panic(e)
	}
}

func (demo ClearBladeInfo) lastWillPacket() gosdk.LastWillPacket {

	msg := "Ungraceful disconnect"

	lastWill := gosdk.LastWillPacket{

		"disconnect",
		msg,
		gosdk.QOS_AtMostOnce,
		false,
	}

	return lastWill
}

func (demo ClearBladeInfo) publishMessage() {

	weather, err := owm.NewCurrent("F", "en")

	if err != nil {

		os.Exit(1)
	}

	weather.CurrentByName("Austin, TX")

	bytes, err1 := json.Marshal(weather)
	checkError(err1)

	topic := "Austin Weather"

	fmt.Printf("Publish: %s, Msg: %s\n", topic, weather)

	err = demo.UserClient.Publish(topic, bytes, gosdk.QOS_AtMostOnce)
	checkError(err)

	demo.ReceivedMessage, err = demo.UserClient.Subscribe("test", gosdk.QOS_AtMostOnce)
	//fmt.Println(demo.ReceivedMessage)
	checkError(err)
}

func (demo *ClearBladeInfo) connectToMQTT() bool {

	initErr := demo.UserClient.InitializeMQTT("infobright-test-1", "", 30)

	if initErr != nil {

		fmt.Printf("Error initializing MQTT: %v\n", initErr)
		return false
	}

	fmt.Println("Initialized MQTT")

	lastWill := demo.lastWillPacket()
	connErr := demo.UserClient.ConnectMQTT(nil, &lastWill)

	if connErr != nil {

		fmt.Printf("Error connecting to MQTT service: %v\n", connErr)
		return false
	}

	fmt.Println("Connected to MQTT Service")

	return true
}

func (demo *ClearBladeInfo) authenticateUser() {

	demo.UserClient = gosdk.NewUserClient(SYSTEM_KEY, SYSTEM_SECRET, USERNAME, PASSWORD)

	gosdk.CB_ADDR = "platform_address"
	gosdk.CB_MSG_ADDR = "messaging_address"

	authErr := demo.UserClient.Authenticate()

	checkError(authErr)
	if authErr != nil {
		fmt.Printf("Error Authenticating: %v\n", authErr)
	}

	if !demo.connectToMQTT() {
		os.Exit(1)
	}

	demo.publishMessage()
}

func main() {

	demo := ClearBladeInfo{}

	demo.authenticateUser()
}
