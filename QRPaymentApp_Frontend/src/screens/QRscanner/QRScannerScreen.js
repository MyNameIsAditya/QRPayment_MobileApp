import {
  SafeAreaView,
  Linking,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
//import { Window_Width, Window_Height} from '../../utils/constants';
//import Router from '../navigation/Router';
// import BottomTabNav from '../navigation/BottomTabNav';

import { TouchableOpacity } from 'react-native-gesture-handler';
// import ApiCallerQR from './Assets/PostApiCall';
//import axios from "axios"

export default function QRScannerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>QR Scanner</Text>
          </View>
        </View>
        <View>
          <View style={styles.middlerContent}>
            <TouchableOpacity onPress={() => navigation.navigate('CameraQR')}>
              <Image style = {styles.imageStyle} source = {require("../../image_resources/QRLogo.png")}/>
            </TouchableOpacity>
            <Text style={styles.pressToStart}>
              &#9757;Press to Start Scanning &#9757;
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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
  middlerContent: {
    padding: 30,
    alignItems: 'center',
    height: undefined,
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
    padding: 30,
    backgroundColor: '#E6E6FA',
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
  pressToStart: {
    marginTop: 50,
    fontWeight: '700',
    color: '#1a1f71',
    fontSize: 25,
  },
  imageStyle: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 100,
    marginBottom: 30,
  },
});
