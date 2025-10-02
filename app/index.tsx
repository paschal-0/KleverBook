// app/index.tsx
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppRoot from '../src';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../src/assets/fonts/Poppins-Bold.ttf'),
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
