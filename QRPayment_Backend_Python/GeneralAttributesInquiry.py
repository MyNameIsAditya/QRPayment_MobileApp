import json

import pymongo
import requests

from config import *


def getGeneralVisaCardDetails(firstName, lastName):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    specificUser = users.find_one({"name": {"first": firstName, "last": lastName}})

    # If user does not exist - send None as response
    if (not specificUser):
        return None

    url = base_url + "paai/generalattinq/v1/cardattributes/generalinquiry"
    headers = {"Accept": "application/json"}
    body = {}
    payload = json.loads('''
    {
        "primaryAccountNumber": "''' + specificUser["accountNumber"] + '''"
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
