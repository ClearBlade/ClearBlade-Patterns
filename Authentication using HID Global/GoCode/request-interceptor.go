package main

import (
	"fmt"
	"net/http"

	"github.com/clearblade/hid-test/codeservice"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("URL: %#v", r.URL.String())
	fmt.Printf("TagID: %#v", r.URL.Query().Get("tagID"))
	fmt.Printf("Tac: %#v", r.URL.Query().Get("tac"))
	codeservice.InitClearBlade(r.URL.Query().Get("tagID"), r.URL.Query().Get("tac"))
}

func main() {
	http.HandleFunc("/demo", handler)
	http.ListenAndServe(":80", nil)
}
