package codeservice

import (
	"fmt"

	clearblade "github.com/clearblade/Go-SDK"
)

type ClearBlade struct {
	UserClient *clearblade.UserClient
}

const (
	SYSTEM_KEY    = "your system key"
	SYSTEM_SECRET = "your system secret"
	USERNAME      = "your username"
	PASSWORD      = "your password"
	PLATFORM_URL  = "clearblade url"
)

func checkError(e error) {
	if e != nil {
		panic(e)
	}
}

func (info *ClearBlade) executeCodeService(tagID, tac string) {
	var params map[string]interface{}
	params = make(map[string]interface{})
	params["tagID"] = tagID
	params["tac"] = tac
	var response map[string]interface{}
	response, codeErr := info.UserClient.CallService(SYSTEM_KEY, "your service name", params)
	fmt.Printf("Response: %#v", response)
	checkError(codeErr)
}

func (info *ClearBlade) initialize() {
	info.UserClient = clearblade.NewUserClient(SYSTEM_KEY, SYSTEM_SECRET, USERNAME, PASSWORD)
	clearblade.CB_ADDR = PLATFORM_URL

	initErr := info.UserClient.Authenticate()

	checkError(initErr)
	if initErr != nil {
		fmt.Println("Error initializing ClearBlade: %v\n", initErr)
	}
}

func InitClearBlade(tagID, tac string) {
	info := ClearBlade{}
	info.initialize()
	info.executeCodeService(tagID, tac)
}
