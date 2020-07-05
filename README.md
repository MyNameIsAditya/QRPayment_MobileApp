# Mobile Application for Digital Payments with QR Codes

## Overview
This is a mobile application that allows users to make digital payments by scanning QR codes. It is compatible with both iOS and Android devices since it is made with React-Native. Users each have a unique QR code that can be scanned to make digital payments. Users are also able to view their personal QR code, funds, transaction history, and linked cards. This application must be connected to a digital wallet in order to work; it currently uses card test data. Visa APIs from VDP are used to conduct these digital transactions. The Visa Direct and mVisa APIs are used to transfer funds from the issuer to the acquirer during the payment lifecycle. The Payment Account Validation API is used to verify the sender and recipient accounts. This application allows users to make digital payments in a fun, fast, and easy way! 

## Technologies

### Front-End
1. React-Native
2. Node.js
3. Expo

### Back-End
1. Python
2. Flask
3. PyMongo
4. dnspython
5. Python Cache Tools
4. Postman

### Database
1. MongoDB

### APIs
1. Visa Direct and mVisa
2. Payment Account Validation
3. QR Code Generation

## Example Videos
<!--- Commented Out --->
<!--- 
<table>
  <tr>
    <td>Pay Mercant</td>
    <td>Pay Cardholder</td>
    <td>Pay with Menu</td>
  </tr>
  <tr>
    <td><img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/Merchant.gif" width=250></td>
    <td><img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/P2P.gif" width=250></td>
    <td><img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/Menu.gif" width=250></td>
  </tr>
</table>
--->

| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Pay Mercant &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Pay Cardholder &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Pay with Menu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |
|     :---:      |     :---:      |     :---:      |
| <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/Merchant.gif" width=250> | <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/P2P.gif" width=250> | <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/Menu.gif" width=250> |

## Getting Started - Front-End
Use npm to install all of the required dependencies.
```
npm install
```

Run the front-end locally with Expo.
```
npm start
```

## Getting Started - Back-End
Use pip to install all of the required dependencies.
```
pip install -r requirements.txt
```

Run the python file (api.py) to host locally.
```
python api.py
```

## App Snapshots
<img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7778.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7779.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7780.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7781.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7782.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7783.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7784.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7785.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7786.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7787.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7788.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7789.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7791.PNG" width="190"> <img src="https://github.com/MyNameIsAditya/QRPayment_MobileApp/blob/master/readme_resources/IMG_7793.PNG" width="190"> 
