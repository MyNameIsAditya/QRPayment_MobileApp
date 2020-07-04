import { SafeAreaView,Linking, View, FlatList, StyleSheet, Text, Image,  ImageBackground, ActivityIndicator, Button, TextInput  } from 'react-native';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
//import { Window_Width, Window_Height} from '../../utils/constants';
//import Router from '../navigation/Router';
// import BottomTabNav from '../navigation/BottomTabNav';

//import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from "axios"


export default function MerchQRGen({ navigation }) {
  const [data, setData] = useState("https://youtu.be/QbphE5p3kx8");
  //const [TextInput, setText] = useState([]);
  const [value, onChangeText] = React.useState('');
  const [valueArray, onChangeArray] = React.useState(['']);
    
  const generateQR =() => {
    axios.get( `http://api.qrserver.com/v1/create-qr-code/?data= ${data} &size=100x100` )
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    setData(data);
  }
  // addTextInput = (key) => {
  //   // let TextInput = TextInput;
  //   TextInput.push(<TextInput key={key} />);
  //   setText(TextInput);
  //   console.log(TextInput);
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.name}>Genorate a Merchant QR</Text>
             </View>
          
          </View>
          <View>
           <View style={styles.middlerContent}>
            
            {/* <Button title={'testQR'} style = {styles.background_size} onPress={() => generateQR()}/> */}
 
            <Image style = {styles.background_size} 
            source={{uri: `https://api.qrserver.com/v1/create-qr-code/?data= ${value}size=100x100`}}
            
            />
            <Button title={'Go to Georated QR'} onPress={() => Linking.openURL(value)}/>
            <Button title={'Go Back'} onPress={() => navigation.goBack()}/>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => onChangeText(text)}
              value={value}
              
              
      />
     
           
            {/* <Button title='+' onPress={() => addTextInput(TextInput.length)} /> */}
            
        {/* {TextInput.map((value, index) => {
          return value */}
        {/* })} */}
            </View> 
            {console.log(value)}

            

            </View>
            <View  style={styles.footer}>
            <View style={styles.footerContent}>
                <Text style={styles.name}>Scan For Payment</Text>
                
            </View>
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
        backgroundColor: "#FFFFFF",
      
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
        marginTop: 100,
        width: 200,
        height: 200,
        alignItems: 'center'
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
        marginBottom:10,
      },
  
});