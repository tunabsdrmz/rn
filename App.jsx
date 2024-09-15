import React, {useEffect} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Navigator} from './src/navigation/navigator';
import {pnStorage} from './src/utils/helper';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  await pnStorage.saveNotification(remoteMessage);
  console.log('Message handled in the background!', remoteMessage);
});

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await pnStorage.saveNotification(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const getUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    };
    getUserPermission();
  }, []);

  return <Navigator />;
}
