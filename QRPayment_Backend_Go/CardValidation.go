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

// CardValidationResponse struct used to parse JSON from Card Validation response
type CardValidationResponse struct {
	TransactionIdentifier      int
	ActionCode                 string
	ResponseCode               string
	AddressVerificationResults string
	Cvv2ResultCode             string
}

func getVisaCardValidation(client *http.Client, firstName string, lastName string) *CardValidationResponse {
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

	urlAddress := "https://sandbox.api.visa.com/pav/v1/cardvalidation"

	//Prepare Payload
	payload := strings.NewReader("{\"addressVerificationResults\":{\"postalCode\":\"T4B 3G5\",\"street\":\"2881 Main Street Sw\"},\"cardAcceptor\":{\"address\":{\"city\":\"Foster City\",\"country\":\"United States\",\"county\":\"CA\",\"state\":\"CA\",\"zipCode\":\"94404\"},\"idCode\":\"111111\",\"name\":\"" + result.Name.First + " " + result.Name.Last + "\",\"terminalId\":\"123\"},\"cardCvv2Value\":\"022\",\"cardExpiryDate\":\"2020-10\",\"primaryAccountNumber\":\"" + result.AccountNumber + "\",\"retrievalReferenceNumber\":\"015221743720\",\"systemsTraceAuditNumber\":\"743720\"}")

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
	var resultResponse CardValidationResponse
	json.NewDecoder(response.Body).Decode(&resultResponse)

	return &resultResponse
}
