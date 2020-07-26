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

// FundsTransferDetails struct used to parse JSON from Funds Transfer Inquiry response
type FundsTransferDetails struct {
	VisaNetworkInfo []VisaNetworkInfoItem
}

// VisaNetworkInfoItem struct used within FundsTransferDetails to parse JSON from Funds Transfer Inquiry response
type VisaNetworkInfoItem struct {
	BillingCurrency                      int
	BillingCurrencyCodeMinorDigits       string
	CardPlatformCode                     string
	CardProductType                      string
	CardSubTypeCode                      string
	ComboCardRange                       string
	IssuerCountryCode                    int
	IssuerName                           string
	MoneyTransferFastFundsCrossBorder    string
	MoneyTransferFastFundsDomestic       string
	MoneyTransferPushFundsCrossBorder    string
	MoneyTransferPushFundsDomestic       string
	NonMoneyTransferFastFundsCrossBorder string
	NonMoneyTransferFastFundsDomestic    string
	NonMoneyTransferPushFundsCrossBorder string
	NonMoneyTransferPushFundsDomestic    string
	OnlineGamblingFastFundsCrossBorder   string
	OnlineGamblingFastFundsDomestic      string
	OnlineGamblingPushFundsCrossBorder   string
	OnlineGamblingPushFundsDomestic      string
}

func getFundsTransferVisaCardDetails(client *http.Client, firstName string, lastName string) *FundsTransferDetails {
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

	urlAddress := "https://sandbox.api.visa.com/paai/fundstransferattinq/v5/cardattributes/fundstransferinquiry"

	//Prepare Payload
	payload := strings.NewReader("{\"primaryAccountNumber\":\"" + result.AccountNumber + "\",\"retrievalReferenceNumber\":\"330000550000\",\"systemsTraceAuditNumber\":\"451006\"}")

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
	var resultResponse FundsTransferDetails
	json.NewDecoder(response.Body).Decode(&resultResponse)

	return &resultResponse
}
