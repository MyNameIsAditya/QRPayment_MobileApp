import * as React from 'react';
import {MaterialIcons} from '@expo/vector-icons';

import Colors from './Colors';

export default function TabBarIcon(props) {
  return (
  
    <MaterialIcons
      name={props.name}
      size={25}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // color = {'#204051'}
    />
    
  );
}