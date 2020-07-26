import datetime
import json

import requests

from config import *


def getVisaWaitTimes():
    date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S") + ".000"

    url = base_url + "visaqueueinsights/v1/queueinsights"
    headers = {"Accept": "application/json"}
    body = {}
    payload = json.loads('''
    {
        "requestHeader":{
            "messageDateTime":"''' + date + '''",
            "requestMessageId":"6da60e1b8b024532a2e0eacb1af58581"
        },
        "requestData":{
            "kind":"predict"
        }
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
