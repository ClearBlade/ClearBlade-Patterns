package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"

	gosdk "github.com/clearblade/Go-SDK"
	mqtt "github.com/clearblade/mqtt_parsing"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/cloud"
	"google.golang.org/cloud/pubsub"
)

type ClearBladeInfo struct {
	UserClient      *gosdk.UserClient
	ReceivedMessage <-chan *mqtt.Publish
}

const (
	USERNAME       = "YOUR_USERNAME"
	SYSTEM_KEY     = "YOUR_SYSTEM_KEY"
	SYSTEM_SECRET  = "YOUR_SYSTEM_SECRET"
	PASSWORD       = "YOUR_PASSWORD"
	TOPIC          = "YOUR_TOPIC"
	PLATFORM_URL   = "PLATFORM_URL"
	MESSAGING_URL  = "MESSAGING_URL"
	PROJECT_ID     = "YOUR_PROJECT_ID"
	JSON_FILE_PATH = "YOUR_FILE_PATH"
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

func (demo ClearBladeInfo) publishMessage(message string) {

	if err != nil {

		os.Exit(1)
	}

	bytes := []byte(message)

	topic := TOPIC

	fmt.Printf("Publish: %s, Msg: %s\n", topic, bytes)

	err = demo.UserClient.Publish(topic, bytes, gosdk.QOS_AtMostOnce)
	checkError(err)

	time.Sleep(2 * time.Second)

	demo.ReceivedMessage, err = demo.UserClient.Subscribe("hi", gosdk.QOS_AtMostOnce)
	checkError(err)
}

func (demo *ClearBladeInfo) connectToMQTT() bool {

	initErr := demo.UserClient.InitializeMQTT("gcloud-pubsub-test", "", 30)

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

func (demo *ClearBladeInfo) authenticateUser(msg string) {

	demo.UserClient = gosdk.NewUserClient(SYSTEM_KEY, SYSTEM_SECRET, USERNAME, PASSWORD)

	gosdk.CB_ADDR = PLATFORM_URL
	gosdk.CB_MSG_ADDR = MESSAGING_URL

	authErr := demo.UserClient.Authenticate()

	checkError(authErr)
	if authErr != nil {
		fmt.Printf("Error Authenticating: %v\n", authErr)
	}

	if !demo.connectToMQTT() {
		os.Exit(1)
	}

	demo.publishMessage(msg)
}

func Example_auth() context.Context {
	// Initialize an authorized context with Google Developers Console
	// JSON key. Read the google package examples to learn more about
	// different authorization flows you can use.
	// http://godoc.org/golang.org/x/oauth2/google
	jsonKey, err := ioutil.ReadFile("JSON_FILE_LOCATION")
	if err != nil {
		log.Fatal(err)
	}

	conf, err := google.JWTConfigFromJSON(
		jsonKey,
		pubsub.ScopeCloudPlatform,
		pubsub.ScopePubSub,
	)
	if err != nil {
		log.Fatal(err)
	}

	ctx := cloud.NewContext("api-project-320446546234", conf.Client(oauth2.NoContext))
	return ctx
}

func ExamplePublish() {
	ctx := Example_auth()

	msgIDs, err := pubsub.Publish(ctx, "topic1", &pubsub.Message{
		Data: []byte("hello world"),
	})
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Published a message with a message id: %s\n", msgIDs[0])
}

func ExamplePull() {
	ctx := Example_auth()

	msgs, err := pubsub.Pull(ctx, "sub1", 1)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("New message arrived: %v\n", msgs[0])

	if err := pubsub.Ack(ctx, "sub1", msgs[0].AckID); err != nil {
		log.Fatal(err)
	}
	log.Println("Acknowledged message")

	demo := ClearBladeInfo{}

	demo.authenticateUser()
}

func main() {

	ExamplePublish()
	ExamplePull()
}
