import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { TextInput } from 'react-native-gesture-handler';

function getgetPayment() {
  //return fetch(`http://10.0.0.226:5000//payMerchant/${global.totalcost}/${global.username}/${global.password}/${global.QRname}`)
  return fetch(
    `http://192.168.1.8:5000//payMerchant/${global.totalcost}/${global.username}/${global.password}/${global.QRname}`
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

const Payment = ({ navigation }) => {
  let payAndNav = () => {
    getgetPayment();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>Options</Text>
        </View>
      </View>

      {/* <View style={styles.buttons}>
        <Button
          title='Pay: Input Amount'
          onPress={() => navigation.navigate('PayScreen')}
        />
      </View> */}

      <View style = {styles.buttonView}>
        {/* Input Amount */}
        <TouchableOpacity style = {styles.payButtons} onPress={() => navigation.navigate('PayScreen')}>
          <Text style = {styles.buttonText}>Pay: Input Amount</Text>
        </TouchableOpacity>

        {/* Menu */}
        <TouchableOpacity style = {styles.payButtons} onPress={() => navigation.navigate('Menu')}>
          <Text style = {styles.buttonText}>Menu</Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.cancelView}>
        {/* Cancel */}
        <TouchableOpacity style = {styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style = {styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      



      {/* <View style={styles.buttons}>
        <Button title='Pay: Menu' onPress={() => navigation.navigate('Menu')} />
      </View>
      <View style={(styles.buttons, styles.cancelButton)}>
        <Button title='Cancel' onPress={() => navigation.goBack()} />
      </View> */}
    </SafeAreaView>
  );
};

export default Payment;

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
    backgroundColor: '#faaa09',
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
  buttons: {
    backgroundColor: '#faaa13',
    padding: 20,
    margin: 10,
  },
  payButtons:
  {
    padding: 20,
    backgroundColor: "#1A1F71",
    margin: 20,
    marginTop: 25,
    alignItems: "center",
    borderRadius: 50,
    shadowColor: 'rgba(0,0,0, .5)',           // iPhone
    shadowOffset: { height: 2, width: 2 },    // iPhone
    shadowOpacity: 1,                         // iPhone
    shadowRadius: 2,                          // iPhone
    elevation: 2,                             //Android
  },
  cancelButton:
  {
    backgroundColor: "#F7B600",
    margin: 20,
    marginTop: 25,
    alignItems: "center",
    borderRadius: 50,
    shadowColor: 'rgba(0,0,0, .5)',           // iPhone
    shadowOffset: { height: 2, width: 2 },    // iPhone
    shadowOpacity: 1,                         // iPhone
    shadowRadius: 2,                          // iPhone
    elevation: 2,                             //Android
  },
  buttonText:
  {
    color: "#FFFFFF",
    padding: 13,
    fontSize: 25,
  }, 
  buttonView:
  {
    marginTop: 90,
  }, 
  cancelView:
  {
    marginTop: 250,
  }, 
});
