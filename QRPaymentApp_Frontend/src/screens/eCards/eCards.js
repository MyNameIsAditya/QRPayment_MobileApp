import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';


const cardData = [
  { id: '1', title: 'BoA' },
  { id: '2', title: 'Chase' },
  { id: '3', title: 'Wells Fargo' },
];

const Card = ({ title }) => {
  return (
    <View style={styles.cardItem}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.qr} source={require('../../assets/qr.png')}/>
      <Image style={styles.logo} source={require('../../assets/visalogo.png')}/>
    </View>
  );
};

const eCards = ({ title }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>VISA eCards</Text>
        </View>
      </View>
      <FlatList
        data={cardData}
        renderItem={({ item }) => <Card title={item.title} />}
        keyExtractor={(item) => item.id}
      />
     
    </SafeAreaView>
  );
};

export default eCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },

  header: {
    backgroundColor: '#1a1f71',
  },

  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  name: {
    fontSize: 35,
    color: '#faaa13',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  cardItem: {
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: 30,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#1a1f71'
  },
  title:{
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  },
  qr: {
    alignSelf: 'center',
    marginTop: 50,
   
  },
  logo: {
    height: 20,
    width: 65,
    marginTop: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
  }
});
