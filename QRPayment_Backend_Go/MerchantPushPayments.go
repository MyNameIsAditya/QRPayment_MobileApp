package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// VisaDirectResponse struct used to parse JSON from Visa Direct response
type VisaDirectResponse struct {
	TransactionIdentifier     int
	ActionCode                string
	ApprovalCode              string
	ResponseCode              string
	TransmissionDateTime      string
	RetrievalReferenceNumber  string
	SettlementFlags           SettlementFlags
	PurchaseIdentifier        PurchaseIdentifier
	MerchantCategoryCode      int
	CardAcceptor              CardAcceptor
	MerchantVerificationValue string
}

// SettlementFlags struct used within VisaDirectResponse to parse JSON from from Visa Direct response
type SettlementFlags struct {
	SettlementResponsibilityFlag string
	GivPreviouslyUpdatedFlag     string
	GivUpdatedFlag               string
	SettlementServiceFlag        string
}

// PurchaseIdentifier struct used within VisaDirectResponse to parse JSON from from Visa Direct response
type PurchaseIdentifier struct {
	Type            string
	ReferenceNumber string
}

// CardAcceptor struct used within VisaDirectResponse to parse JSON from from Visa Direct response
type CardAcceptor struct {
	Name       string
	TerminalID string
	IDCode     string
	Address    CardAcceptorAddress
}

// CardAcceptorAddress struct used within CardAcceptor to parse JSON from from Visa Direct response
type CardAcceptorAddress struct {
	City    string
	Country string
}

func getPayMerchant(client *http.Client, amount string, username string, password string, merchant string) (string, *VisaDirectResponse) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientMongo, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	users := clientMongo.Database("main").Collection("user")
	merchants := clientMongo.Database("main").Collection("merchant")

	var resultUser User
	filterUser := bson.D{{"Username", username}, {"Password", password}}
	var resultMerchant Merchant
	filterMerchant := bson.D{{Key: "name", Value: bson.D{{Key: "organizationName", Value: merchant}}}}

	errUser := users.FindOne(context.TODO(), filterUser).Decode(&resultUser)
	errMerchant := merchants.FindOne(context.TODO(), filterMerchant).Decode(&resultMerchant)

	//If user does not exist - send string response
	if errUser != nil {
		return "NO USER", nil
	}

	//If merchant does not exist - send string response
	if errMerchant != nil {
		return "NO MERCHANT", nil
	}

	//Convert amount to float
	numAmount, err := strconv.ParseFloat(amount, 64)

	//Handle Insufficient Funds
	if numAmount > resultUser.Funds {
		return "INSUFFICIENT FUNDS", nil
	}

	newUserAmount := resultUser.Funds - numAmount
	newMerchantAmount := resultMerchant.Funds + numAmount

	// Update Accounts to Reflect Change in Funds
	updateUser := bson.D{
		{"$set", bson.D{
			{"funds", newUserAmount},
		}},
	}
	updateMerchant := bson.D{
		{"$set", bson.D{
			{"funds", newMerchantAmount},
		}},
	}
	updateResultUser, err := users.UpdateOne(context.TODO(), filterUser, updateUser)
	if err != nil {
		fmt.Println(updateResultUser)
		log.Fatal(err)
	}
	updateResultMerchant, err := merchants.UpdateOne(context.TODO(), filterMerchant, updateMerchant)
	if err != nil {
		fmt.Println(updateResultMerchant)
		log.Fatal(err)
	}

	//Update Transaction History
	updateHistory := bson.M{"$push": bson.M{"transactionHistory": bson.M{"name": merchant, "amount": numAmount}}}

	updateResultUserHistory, err := users.UpdateOne(context.TODO(), filterUser, updateHistory)
	if err != nil {
		fmt.Println(updateResultUserHistory)
		log.Fatal(err)
	}

	date := time.Now().Format("2006-01-02") + "T" + time.Now().Format("15:04:05") + ".000"

	urlAddress := "https://sandbox.api.visa.com/visadirect/mvisa/v1/merchantpushpayments"

	//Prepare Payload
	payload := strings.NewReader("{\"acquirerCountryCode\":\"356\",\"acquiringBin\":\"408972\",\"amount\":\"" + amount + "\",\"businessApplicationId\":\"MP\",\"cardAcceptor\":{\"address\":{\"city\":\"KOLKATA\",\"country\":\"IN\"},\"idCode\":\"CA-IDCode-77765\",\"name\":\"Visa Inc. USA-Foster City\"},\"localTransactionDateTime\":\"" + date + "\",\"purchaseIdentifier\":{\"type\":\"0\",\"referenceNumber\":\"REF_123456789123456789123\"},\"recipientPrimaryAccountNumber\":\"" + resultMerchant.AccountNumber + "\",\"retrievalReferenceNumber\":\"412770451035\",\"secondaryId\":\"123TEST\",\"senderAccountNumber\":\"" + resultUser.AccountNumber + "\",\"senderName\":\"" + resultUser.Name.First + " " + resultUser.Name.Last + "\",\"senderReference\":\"\",\"systemsTraceAuditNumber\":\"451035\",\"transactionCurrencyCode\":\"356\",\"merchantCategoryCode\":\"5812\",\"settlementServiceIndicator\":\"9\"}")

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
	var resultResponse VisaDirectResponse
	json.NewDecoder(response.Body).Decode(&resultResponse)

	return "", &resultResponse
}

