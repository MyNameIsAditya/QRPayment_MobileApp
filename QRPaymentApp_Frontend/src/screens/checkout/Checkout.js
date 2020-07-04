import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import ScreenContainer from '../../components/ScreenContainer';
import { Window_Width, Window_Height } from '../../utils/constants';

function doPayment() {
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
}

const Checkout = ({ route, navigation }) => {
  var { Cart } = route.params;
  function CartElement({ title, price, ing }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Text style={styles.Body}>{title}</Text>
        <Text style={styles.Body}>${Number(price).toFixed(2)}</Text>
      </View>
    );
  }

  var sum = Cart.reduce(function (prev, cur) {
    return Number(prev) + Number(cur.price);
  }, 0);

  // var tax = sum * .0625;
  // var total= tax+sum ;
  var tax = Number(sum) * 0.0825;
  var total = tax + Number(sum);
  global.totalcost = total.toFixed(2);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.logo}
            source={{
              uri:
                'http://logok.org/wp-content/uploads/2014/03/Visa-2014-logo-blue-880x660.png',
            }}
          />
          <Text style={styles.name}>Checkout</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
          borderBottomColor: 'black',
          borderBottomWidth: 3,
        }}
      >
        <Text style={styles.BoldBody}>Items</Text>
        <Text style={styles.BoldBody}>Price</Text>
      </View>
      <FlatList
        data={Cart}
        renderItem={({ item }) => (
          <CartElement title={item.title} price={item.price} ing={item.ing} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderTopColor: 'black',
          borderTopWidth: 3,
        }}
      >
        {/* Took tofixout */}
        <Text style={styles.BoldBody}>Sub-Total: ${Number(sum).toFixed(2)}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={styles.BoldBody}>Tax: ${tax.toFixed(2)}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={styles.BoldBody}>Total: ${global.totalcost}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.GreyButton}>
          <Button
            color='#fff'
            fontWeight='700'
            title='Cancel'
            onPress={() => {
              navigation.navigate('Menu', { Cart: [] });
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.GreenButton}>
          <Button
            color='#fff'
            fontWeight='700'
            title='Confirm'
            onPress={() => {
              doPayment();
              navigation.navigate('Home');
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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
  Body: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 20,
  },
  BoldBody: {
    color: '#000000',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 30,
  },
  checkoutText: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 20,
  },
  GreyButton: {
    backgroundColor: '#999999',
    color: '#ffffff',
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
    fontWeight: '700',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  GreenButton: {
    backgroundColor: '#00e853',
    color: '#ffffff',
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 20,
    fontWeight: '700',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default Checkout;
