import json

import pymongo
import requests

from config import *


def getVisaCardValidation(firstName, lastName):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    specificUser = users.find_one({"name": {"first": firstName, "last": lastName}})

    # If user does not exist - send None as response
    if not specificUser:
        return None

    url = base_url + "pav/v1/cardvalidation"
    headers = {"Accept": "application/json"}
    body = {}
    payload = json.loads('''
    {
        "addressVerificationResults": {
        "postalCode": "T4B 3G5",
        "street": "2881 Main Street Sw"
        },
        "cardAcceptor": {
            "address": {
                "city": "Foster City",
                "country": "United States",
                "county": "CA",
                "state": "CA",
                "zipCode": "94404"
            },
        "idCode": "111111",
        "name": "''' + specificUser["name"]["first"] + specificUser["name"]["last"] + '''",
        "terminalId": "123"
        },
        "cardCvv2Value": "022",
        "cardExpiryDate": "2020-10",
        "primaryAccountNumber": "''' + specificUser["accountNumber"] + '''",
        "retrievalReferenceNumber": "015221743720",
        "systemsTraceAuditNumber": "743720"
    }
    ''')
    timeout = 10

    response = requests.post(url,
                             cert=(certificate, privateKey),
                             headers=headers,
                             auth=(user_id, password),
                             # data = body,
                             json=payload,
                             timeout=timeout)

    data = response.json()
    return data
