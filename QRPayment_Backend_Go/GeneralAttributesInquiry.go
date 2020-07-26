package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GeneralCardDetails struct used to parse JSON from General Attributes Inquiry response
type GeneralCardDetails struct {
	Status StatusGA
}

// StatusGA struct used within GeneralCardDetails to parse JSON from General Attributes Inquiry response
type StatusGA struct {
	StatusCode        string
	StatusDescription string
}

func getGeneralVisaCardDetails(client *http.Client, firstName string, lastName string) *GeneralCardDetails {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientMongo, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	users := clientMongo.Database("main").Collection("user")

	var result User
	filter := bson.D{{Key: "name", Value: bson.D{{Key: "first", Value: firstName}, {Key: "last", Value: lastName}}}}

	err = users.FindOne(context.TODO(), filter).Decode(&result)

	// If user does not exist
	if err != nil {
		return nil
	}

	urlAddress := "https://sandbox.api.visa.com/paai/generalattinq/v1/cardattributes/generalinquiry"

	//Prepare Payload
	payload := strings.NewReader("{\"primaryAccountNumber\":\"" + result.AccountNumber + "\"}")

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
	var resultResponse GeneralCardDetails
	json.NewDecoder(response.Body).Decode(&resultResponse)

	return &resultResponse
}
