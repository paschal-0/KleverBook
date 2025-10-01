import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import theme from '../theme/index';

export default function InternetMessage(props) {
  let color = props.color || theme.color.button1;

  return (
    <View style={{padding: 2, backgroundColor: color}}>
      <Text
        style={{
          alignSelf: 'center',
          color: theme.color.buttonText,
          fontSize: 14,
          fontFamily: theme.fonts.fontMedium,
        }}>
        No internet connection
      </Text>
    </View>
  );
}
