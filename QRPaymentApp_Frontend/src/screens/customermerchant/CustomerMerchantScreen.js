import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import { Window_Width, Window_Height} from '../../utils/constants';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Transaction       $2000',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Transaction       $23',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Transaction       $3000',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Transaction       $2000',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Transaction       $23',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Transaction       $3000',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Transaction       $2000',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Transaction       $23',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Transaction       $3000',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Transaction       $2000',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Transaction       $23',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Transaction       $3000',
      }
      
      
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function CustomerMerchantScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.logo} source={{uri: 'http://logok.org/wp-content/uploads/2014/03/Visa-2014-logo-blue-880x660.png'}}/>
                <Text style={styles.name}>Customer/Merchant</Text>
            </View>
          </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
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
  item: {
    width: Window_Width,
    height: 65,
    backgroundColor: '#dcdcdc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color:"#faaa09",

  },
    header:{
        backgroundColor: "#1a1f71",
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
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
      image:{
        width: 60,
        height: 60,
      },
      name:{
        fontSize:22,
        color:"#faaa13",
        fontWeight:'600',
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
  
});
