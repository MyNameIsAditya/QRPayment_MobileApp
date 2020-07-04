import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// SCREENS

import HomeScreen from '../customermerchant/HomeScreen';
import QRScannerScreen from '../../screens/QRscanner/QRScannerScreen';
import TransactionScreen from '../transaction/TransactionScreen';
import CustomerMerchantScreen from '../customermerchant/CustomerMerchantScreen';
import eCards from '../eCards/eCards';
import CameraQR from '../../components/QrScannerCamera/CameraQR';
import Menu from '../menu/Menu';
// import ApiCallerQR from '../QRscanner/Assets/PostApiCall';
import TabBarIcon from '../../components/TabBarIcon'; 

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const BottomTabNav = ({ navigation, route }) => {
  return (
    <BottomTab.Navigator headerMode="none">
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='home' />
          )
        }}
      />
      <BottomTab.Screen
        name='Transactions'
        component={TransactionScreen}
        options={{
          title: 'Transactions',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='store' />
          )
        }}
      />
      {/* <BottomTab.Screen
        name='Menu'
        component={Menu}
  
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='menu' />
          )
        }}
      /> */}
{/* 
      <BottomTab.Screen
        name='CMerchant'
        component={CustomerMerchantScreen}
        options={{
          title: 'CMerchant',
        }}
      /> */}
      <BottomTab.Screen
        name='eCards'
        component={eCards}
        options={{
          title: 'eCards',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='credit-card' />
          )
        }}
      />

      <BottomTab.Screen
        name='QR'
        component={QRScannerScreen}
        options={{
          title: 'QR',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='camera' />
          )
        }}
      />

{/* <BottomTab.Screen
        name='QR'
        component={ApiCallerQR}
        options={{
          title: 'QR',
        }}
      /> */}

      {/* <BottomTab.Screen
        name='QA'
        component={CameraQR}
        options={{
          title: 'QA',
        }}
      />
      <BottomTab.Screen
        name='QRB'
        component={CameraQR}
        options={{
          title: 'QRB',
        }}
      /> */}
    </BottomTab.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';

    case 'Profile':
      return 'Profile';
    case 'Menu':
      return 'Menu';
  }
}

export default BottomTabNav;