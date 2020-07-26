package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// User struct used to parse JSON from MongoDB
type User struct {
	Name               Name
	Address            Address
	UserType           string
	Funds              float64
	AccountNumber      string
	Username           string
	Password           string
	QRCode             string
	TransactionHistory []Transaction
}

// Name struct used within User to parse JSON from MongoDB
type Name struct {
	First string
	Last  string
}

// Address struct used within User to parse JSON from MongoDB
type Address struct {
	Country string
	County  string
	State   string
	ZipCode string
}

// Transaction struct used within User to parse JSON from MongoDB
type Transaction struct {
	Name   string
	Amount float64
}

// Merchant struct used to parse JSON from MongoDB
type Merchant struct {
	Name          Name
	Address       Address
	UserType      string
	Funds         float64
	AccountNumber string
	Username      string
	Password      string
	QRCode        string
	MenuItems     []Item
}

// Organization Name struct used within Merchant to parse JSON from MongoDB
type OrgName struct {
	OrganizationName string
}

// Item struct used within Merchant to parse JSON from MongoDB
type Item struct {
	ID      string
	Title   string
	Price   string
	IngList []Ingredient
}

// Ingredient struct used within Merchant to parse JSON from MongoDB
type Ingredient struct {
	ID    string
	Title string
}

// Verify sign in credentials
func verifyCredentials(username string, password string) bool {

	//Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	// Find User Collection in Main Database
	users := client.Database("main").Collection("user")

	var result User
	filter := bson.D{{"Username", username}, {"Password", password}}

	// Find specified element and put it into result
	err = users.FindOne(context.TODO(), filter).Decode(&result)

	// If credentials do not match - return false
	if err != nil {
		//log.Fatal(err)
		return false
	}

	return true
}

// Creates new user account
func createUser(firstName string, lastName string, username string, password string, email string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	//Example of insertOne without using Struct
	/*
		insertResult, err := users.InsertOne(context.TODO(), bson.D{
			{Key: "name", Value: bson.D{{Key: "first", Value: firstName}, {Key: "last", Value: lastName}}},
			{Key: "address", Value: bson.D{{Key: "country", Value: ""}, {Key: "county", Value: ""}, {Key: "state", Value: ""}, {Key: "zipCode", Value: ""}}},
			{Key: "userType", Value: "Cardholder"},
			{Key: "funds", Value: 0},
			{Key: "accountNumber", Value: ""},
			{Key: "Username", Value: username},
			{Key: "Password", Value: password},
			{Key: "QRCode", Value: ""},
			{Key: "transactionHistory", Value: []Transaction{}},
		})
	*/

	users := client.Database("main").Collection("user")

	newUser := User{Name{firstName, lastName}, Address{"", "", "", ""}, "Cardholder", 0, "", username, password, "", []Transaction{}}

	//Insert new element with Struct
	insertResult, err := users.InsertOne(context.TODO(), newUser)

	// If user account is not created
	if (err != nil) || (insertResult == nil) {
		//log.Fatal(err)
		return false
	}

	return true
}

// Get user funds
func getUserFunds(username string, password string) string {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	users := client.Database("main").Collection("user")

	var result User
	filter := bson.D{{"Username", username}, {"Password", password}}

	err = users.FindOne(context.TODO(), filter).Decode(&result)

	// If user does not exist
	if err != nil {
		//log.Fatal(err)
		return ""
	}

	return fmt.Sprintf("%f", result.Funds)
}

// Get transaction history
func getUserTransactionHistory(username string, password string) []Transaction {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	users := client.Database("main").Collection("user")

	var result User
	filter := bson.D{{"Username", username}, {"Password", password}}

	err = users.FindOne(context.TODO(), filter).Decode(&result)

	// If user does not exist
	if err != nil {
		//log.Fatal(err)
		return nil
	}

	return result.TransactionHistory
}

// Get menu items
func getMenuItems(merchant string) []Item {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	merchants := client.Database("main").Collection("merchant")

	var result Merchant
	filter := bson.D{{Key: "name", Value: bson.D{{Key: "organizationName", Value: merchant}}}}

	err = merchants.FindOne(context.TODO(), filter).Decode(&result)

	// If user does not exist
	if err != nil {
		//log.Fatal(err)
		return nil
	}

	return result.MenuItems
}

// Get user type (cardholder or merchant)
func getUserType(name string) string {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}

	users := client.Database("main").Collection("user")
	merchants := client.Database("main").Collection("merchant")

	var resultUser User
	filterUser := bson.D{{"Username", name}}
	var resultMerchant Merchant
	filterMerchant := bson.D{{Key: "name", Value: bson.D{{Key: "organizationName", Value: name}}}}

	errUser := users.FindOne(context.TODO(), filterUser).Decode(&resultUser)
	errMerchant := merchants.FindOne(context.TODO(), filterMerchant).Decode(&resultMerchant)

	var typeUser string

	if errUser != nil {
		//If neither exist
		if errMerchant != nil {
			typeUser = ""
		} else {
			//If merchant exists
			typeUser = "Merchant"
		}
	} else {
		//If cardholder exists
		typeUser = "Cardholder"
	}

	return typeUser

}
