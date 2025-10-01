import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from '../../screens/index';

const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Home" component={screens.Home} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Signup" component={screens.Signup} />
      <Stack.Screen name="Book" component={screens.Book} />
      <Stack.Screen name="Setting" component={screens.Setting} />
      <Stack.Screen name="DownloadStack" component={DownloadStack} />
      <Stack.Screen name="Profile" component={screens.Profile} />
      <Stack.Screen name="ChangePassword" component={screens.ChangePassword} />
    </Stack.Navigator>
  );
};

const DownloadStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Downloads"
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Downloads" component={screens.Downloads} />
      <Stack.Screen name="Pdf" component={screens.PDF} />
      {/* <Stack.Screen
        name="DownloadsDetails"
        component={screens.DownloadsDetails}
      /> */}
    </Stack.Navigator>
  );
};
