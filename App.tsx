import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
// utils import
import {
  ForeGroundHandler,
  intialNotification,
  notificationListner,
} from './src/utils/foregGroundHandler';

const Pushnotification = () => {
  useEffect(() => {
    notificationListner((rep: any) => {
      console.log(rep);
    });
    intialNotification((resp: any) => {
      console.log(resp);
    });

    //  when app will be in foreground state
  }, []);
  {
    ForeGroundHandler();
  }

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      Alert.alert(fcmToken);
    }
  };
  return (
    <View style={styles.Container}>
      <Text style={styles.paragraph}>
        {'Push Notification With Firebasse Demo'}
      </Text>
      <Button title="Get FCM Token" onPress={checkToken} />
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default Pushnotification;
