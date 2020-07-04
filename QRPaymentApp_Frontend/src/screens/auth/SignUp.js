import React from 'react';
import { View, TextInput, StyleSheet, Button, Image, Text, TouchableOpacity } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import AuthContext from '../../constants/AuthContext';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { signUp } = React.useContext(AuthContext);
  return (
    <ScreenContainer style = {styles.container}>
      <View style = {styles.signInView}>
        <View style = {styles.logoView}>
          <Image style = {styles.visaWordLogo} source = {require("../../image_resources/VisaWordLogo.png")} />
          <Text style = {styles.visaTouchlessText}>Touchless</Text>
        </View>
        <TextInput style = {styles.textInput}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
         <TextInput style = {styles.textInput}
          placeholder='First Name'
          value={firstName}
          onChangeText={setFirstName}
        />
         <TextInput style = {styles.textInput}
          placeholder='Last Name'
          value={lastName}
          onChangeText={setLastName}
        />
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
        <TextInput style = {styles.textInput}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style = {styles.signUpButton} onPress={() => signUp({ username, password, confirmPassword, firstName, lastName, email })}>
          <Text style = {styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>

        <View style = {styles.extraOptionsView}>
          <Button title = "Log In" onPress={() => navigation.navigate('SignIn')}></Button>
        </View>

        <View style = {styles.userView}>
        </View>

      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create(
  {
    container: 
    {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    signInView:
    {
      marginTop: 80,
    },
    logoView:
    {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 75,
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
      justifyContent: "center",
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
      color: "#1a1F71"
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
  
export default SignUp;
