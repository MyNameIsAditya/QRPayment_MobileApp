import { SafeAreaView,Linking, View, FlatList, StyleSheet, Text, Image,  ImageBackground, ActivityIndicator, Button, TextInput  } from 'react-native';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { Window_Width, Window_Height} from '../../utils/constants';
//import Router from '../navigation/Router';
// import BottomTabNav from '../navigation/BottomTabNav';

//import { TouchableOpacity } from 'react-native-gesture-handler';
// import axios from "axios"


export default function CustomerQRGenorator() {
  // const [value, onChangeText] = React.useState('');
  // const [valueArray, onChangeArray] = React.useState(['']);
  
    
  // const generateQR =() => {
  //   axios.get( 'http://127.0.0.1:5000/' ) 
  //   .then(function (response) {
  //     // handle success
  //     console.log(response);
  //   })
  //   .catch(function (error) { 
  //     // handle error
  //     console.log(error);
  //   })
  //   .then(function () { 
  //     // always executed
  //   });
  //   //console.log(response);
  //   // setData(data);
  // }
  // // addTextInput = (key) => {
  // //   // let TextInput = TextInput;
  // //   TextInput.push(<TextInput key={key} />);
  // //   setText(TextInput);
  // //   console.log(TextInput);
  // // }
  // const [UserId, setId] = React.useState('');
   
    const getDataUsingGet =()=> {
    //GET request 
    // fetch("http://10.0.0.226:5000/verifyCredentials/" + username + "/" + password, {
    //     method: 'GET' 
    //     //Request Type 
    // })
    // .then((response) => response.json())
    // //If response is in json then in success
    // .then((responseJson) => {
    //     //Success 
    //     console.log(username);
    //     alert(JSON.stringify(responseJson.Username));
    //     setId(responseJson.Username)
    // })
    // //If response is not in json then in error
    // .catch((error) => {
    //     //Error 
    //     alert(JSON.stringify(error));
    //     console.error(error);
    // });
     alert(global.username)
    // alert(global.password)
       
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View>
        
          <View>
           <View style={styles.middlerContent}>
            
            <View style={styles.qrView}>
              <Image style = {styles.background_size}   
              source={{uri: `https://api.qrserver.com/v1/create-qr-code/?data=${global.username}`}}
              />
            </View>

            {/* <Button title={'testQR'} style = {styles.background_size} onPress={() => getDataUsingGet()}/> */}
 
            {/* <Image style = {styles.background_size} 
            source={{uri: `https://api.qrserver.com/v1/create-qr-code/?data= ${value}size=100x100`}}
            
            /> */}
            {/* <Button title={'Go to Georated QR'} onPress={() => Linking.openURL(value)}/> */}
            {/* <Button title={'Go Back'} onPress={() => navigation.goBack()}/> */}
            {/* <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => onChangeText(text)}
              value={value}
              
              
      /> */}
     
           
            {/* <Button title='+' onPress={() => addTextInput(TextInput.length)} /> */}
            
        {/* {TextInput.map((value, index) => {
          return value */}
        {/* })} */}
            </View> 
            {/* {console.log(value)} */}

            

            </View>
        </View>


      {/* <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}
    </SafeAreaView>
  );
  
}
// container: {
//     width: Window_Width,
//     height: Window_Height,
//     alignItems: 'center',
//     backgroundColor: '#DCDCDC',
//     //backgroundColor: '#d1d1d1',
// },
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 32,
    color:"#faaa09",

  },
    header:{
        backgroundColor: "#1a1f71",
      
      },
      middler:{
        backgroundColor: "#1a1f71",
      },
      footer:{
        backgroundColor: "#1a1f71",
      
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      middlerContent:{
        padding:30,
        alignItems: 'center',
        height: 500, 
      },
      footerContent:{
        padding:30,
        alignItems: 'center',
      },
      logo: {
        // width: 150,
        // height: 150,
        //borderRadius: 63,
        backgroundColor:"#E6E6FA",
       // borderWidth: 4,
        borderColor: "#E6E6FA",
        marginBottom:10,
      },
      image:{
        width: 60,
        height: 60,
      },
      name:{
        fontSize:35,
        color:"#faaa13",
        fontWeight: 'bold',
      },
      background_size: {
        ///marginTop: 60,
        width: 225,
        height: 225,
        alignItems: 'center',
        // borderWidth: 3,
        // borderColor: "#F7B600",
        // padding: 50,
    },
      body: {
        padding:30,
        backgroundColor :"#E6E6FA",
      },
      box: {
        padding:5,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#000042',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
          height:1,
          width:-2
        },
        elevation:2
      },
      username:{
        color: "#E6E6FA",
        fontSize:22,
        alignSelf:'center',
        marginLeft:10
      },
      logo: {
        width: 65,
        height: 65,
        borderRadius: 63,
        backgroundColor:"#E6E6FA",
       // borderWidth: 4,
        borderColor: "#E6E6FA",
        marginBottom: 10,
      },
      qrView:
      {
        marginTop: 25,
        borderWidth: 3,
        borderColor: "#F7B600",
        padding: 30,
        borderRadius: 20,
      },
});