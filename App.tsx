import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Pushnotification from './src/notificationScreen';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Pushnotification />
    </View>
  );
}

const styles = StyleSheet.create({});
