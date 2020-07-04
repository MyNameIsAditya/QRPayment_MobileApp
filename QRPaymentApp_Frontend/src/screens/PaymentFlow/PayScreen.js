import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
//  global.ammount = '2.00';
function getPayment() {
  // return fetch(`http://10.0.0.226:5000//payMerchant/${global.totalcost}/${global.username}/${global.password}/${global.QRname}`)
  return fetch(
    `http://192.168.1.8:5000/payMerchant/${global.totalcost}/${global.username}/${global.password}/${global.QRname}`
  )
    .then((response) => response.json())
    .then((json) => {
      global.totalcost = '0.00';
      global.QRname = '';
    })
    .catch((error) => {
      console.error(error);
    });
  // alert(global.totalcost);
  // console.log(global.totalcost);
}

const PayScreen = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');
  let payAndNav = () => {
    getPayment();
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>Input Amount</Text>
        </View>
      </View>
      {
        /* <TextInput style={styles.numInput} keyboardType='numeric' maxLength={5} placeholder="$"></TextInput> */
        <TextInput
          // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="$"
          placeholderTextColor='white'
          style={styles.numInput}
          keyboardType='numeric'
          maxLength={5}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          {...(global.totalcost = Number(value).toFixed(2))}
        />
      }
      <View style={styles.payButton}>
        <Button title='Pay' onPress={() => payAndNav()} />
      </View>

      {/* <Button></Button> */}
      {/* <Button title='Menu' onPress={() => navigation.navigate('Menu')} />
      <Button title='Cancel' onPress={() => navigation.goBack()} /> */}
    </SafeAreaView>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: constants.statusBarHeight,
  },
  item: {
    // width: Window_Width,
    height: 65,
    backgroundColor: '#dcdcdc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: '#faaa09',
  },
  header: {
    backgroundColor: '#1a1f71',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    width: 65,
    height: 65,
    borderRadius: 63,
    backgroundColor: '#E6E6FA',
    // borderWidth: 4,
    borderColor: '#E6E6FA',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 22,
    color: '#faaa13',
    fontWeight: '600',
  },
  numInput: {
    backgroundColor: '#172274',
    color: 'white',
    margin: 50,
    padding: 10,
    height: 80,
    //width: undefined,
    alignItems: 'center',
    //alignSelf: 'center',
    fontSize: 50,
    fontWeight: '700',
    borderRadius: 15,
  },
  payButton: {
    backgroundColor: '#FCB70A',
    margin: 20,
    borderRadius: 15,
    padding: 15,
  }
});
