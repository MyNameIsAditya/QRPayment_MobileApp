import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CameraQR({ navigation }) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [userType, setUserType] = useState("");
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`This QR code belongs to ${data} payment services!`);
    //console.log(data);
    // var data1= data;
    //this.setState({data:data});
    //let dataa = this.props.data;
  //  Linking.openURL({data})
    setData(data)
    global.QRname = data;
    console.log(global.QRname);


    //GET request
    fetch(`http://192.168.1.8:5000/type/${global.QRname}`, {
      // fetch(`http://192.168.1.8:5000/menuItems/McDonald's`, {
      method: 'GET',
      //Request Type
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Get funds
        //this.setState(state => ({Items: responseJson.Items}));
        setUserType(responseJson.Type);
      })
      //If response is not in json then in error
      .catch((error) => {
        console.error(error);
    });
  };
 
  //var { data } = this.state
  //console.log(data);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
    

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
         
      />
      <Button title={'Go Back'} onPress={() => navigation.goBack()}/>

      {/* Need if statement - cardholder or merchant */}
      {renderIf(userType == "Merchant", 
          <Button title={`Tap to Follow Scanned Link to Merchant`}onPress={() => navigation.navigate('Payment')}/> 
      )}
      {renderIf(userType == "Cardholder",
          <Button title={`Tap to Follow Scanned Link to Cardholder`}onPress={() => navigation.navigate('PaymentTwo')}/> 
          // MAKE ALTERNATE PAY SCREEN FOR CARDHOLDERS - WITHOUT MENU OPTION - FETCH IS ALSO DIFFERENT
      )}
       {/* <Button title={`Tap to Follow Scanned Link to Menu`}onPress={() => navigation.navigate('Payment')}/>  */}
      
      {scanned && (
       
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}

    </View>

  );
}
