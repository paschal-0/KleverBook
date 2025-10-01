import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import theme from '../theme/index';
import {observer} from 'mobx-react';
import store from '../store';

export default observer(ServerRes);
function ServerRes(props) {
  let text = props.text || 'Server Error !';
  let text2 = props.text2 || 'Server not responding, please try agin later';
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.load}
      onRequestClose={() => {
        store.General.setisServerError(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 15,
          }}>
          {text != '' && (
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 16,
                fontFamily: theme.fonts.fontBold,
              }}>
              {text}
            </Text>
          )}
          {text2 != '' && (
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 13,
                fontFamily: theme.fonts.fontMedium,
              }}>
              {text2}
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              store.General.setisServerError(false);
              // let isLogin = store.User.user !== false ? true : false;
              // if (isLogin) {
              //   store.User.getAllData('user');
              // } else {
              //   store.User.getAllData('');
              // }
            }}
            style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 13,
                fontFamily: theme.fonts.fontMedium,
                marginRight: 20,
                marginTop: 20,
              }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
