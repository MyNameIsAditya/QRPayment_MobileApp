import * as React from 'react';

import {
  AsyncStorage,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from './src/constants/AuthContext';
import SignIn from './src/screens/auth/SignIn';
import SignUp from './src/screens/auth/SignUp';
import QRScannerScreen from './src/screens/QRscanner/QRScannerScreen';
import CameraQR from './src/components/QrScannerCamera/CameraQR';
import MerchQRGen from './src/components/QRMerchantManualGen/MerchQRGen';
import Checkout from './src/screens/checkout/Checkout';
import PayScreen from './src/screens/PaymentFlow/PayScreen';
// import ApplePayAPI from './src/components/TestingDB/TestingDB';
import Payment from './src/screens/PaymentFlow/Payment';
import OptionStackScreen from './src/screens/PaymentFlow/OptionStackScreen';
import BottomTabNav from './src/screens/navigation/BottomTabNav';
import Menu from './src/screens/menu/Menu';
import PaymentTwo from './src/screens/PaymentFlow/PaymentTwo';
import PayScreenTwo from './src/screens/PaymentFlow/PayScreenTwo';
// import TestingDB from './src/components/TestingDB/TestingDB';
// import Axios from 'axios';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
global.username = '';
global.password = '';
global.QRname = '';
global.totalcost = '0.00';
global.ammount = '';
const Stack = createStackNavigator();

export default function App({ navigation }) {
  // const [data, setData] = useState(" ");
  // const [userList] = React.useState([]);
  // [username,setUsername] = React.useState('');
  //var [password,setPassword] = React.useState('');

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        //ERROR HANDLING - If no username or password entered - prompt user to enter those fields
        if (!data.username || !data.password) {
          alert('Please enter your username and password');
        } else {
          //GET request
          // fetch("http://10.0.0.226:5000/verifyCredentials/" + data.username + "/" + data.password, {
          fetch("http://192.168.1.8:5000/verifyCredentials/" + data.username + "/" + data.password, {
              method: 'GET' 
              //Request Type 
          })
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
              //Success 
              // setUsername(data.username)
              //   setPassword(data.password)
              // return username, password ;
              if (responseJson.Status) {
                //Go to next screen
                //alert("Successful");
                global.username = data.username;
                global.password = data.password;
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                //console.log(global.username)
                //console.log(global.password)
              } else {
                //Do not login and print message "Incorrect Username or Password"
                alert('Incorrect Username or Password');
              }
            })
            //If response is not in json then in error
            .catch((error) => {
              //Error
              console.error(error);
            });
        }

        //dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
        global.username = null;
        global.password = null;
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        //ERROR HANDLING - If there is an unfilled text input - prompt user to enter those fields
        if (!data.username || !data.password || !data.confirmPassword || !data.firstName || !data.lastName || !data.email) {
          alert('Please enter all of the required information');
        }
        //ERROR HANDLING - If password and confirmPassword do not match
        else if (data.password != data.confirmPassword) {
          alert('The password fields do not match');
        } else {
          //GET request  fetch("http://10.0.0.226:5000/verifyCredentials/" + data.username + "/" + data.password, {
          fetch("http://192.168.1.8:5000/newUserAccount/" + data.firstName + "/" + data.lastName + "/" + data.username + "/" + data.password + "/" + data.email, {
              method: 'GET' 
              //Request Type 
          })
          .then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
              //Success 
              // setUsername(data.username)
              //   setPassword(data.password)
              // return username, password ;
              if (responseJson.Status) {
                //Go to next screen
                //alert("Successful");
                global.username = data.username;
                global.password = data.password;
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
              } else {
                //Do not login and print message "Incorrect Username or Password"
                alert('Incorrect Information - Please Try Again');
              }
            })
            //If response is not in json then in error
            .catch((error) => {
              //Error
              console.error(error);
            });
        }
      },
    }),
    []
  );

  return (
    <View style={styles.container}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name='Splash' component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <>
                <Stack.Screen
                  name='SignIn'
                  component={SignIn}
                  options={{
                    title: 'Sign In',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen name='SignUp' component={SignUp} />
              </>
            ) : (
              // User is signed in
              <Stack.Screen name='Home' component={BottomTabNav} />
            )}
            <Stack.Screen name='CameraQR' component={CameraQR} />
            <Stack.Screen name='QRScannerScreen' component={QRScannerScreen} />
            <Stack.Screen name='MerchQRGen' component={MerchQRGen} />
            <Stack.Screen name='Checkout' component={Checkout} />
            <Stack.Screen name='PayScreen' component={PayScreen} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='Menu' component={Menu} />
            <Stack.Screen name='PaymentTwo' component={PaymentTwo} />
            <Stack.Screen name='PayScreenTwo' component={PayScreenTwo} />
            <Stack.Screen
              name=' OptionStackScreen'
              component={OptionStackScreen}
            />

            {/* <Stack.Screen name='TestingDB' component={TestingDB} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
