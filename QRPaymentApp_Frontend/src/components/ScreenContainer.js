import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

const ScreenContainer = (props) => {
  return <SafeAreaView>{props.children}</SafeAreaView>;
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
