from flask import Flask, jsonify, request

from CardValidation import getVisaCardValidation
from FundsTransferInquiry import getFundsTransferVisaCardDetails
from GeneralAttributesInquiry import getGeneralVisaCardDetails
from MerchantPushPayments import getPayCardholder
from MerchantPushPayments import getPayMerchant
from QueueInsightsService import getVisaWaitTimes
from databaseFunctions import create_user
from databaseFunctions import get_menu_items
from databaseFunctions import get_user_funds
from databaseFunctions import get_user_transaction_history
from databaseFunctions import get_user_type
from databaseFunctions import verify_credentials

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return jsonify({"default message": "Hello World!"})
    elif request.method == "POST":
        json_received = request.get_json()
        return jsonify({"your message": json_received}), 201


@app.route("/multiply/<int:num1>/<int:num2>", methods=["GET"])
def multiply(num1, num2):
    return jsonify({"Product": num1 * num2})


# Creates a new user account
@app.route("/newUserAccount/<string:firstName>/<string:lastName>/<string:username>/<string:password>/<string:email>",
           methods=["GET", "POST"])
def post_new_user_account(firstName, lastName, username, password, email):
    if create_user(firstName, lastName, username, password, email):
        return jsonify({"Message": "Successful. Able to create new user account.", "Status": True}), 201
    else:
        return jsonify({"Message": "Unsuccessful. unable to create new user account.", "Status": False}), 404


# Checks if account is valid before login
@app.route("/verifyCredentials/<string:username>/<string:password>", methods=["GET"])
def get_verify_credentials(username, password):
    if verify_credentials(username, password):
        return jsonify({"Status": True}), 200
    else:
        return jsonify({"Status": False}), 200


# Get funds
@app.route("/funds/<string:username>/<string:password>", methods=["GET"])
def get_funds(username, password):
    data = get_user_funds(username, password)
    if data is None:
        return jsonify({"Funds": "Error"}), 404
    else:
        return jsonify({"Funds": data}), 200


# Get transaction history
@app.route("/transactionHistory/<string:username>/<string:password>", methods=["GET"])
def get_transaction_history(username, password):
    data = get_user_transaction_history(username, password)
    if data is None:
        return jsonify({"Transactions": "Error"}), 404
    else:
        return jsonify({"Transactions": data}), 200


# Get menu items
@app.route("/menuItems/<string:merchant>", methods=["GET"])
def get_items(merchant):
    data = get_menu_items(merchant)
    if data is None:
        return jsonify({"Items": "Error"}), 404
    else:
        return jsonify({"Items": data}), 200


# Get user type
@app.route("/type/<string:name>", methods=["GET"])
def get_type(name):
    data = get_user_type(name)
    if data:
        return jsonify({"Type": data}), 200
    else:
        return jsonify({"Type": "Error"}), 404


# Find merchants and their wait times
@app.route("/merchantWaitTimes", methods=["GET"])
def get_wait_times():
    data = getVisaWaitTimes()
    return data


# Find general card details (must provide Account Number)
# ToDo: Send specific card numbers for each person
@app.route("/generalCardDetails/<string:firstName>/<string:lastName>", methods=["GET"])
def get_general_card_details(firstName, lastName):
    data = getGeneralVisaCardDetails(firstName, lastName)
    if data is None:
        return jsonify({"Error": "No such object exists in the database"}), 404
    else:
        return data


# Find card details pertaining to funds transfers (must provide Account Number, reference number, system trace audit
# number)
@app.route("/fundsTransferCardDetails/<string:firstName>/<string:lastName>", methods=["GET"])
def get_funds_transfer_card_details(firstName, lastName):
    data = getFundsTransferVisaCardDetails(firstName, lastName)
    if data is None:
        return jsonify({"Error": "No such object exists in the database"}), 404
    else:
        return data


# Find out if a card is valid before payments/transactions
@app.route("/cardValidation/<string:firstName>/<string:lastName>", methods=["GET"])
def get_card_validation(firstName, lastName):
    data = getVisaCardValidation(firstName, lastName)
    if data is None:
        return jsonify({"Error": "No such object exists in the database"}), 404
    else:
        return data


# Pay merchant
@app.route("/payMerchant/<string:amount>/<string:username>/<string:password>/<string:merchant>",
           methods=["GET", "POST"])
def pay_merchant(amount, username, password, merchant):
    data = getPayMerchant(amount, username, password, merchant)
    if data == "NO USER":
        return jsonify({"Error": "No such user exists in the database"}), 404
    elif data == "NO MERCHANT":
        return jsonify({"Error": "No such merchant exists in the database"}), 404
    elif data == "INSUFFICIENT FUNDS":
        return jsonify({"Error": "Insufficient funds in user's account"}), 404
    else:
        return data


# Pay cardholder
@app.route("/payCardholder/<string:amount>/<string:username>/<string:password>/<string:recipient>",
           methods=["GET", "POST"])
def pay_card_holder(amount, username, password, recipient):
    data = getPayCardholder(amount, username, password, recipient)
    if data == "NO USER":
        return jsonify({"Error": "No such user exists in the database"}), 404
    elif data == "NO RECIPIENT":
        return jsonify({"Error": "No such recipient exists in the database"}), 404
    elif data == "INSUFFICIENT FUNDS":
        return jsonify({"Error": "Insufficient funds in user's account"}), 404
    else:
        return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
