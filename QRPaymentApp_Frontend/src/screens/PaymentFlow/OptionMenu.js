import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const Payment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>Options for {global.QRname}</Text>
        </View>
      </View>
      <View style={styles.buttonOptions}>
        <Button
          style={styles.buttonOptions}
          title='Pay'
          onPress={() => navigation.navigate('PayScreen')}
        />
      </View>
      <View style={styles.buttonOptions}>
        <Button title='Menu' onPress={() => navigation.navigate('Menu')} />
      </View>
      <View style={styles.cancelOption}>
        <Button title='Cancel' onPress={() => navigation.goBack()} />
      </View>
    </View>
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
  buttonOptions: {
    padding: 20,
    backgroundColor: '#faaa13',
    justifyContent: 'space-between',
    borderRadius: 15,
    margin: 20,
    color: 'black',
    fontWeight: '700',
  },
  cancelOption: {
    backgroundColor: 'red',
    margin: 30,
  },
});