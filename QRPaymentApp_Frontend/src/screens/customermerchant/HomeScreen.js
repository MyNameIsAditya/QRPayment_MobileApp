import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AuthContext from '../../constants/AuthContext';
import ScreenContainer from '../../components/ScreenContainer';
import CustomerQRGenorator from '../../components/CustomerQR/CustomerQRGenorator';
import Constants from 'expo-constants';
import { ListItem } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  const [funds, setFunds] = React.useState('');
  var intervalID;

  React.useEffect(() => {
    //GET request
    // fetch(
    //   `http://192.168.1.8:5000/funds/${global.username}/${global.password}`,
    //   {
    //     method: 'GET',
    //     //Request Type
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Get funds
    //     setFunds(responseJson.Funds);
    //   })
    //   //If response is not in json then in error
    //   .catch((error) => {
    //     console.error(error);
    //   });
    getFunds();
  }, []);

  function getFunds() {
    // return fetch(`http://10.0.0.226:5000//payMerchant/${global.totalcost}/${global.username}/${global.password}/${global.QRname}`)
    //GET request
      fetch(
        `http://192.168.1.8:5000/funds/${global.username}/${global.password}`,
        {
          method: 'GET',
          //Request Type
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          //Get funds
          setFunds(responseJson.Funds);
          intervalID = setTimeout(getFunds.bind(this), 5000);
        })
        //If response is not in json then in error
        .catch((error) => {
          console.error(error);
        });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{global.username} Home Page</Text>
        </View>
      </View>
        <CustomerQRGenorator />
        {/* <Text style={styles.body}>{global.username}'s Wallet</Text> */}
        {/* Funds */}
        <Text style={styles.body}>In Use: Prepaid Visa Card</Text>
        <Text style={styles.body}>Funds: ${Number(funds).toFixed(2)}</Text>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => signOut()}
          >
            <Text style={styles.signOutText}>SIGN OUT</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#faaa09',
  },
  header: {
    backgroundColor: '#1A1F71',
  },
  middler: {
    backgroundColor: '#FFFFFF',
  },
  footer: {
    backgroundColor: '#1A1F71',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  middlerContent: {
    padding: 30,
    alignItems: 'center',
    height: 500,
  },
  footerContent: {
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    // width: 150,
    // height: 150,
    //borderRadius: 63,
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
    fontSize: 35,
    color: '#faaa13',
    fontWeight: 'bold',
  },
  background_size: {
    marginTop: 100,
    width: 200,
    height: 200,
    alignItems: 'center',
  },
  body: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#1A1F71',
    justifyContent: 'center',
    textAlign: 'center'
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#000042',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#E6E6FA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
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
  signOutButton: {
    backgroundColor: '#1A1F71',
    margin: 20,
    marginTop: 25,
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: 'rgba(0,0,0, .5)', // iPhone
    shadowOffset: { height: 2, width: 2 }, // iPhone
    shadowOpacity: 1, // iPhone
    shadowRadius: 2, // iPhone
    elevation: 2, //Android
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  signOutText: {
    color: '#FFFFFF',
    padding: 13,
    fontSize: 25,
  },
  transactionList: {
    color: 'black',
    fontSize: 20,
    margin: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderWidth: 3,
    borderColor: '#F7B600',
    borderRadius: 15,
  },
  listItemView: {
    //backgroundColor: "#FFFFFF",
    margin: 3,
    padding: 10,
    borderRadius: 15,
    borderColor: '#1A1F71',
    borderWidth: 2,
  },
  transactionNameText: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 20,
  },
  transactionAmountText: {
    textAlign: 'right',
    color: '#000000',
    fontSize: 20,
  },
  qrView:
  {
    borderWidth: 3,
    borderColor: "#F7B600",
    padding: 50,
    borderRadius: 20,
    margin: 20,
    //marginTop: 70,
  },
  QRtext:
  {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#1A1F71',
    justifyContent: 'center',
    textAlign: 'center',
    //marginTop: 50,
    //marginBottom: 0,
  },
});

export default HomeScreen;
