import pymongo

from cachetools import cached, LRUCache
from config import *


# Create new user account
def create_user(firstName, lastName, username, password, email):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    x = users.insert_one({"name": {"first": firstName, "last": lastName},
                          "address": {"country": "", "county": "", "state": "", "zipCode": ""},
                          "userType": "Cardholder", "funds": 0, "accountNumber": "", "Username": username,
                          "Password": password, "QRCode": "", "transactionHistory": []})

    # If user account is not created
    if not x:
        return False

    return True


# Verify sign in credentials
def verify_credentials(username, password):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    specificUser = users.find_one({"Username": username, "Password": password})

    # If credentials do not match - return false
    if not specificUser:
        return False

    return True


# Get user funds
# @cached(cache=LRUCache(maxsize=1024))
def get_user_funds(username, password):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    specificUser = users.find_one({"Username": username, "Password": password})

    # If user does not exist - return None
    if not specificUser:
        return None

    return str(specificUser["funds"])


# Get transaction history
# @cached(cache=LRUCache(maxsize=1024))
def get_user_transaction_history(username, password):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    specificUser = users.find_one({"Username": username, "Password": password})

    # If user does not exist - return None
    if not specificUser:
        return None

    return specificUser["transactionHistory"]


# Get menu items
@cached(cache=LRUCache(maxsize=1024))
def get_menu_items(merchant):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    merchants = db.merchant

    specificMerchant = merchants.find_one({"name": {"organizationName": merchant}})

    # If merchant does not exist - return None
    if not specificMerchant:
        return None

    return specificMerchant["menuItems"]


# Get user type (cardholder or merchant)
@cached(cache=LRUCache(maxsize=1024))
def get_user_type(name):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user
    merchants = db.merchant

    specificUser = users.find_one({"Username": name})
    specificMerchant = merchants.find_one({"name": {"organizationName": name}})

    # If cardholder exists
    if specificUser:
        return "Cardholder"
    # If merchant exists
    elif specificMerchant:
        return "Merchant"
    # If neither exist
    else:
        return None
