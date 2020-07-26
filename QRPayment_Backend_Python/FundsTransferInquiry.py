import json

import pymongo
import requests

from config import *


def getFundsTransferVisaCardDetails(firstName, lastName):
    client = pymongo.MongoClient(mongo_url)
    db = client.main
    users = db.user

    specificUser = users.find_one({"name": {"first": firstName, "last": lastName}})

    # If user does not exist - send None as response
    if (not specificUser):
        return None

    url = base_url + "paai/fundstransferattinq/v5/cardattributes/fundstransferinquiry"
    headers = {"Accept": "application/json"}
    body = {}
    payload = json.loads('''
    {
        "primaryAccountNumber": "''' + specificUser["accountNumber"] + '''",
        "retrievalReferenceNumber": "330000550000",
        "systemsTraceAuditNumber": "451006"
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
