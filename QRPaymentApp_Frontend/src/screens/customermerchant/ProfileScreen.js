import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import AuthContext from '../../constants/AuthContext';
import ScreenContainer from '../../components/ScreenContainer';
const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <View>
        <Text>PROFILEEEE</Text>
        <Button title='Sign out' onPress={signOut} />
      </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;
