import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Dimensions,
  Alert,
  Keyboard,
  Modal,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-easy-toast';
import NetInfo from '@react-native-community/netinfo';

export default observer(ChangePassword);
function ChangePassword(props) {
  const toast = useRef(null);
  const toastduration = 700;

  const window = Dimensions.get('window');
  const {width, height} = window;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA + width / height;

  let loader = store.User.loader;
  let user = store.User.user;

  const [cpswd, setcpswd] = useState('');
  const [scpswd, setscpswd] = useState(false);
  const [pswd, setpswd] = useState('');
  const [spswd, setspswd] = useState(false);
  const [rpswd, setrpswd] = useState('');
  const [srpswd, setsrpswd] = useState(false);

  const [pvm, setpvm] = useState(false); //show fulll image modal
  const [pv, setpv] = useState(''); //photo view

  const goBack = () => {
    props.navigation.goBack();
  };

  const showSuccesOrder = () => {
    toast?.current?.show('Done', 500);

    setTimeout(() => {
      store.User.setLoader(false);
      goBack();
    }, 300);
  };

  const Update = () => {
    if (cpswd === '') {
      toast?.current?.show('Please enter your current password');
      return;
    }

    if (pswd === '') {
      toast?.current?.show('Please enter new password');
      return;
    }

    if (pswd.length < 7) {
      toast?.current?.show('Password length must be greater than 6');
      return;
    }

    if (rpswd === '') {
      toast?.current?.show('Please re-enter new password');
      return;
    }
    if (pswd !== rpswd) {
      toast?.current?.show('Password do not match');
      return;
    }

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        store.User.ChangePassword(cpswd, pswd, showSuccesOrder);
      } else {
        toast?.current?.show('Please connect internet', toastduration);
      }
    });
  };

  const renderBottomButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={Update}
        style={{
          backgroundColor: theme.color.button1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: responsiveHeight(5),
          elevation: 5,
          borderRadius: 5,
          marginTop: 30,
        }}>
        <Text
          style={{
            color: theme.color.buttonText,
            fontSize: 16,
            fontFamily: theme.fonts.fontNormal,
          }}>
          Update Password
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <utils.Loader text={'Please wait'} load={loader} />

      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
            <utils.vectorIcon.Ionicons
              name="chevron-back"
              color={theme.color.title}
              size={26}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.htitle}>Change Password</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: theme.color.background,
            padding: 15,
            width: responsiveWidth(90),
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 5,
            elevation: 5,
            marginBottom: 20,
          }}>
          <View style={[styles.MobileInput, {marginTop: 0}]}>
            <TextInput
              secureTextEntry={!scpswd}
              style={styles.pswdInput}
              placeholderTextColor={theme.color.subTitle}
              placeholder="Enter your current password"
              value={cpswd}
              onChangeText={val => {
                setcpswd(val);
              }}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setscpswd(!scpswd)}>
              <utils.vectorIcon.Entypo
                name={!scpswd ? 'eye' : 'eye-with-line'}
                color={theme.color.subTitle}
                size={18}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.MobileInput}>
            <TextInput
              secureTextEntry={!spswd}
              style={styles.pswdInput}
              placeholderTextColor={theme.color.subTitle}
              placeholder="Enter your new password"
              value={pswd}
              onChangeText={val => {
                setpswd(val);
              }}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setspswd(!spswd)}>
              <utils.vectorIcon.Entypo
                name={!spswd ? 'eye' : 'eye-with-line'}
                color={theme.color.subTitle}
                size={18}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.MobileInput}>
            <TextInput
              secureTextEntry={!srpswd}
              style={styles.pswdInput}
              placeholderTextColor={theme.color.subTitle}
              placeholder="Re-enter your password"
              value={rpswd}
              onChangeText={val => {
                setrpswd(val);
              }}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setsrpswd(!srpswd)}>
              <utils.vectorIcon.Entypo
                name={!srpswd ? 'eye' : 'eye-with-line'}
                color={theme.color.subTitle}
                size={18}
              />
            </TouchableOpacity>
          </View>

          {renderBottomButton()}
        </View>
      </ScrollView>

      <Toast ref={toast} position="bottom" />
    </SafeAreaView>
  );
}
