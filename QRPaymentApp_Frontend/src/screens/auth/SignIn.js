import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

import AuthContext from '../../constants/AuthContext';
import ScreenContainer from '../../components/ScreenContainer';
import { Assets } from '@react-navigation/stack';
import { block } from 'react-native-reanimated';

const SignIn = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  //Fade Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const lineAnimation = useRef(new Animated.Value(0)).current;
  React.useEffect(() => 
  {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();

    Animated.timing(
      slideAnimation,
      {
        toValue: 1,
        duration: 2100,
      }
    ).start();

    // Animated.timing(
    //   lineAnimation,
    //   {
    //     toValue: 1,
    //     duration: 750,
    //   }
    // ).start();
  }, [])

  return (
    <ScreenContainer style = {styles.container}>

      <KeyboardAvoidingView behavior = "position">

        {/* Animated Logo */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: [-350, 0] })}], }}>
          <Image style = {styles.visaTouchlessLogo} source = {require("../../image_resources/VisaTouchlessLogo_Combined.png")}/>
        </Animated.View>

        {/* Text Logo */}
        <View style = {styles.logoView}>
          <Image style = {styles.visaWordLogo} source = {require("../../image_resources/VisaWordLogo.png")} />
          <Text style = {styles.visaTouchlessText}>Touchless</Text>
        </View>

        {/* Sign In */}
        <View style = {styles.signInView}>
          <TextInput style = {styles.textInput}
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
          />
          <TextInput style = {styles.textInput}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style = {styles.signUpButton} onPress={() => signIn({ username, password })}>
            <Text style = {styles.signUpText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {/* Sign In - Extra Options */}
      <View style = {styles.extraOptionsView}>
        <Button title = "Create Account" onPress={() => navigation.navigate('SignUp')}></Button>
        <Button title = "Forgot Password?" ></Button>
      </View>

      {/* User Selection - Cardholder/Merchant */}
      {/* <View style = {styles.userView}>
        <TouchableOpacity style = {styles.userButton} >
          <Text style = {styles.userSelectionText}>Cardholder</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.userButton}>
          <Text style = {styles.userSelectionText}>Merchant</Text>
        </TouchableOpacity>
      </View> */}

      {/* Design Lines */} 
      <Animated.View style = {{ borderBottomColor: "#1A1F71", borderBottomWidth: 10, marginTop: 80, marginBottom: 5, opacity: fadeAnim, }}/>
      <Animated.View style = {{ borderBottomColor: "#F7B600", borderBottomWidth: 10, marginTop: 5, marginBottom: 10, opacity: fadeAnim, }}/>

    </ScreenContainer>
  );
};

const styles = StyleSheet.create(
{
  container: 
  {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoView:
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 100,
  },
  signInView:
  {
  },
  extraOptionsView:
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userView:
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    //justifyContent: "flex-end",
    backgroundColor: "#1A1F71",
    marginTop: 80,
    paddingTop: 20,
    paddingBottom: 90,
  },
  textInput: 
  {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    margin: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: "#F7B600",
    borderRadius: 10,
  },
  signUpButton:
  {
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
  userButton:
  {
    //flexDirection: "column",
    //justifyContent: "flex-end",
    //alignSelf: "flex-end",
    backgroundColor: "#2A2F91",
    //margin: 20,
    //marginTop: 80,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .5)',           // iPhone
    shadowOffset: { height: 2, width: 2 },    // iPhone
    shadowOpacity: 1,                         // iPhone
    shadowRadius: 2,                          // iPhone
    elevation: 2,                             //Android
    width: 150,
  },
  userSelectionText:
  {
    color: "#FFFFFF",
    padding: 10,
    fontSize: 20,
  }, 
  signUpText:
  {
    color: "#FFFFFF",
    padding: 13,
    fontSize: 25,
  }, 
  visaTouchlessText:
  {
    paddingLeft: 5,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1A1F71"
  },
  visaWordLogo:
  {
      width: 114,
      height: 38,
      alignSelf: "center",
  },
  visaTouchlessLogo:
  {
      width: 348,
      height: 204,
      alignSelf: "center",
      marginTop: 50,
      marginBottom: 30,
  },
  QRLogo:
  {
      width: 88,
      height: 68,
      alignSelf: "center",
  },
});

export default SignIn;
