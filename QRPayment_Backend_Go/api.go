package main

import (
	"crypto/tls"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	client *http.Client
)

// Creates HTTPS client through TLS
func createClient() (*http.Client, error) {
	// Load client certification
	cert, err := tls.LoadX509KeyPair(certificate, privateKey)

	if err != nil {
		log.Printf("Could not load key pair: %v \n", err)
		return nil, err
	}

	// Set up HTTPS client
	tlsConfig := &tls.Config{
		Certificates: []tls.Certificate{cert},
	}
	tlsConfig.BuildNameToCertificate()
	transport := &http.Transport{TLSClientConfig: tlsConfig}

	client := &http.Client{Transport: transport}

	return client, nil
}

// Checks if account is valid before login
func getVerifyCredentials(c *gin.Context) {
	username := c.Param("username")
	password := c.Param("password")

	if verifyCredentials(username, password) {
		c.JSON(200, gin.H{
			"Status": true,
		})
	} else {
		c.JSON(200, gin.H{
			"Status": false,
		})
	}
}

// Creates a new user account
func createAccount(c *gin.Context) {
	firstName := c.Param("firstName")
	lastName := c.Param("lastName")
	username := c.Param("username")
	password := c.Param("password")
	email := c.Param("email")

	if createUser(firstName, lastName, username, password, email) {
		c.JSON(201, gin.H{
			"Message": "Successful. Able to create new user account.",
			"Status":  true,
		})
	} else {
		c.JSON(404, gin.H{
			"Message": "Unsuccessful. Unable to create new user account.",
			"Status":  false,
		})
	}
}

// Get funds
func getFunds(c *gin.Context) {
	username := c.Param("username")
	password := c.Param("password")

	data := getUserFunds(username, password)

	if data == "" {
		c.JSON(404, gin.H{
			"Funds": "Error",
		})
	} else {
		c.JSON(200, gin.H{
			"Funds": data,
		})
	}
}

// Get transaction history
func getTransactionHistory(c *gin.Context) {
	username := c.Param("username")
	password := c.Param("password")

	data := getUserTransactionHistory(username, password)

	if data == nil {
		c.JSON(404, gin.H{
			"Transactions": "Error",
		})
	} else {
		c.JSON(200, gin.H{
			"Transactions": data,
		})
	}
}

// Get menu items
func getItems(c *gin.Context) {
	merchant := c.Param("merchant")

	data := getMenuItems(merchant)

	if data == nil {
		c.JSON(404, gin.H{
			"Items": "Error",
		})
	} else {
		c.JSON(200, gin.H{
			"Items": data,
		})
	}
}

// Get user type
func getType(c *gin.Context) {
	name := c.Param("name")

	data := getUserType(name)

	if data == "" {
		c.JSON(404, gin.H{
			"Type": "Error",
		})
	} else {
		c.JSON(200, gin.H{
			"Type": data,
		})
	}
}

// Find merchants and their wait times
func getWaitTimes(c *gin.Context) {
	data := getVisaWaitTimes(client)

	c.JSON(200, gin.H{
		"Queue Insight Service Response": data,
	})
}

// Find general card details for a cardholder
func getGeneralCardDetails(c *gin.Context) {
	firstName := c.Param("firstName")
	lastName := c.Param("lastName")
	data := getGeneralVisaCardDetails(client, firstName, lastName)

	if data == nil {
		c.JSON(404, gin.H{
			"Error": "No such object exists in the database",
		})
	} else {
		c.JSON(200, gin.H{
			"General Attributes Inquiry Response": *data,
		})
	}
}

// Find card details pertaining to funds transfers (must provide Account Number, reference number, system trace audit number)
func getFundsTransferCardDetails(c *gin.Context) {
	firstName := c.Param("firstName")
	lastName := c.Param("lastName")
	data := getFundsTransferVisaCardDetails(client, firstName, lastName)

	if data == nil {
		c.JSON(404, gin.H{
			"Error": "No such object exists in the database",
		})
	} else {
		c.JSON(200, gin.H{
			"Funds Transfer Inquiry Response": *data,
		})
	}
}

// Find out if a card is valid before payments/transactions
func getCardValidation(c *gin.Context) {
	firstName := c.Param("firstName")
	lastName := c.Param("lastName")
	data := getVisaCardValidation(client, firstName, lastName)

	if data == nil {
		c.JSON(404, gin.H{
			"Error": "No such object exists in the database",
		})
	} else {
		c.JSON(200, gin.H{
			"Card Validation": *data,
		})
	}
}

// Pay Merchant
func payMerchant(c *gin.Context) {
	amount := c.Param("amount")
	username := c.Param("username")
	password := c.Param("password")
	merchant := c.Param("merchant")

	data, responseVisaDirect := getPayMerchant(client, amount, username, password, merchant)

	if data == "NO USER" {
		c.JSON(404, gin.H{
			"Error": "No such user exists in the database",
		})
	} else if data == "NO MERCHANT" {
		c.JSON(404, gin.H{
			"Error": "No such merchant exists in the database",
		})
	} else if data == "INSUFFICIENT FUNDS" {
		c.JSON(404, gin.H{
			"Error": "Insufficient funds in user's account",
		})
	} else {
		c.JSON(200, gin.H{
			"Visa Direct Status":   "Successful Payment",
			"Visa Direct Response": responseVisaDirect,
		})
	}
}

// Pay cardholder
func payCardholder(c *gin.Context) {
	amount := c.Param("amount")
	username := c.Param("username")
	password := c.Param("password")
	recipient := c.Param("recipient")

	data, responseVisaDirect := getPayCardholder(client, amount, username, password, recipient)

	if data == "NO USER" {
		c.JSON(404, gin.H{
			"Error": "No such user exists in the database",
		})
	} else if data == "NO RECIPIENT" {
		c.JSON(404, gin.H{
			"Error": "No such recipient exists in the database",
		})
	} else if data == "INSUFFICIENT FUNDS" {
		c.JSON(404, gin.H{
			"Error": "Insufficient funds in user's account",
		})
	} else {
		c.JSON(200, gin.H{
			"Visa Direct Status":   "Successful Payment",
			"Visa Direct Response": responseVisaDirect,
		})
	}
}

func main() {

	// Create HTTPS client for accesing Visa APIs
	c, err := createClient()
	client = c
	if err != nil {
		log.Fatalf("%v", err)
	}

	// Create personal endpoints in aggregate API with Gin
	router := gin.Default()

	router.GET("/newUserAccount/:firstName/:lastName/:username/:password/:email", createAccount)
	router.GET("/verifyCredentials/:username/:password", getVerifyCredentials)
	router.GET("/funds/:username/:password", getFunds)
	router.GET("/transactionHistory/:username/:password", getTransactionHistory)
	router.GET("/menuItems/:merchant", getItems)
	router.GET("/type/:name", getType)
	router.GET("/merchantWaitTimes", getWaitTimes)
	router.GET("/generalCardDetails/:firstName/:lastName", getGeneralCardDetails)
	router.GET("/fundsTransferCardDetails/:firstName/:lastName", getFundsTransferCardDetails)
	router.GET("/cardValidation/:firstName/:lastName", getCardValidation)
	router.GET("/payMerchant/:amount/:username/:password/:merchant", payMerchant)
	router.GET("/payCardholder/:amount/:username/:password/:recipient", payCardholder)

	router.Run()
}
