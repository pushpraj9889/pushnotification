import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// forgroun state handler fucntion

export const ForeGroundHandler = () => {
  //for creation of chanells
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  useEffect(() => {
    const IMAGE_URL =
      'https://www.axisbank.com/images/default-source/axislanding/mobbanner-3.jpg';
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('----->', remoteMessage.notification?.android?.imageUrl);
      PushNotification.localNotification({
        channelId: 'channel-id',
        // (required) channelId, if the channel doesn't exist, notification will not trigger.
        id: 0,
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
        playSound: false,
        soundName: 'default',
        repeatType: 'day',
        number: 10,
        largeIconUrl: remoteMessage.notification?.android?.imageUrl,
        bigPictureUrl: IMAGE_URL,
      });
    });
    return unsubscribe;
  });
  return null;
};
export const notificationListner = (callback: any) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // navigation.navigate(remoteMessage.data.type);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        callback(remoteMessage);
      }
    })
    .catch(err => {
      console.log('err', err);
    });
};

// intial notification screen fun
export const intialNotification = (callback: any) => {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        callback(remoteMessage);
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
