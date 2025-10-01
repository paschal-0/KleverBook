import React from 'react';
import {View, Modal, ActivityIndicator, Text} from 'react-native';

import theme from '../theme/index';

export default function Loader(props) {
  let text = props.text || '';

  return (
    <Modal animationType="fade" transparent={true} visible={props.load}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 60,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: theme.color.button1,
            padding: 15,
          }}>
          <ActivityIndicator size={40} color={'white'} />
          {text != '' && (
            <Text
              style={{
                color: theme.color.buttonText,
                marginTop: 10,
                fontSize: 14,
                fontFamily: theme.fonts.fontNormal,
              }}>
              {text}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}
