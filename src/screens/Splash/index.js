// src/screens/Splash/index.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { styles } from './styles';
import { observer } from 'mobx-react';
import store from '../../store/index';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// expo-notifications
import * as Notifications from 'expo-notifications';


// Set up Android channel (only necessary when sending local notifications)
if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  }).catch(() => {});
}

const requestAndSaveExpoToken = async () => {
  try {
    // Request permissions on the device
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Push notification permission not granted');
      return;
    }

    // Get the Expo push token
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData?.data ?? tokenData; // adapt depending on SDK shape
    console.log('expo push token:', token);

    if (token && store && store.User && typeof store.User.addnotificationToken === 'function') {
      store.User.addnotificationToken(token);
    }
  } catch (err) {
    console.log('Error getting expo push token:', err);
  }
};

// Hydration helper using mobx-persist (keeps your existing approach)
const hydrateStores = async () => {
  const hydrate = create({ storage: AsyncStorage });
  try {
    await hydrate('General', store.General);
    await hydrate('User', store.User);
    await hydrate('Downloads', store.Downloads);
    // await hydrate('Book', store.Food);
  } catch (err) {
    console.warn('Hydration error', err);
  }
};

function Splash(props) {
  useEffect(() => {
    (async () => {
      await hydrateStores();
      checkIsUserLogin();

      // request push token in Expo Go / if available (no crash if not)
      await requestAndSaveExpoToken();
    })();
  }, []);

  const checkIsUserLogin = () => {
    let isLogin = store.User && store.User.user !== false ? true : false;
    let timeout = isLogin ? 3000 : 2000;
    if (isLogin) {
      // keep your existing call
      store.User.getAllData('user');
    } else {
      store.User.getAllData('');
    }

    setTimeout(() => {
      store.General.setLoading(false);
    }, timeout);
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS == 'android' ? (
        <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      ) : (
        <StatusBar translucent={false} backgroundColor="black" barStyle={'dark-content'} />
      )}
      <ImageBackground
        style={styles.background}
        blurRadius={3}
        source={require('../../assets/images/backgorund/img.jpeg')}>
        <Text style={styles.title1}>Welcome To</Text>
        <Text style={styles.title2}>{store.General.AppName}</Text>
      </ImageBackground>

      <Image style={styles.logo} source={require('../../assets/images/logo/img.png')} />
    </SafeAreaView>
  );
}

export default observer(Splash);
