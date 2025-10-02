import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppRoot from './src/navigation'; // make sure this file exists and default-exports your app root
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return <AppRoot />;
}