func getPayCardholder(client *http.Client, amount string, username string, password string, recipient string) (string, *VisaDirectResponse) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientMongo, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	users := clientMongo.Database("main").Collection("user")

	var resultUser User
	filterUser := bson.D{{"Username", username}, {"Password", password}}
	var resultRecipient User
	filterRecipient := bson.D{{"Username", recipient}}

	errUser := users.FindOne(context.TODO(), filterUser).Decode(&resultUser)
	errRecipient := users.FindOne(context.TODO(), filterRecipient).Decode(&resultRecipient)

	//If user does not exist - send string response
	if errUser != nil {
		return "NO USER", nil
	}

	//If recipient cardholder does not exist - send string response
	if errRecipient != nil {
		return "NO RECIPIENT", nil
	}

	//Convert amount to float
	numAmount, err := strconv.ParseFloat(amount, 64)

	//Handle Insufficient Funds
	if numAmount > resultUser.Funds {
		return "INSUFFICIENT FUNDS", nil
	}

	newUserAmount := resultUser.Funds - numAmount
	newRecipientAmount := resultRecipient.Funds + numAmount

	// Update Accounts to Reflect Change in Funds
	updateUser := bson.D{
		{"$set", bson.D{
			{"funds", newUserAmount},
		}},
	}
	updateRecipient := bson.D{
		{"$set", bson.D{
			{"funds", newRecipientAmount},
		}},
	}
	updateResultUser, err := users.UpdateOne(context.TODO(), filterUser, updateUser)
	if err != nil {
		fmt.Println(updateResultUser)
		log.Fatal(err)
	}
	updateResultRecipient, err := users.UpdateOne(context.TODO(), filterRecipient, updateRecipient)
	if err != nil {
		fmt.Println(updateResultRecipient)
		log.Fatal(err)
	}

	//Update Transaction History
	updateHistory := bson.M{"$push": bson.M{"transactionHistory": bson.M{"name": recipient, "amount": numAmount}}}

	updateResultUserHistory, err := users.UpdateOne(context.TODO(), filterUser, updateHistory)
	if err != nil {
		fmt.Println(updateResultUserHistory)
		log.Fatal(err)
	}

	date := time.Now().Format("2006-01-02") + "T" + time.Now().Format("15:04:05") + ".000"

	urlAddress := "https://sandbox.api.visa.com/visadirect/mvisa/v1/merchantpushpayments"

	//Prepare Payload
	payload := strings.NewReader("{\"acquirerCountryCode\":\"356\",\"acquiringBin\":\"408972\",\"amount\":\"" + amount + "\",\"businessApplicationId\":\"MP\",\"cardAcceptor\":{\"address\":{\"city\":\"KOLKATA\",\"country\":\"IN\"},\"idCode\":\"CA-IDCode-77765\",\"name\":\"Visa Inc. USA-Foster City\"},\"localTransactionDateTime\":\"" + date + "\",\"purchaseIdentifier\":{\"type\":\"0\",\"referenceNumber\":\"REF_123456789123456789123\"},\"recipientPrimaryAccountNumber\":\"" + resultRecipient.AccountNumber + "\",\"retrievalReferenceNumber\":\"412770451035\",\"secondaryId\":\"123TEST\",\"senderAccountNumber\":\"" + resultUser.AccountNumber + "\",\"senderName\":\"" + resultUser.Name.First + " " + resultUser.Name.Last + "\",\"senderReference\":\"\",\"systemsTraceAuditNumber\":\"451035\",\"transactionCurrencyCode\":\"356\",\"merchantCategoryCode\":\"5812\",\"settlementServiceIndicator\":\"9\"}")

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
	var resultResponse VisaDirectResponse
	json.NewDecoder(response.Body).Decode(&resultResponse)

	return "", &resultResponse
}
