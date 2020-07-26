package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"
)

// WaitTimesResponse struct used to parse JSON from Queue Insights Service response
type WaitTimesResponse struct {
	ResponseData   ResponseData
	ResponseHeader ResponseHeader
	Status         StatusQIS
}

// ResponseData struct used within WaitTimesResponse to parse JSON from Queue Insights Service response
type ResponseData struct {
	Kind         string
	MerchantList []MerchantListData
}

// MerchantListData struct used within ResponseData to parse JSON from Queue Insights Service response
type MerchantListData struct {
	City                  string
	Country               string
	FeedbackCorrelationID string
	Name                  string
	State                 string
	WaitTime              string
	Zip                   string
}

// ResponseHeader struct used within WaitTimesResponse to parse JSON from Queue Insights Service response
type ResponseHeader struct {
	MessageDateTime    string
	NumRecordsReturned string
	RequestMessageID   string
	ResponseMessageID  string
}

// StatusQIS struct used within WaitTimesResponse to parse JSON from Queue Insights Service response
type StatusQIS struct {
	StatusCode        string
	StatusDescription string
}

func getVisaWaitTimes(client *http.Client) WaitTimesResponse {
	date := time.Now().Format("2006-01-02") + "T" + time.Now().Format("15:04:05") + ".000"

	urlAddress := "https://sandbox.api.visa.com/visaqueueinsights/v1/queueinsights"

	//Prepare Payload
	payload := strings.NewReader("{\"requestHeader\":{\"messageDateTime\":\"" + date + "\",\"requestMessageId\":\"6da60e1b8b024532a2e0eacb1af58581\"},\"requestData\":{\"kind\":\"predict\"}}")

	request, err := http.NewRequest("POST", urlAddress, payload)

	if err != nil {
		log.Fatalln(err)
	}

	//Populate Header
	request.SetBasicAuth(user_id, password)
	request.Header.Set("Accept", "application/json")
	request.Header.Set("Content-Type", "application/json")

	response, err := client.Do(request)

	if err != nil {
		log.Fatalln(err)
	}

	defer response.Body.Close()

	//Decode response JSON into Struct
	var result WaitTimesResponse
	json.NewDecoder(response.Body).Decode(&result)

	fmt.Println(result)

	return result
}
