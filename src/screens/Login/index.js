import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  Keyboard,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import Modal from 'react-native-modal';

export default observer(Login);
function Login(props) {
  const mobileReg = /^[3]\d{9}$/ || /^[0][3]\d{9}$/;
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const toast = useRef(null);
  const toastduration = 1000;
  let loader = store.User.loginLoader;
  let forgotPassLoader = store.User.fploader;
  let screen = props.route.params.screen;

  const [email, setemail] = useState('');
  const [pswd, setshowPswd] = useState('');
  const [showPswd, setspswd] = useState(false);
  const [forgotPassModal, setforgotPassModal] = useState(false);
  const [forgotEmail, setforgotEmail] = useState('');

  //method

  const goBack = () => {
    props.navigation.goBack();
  };

  const goSignup = () => {
    props.navigation.navigate('Signup', {screen: screen});
  };

  const closeForgotPaswdModal = () => {
    setforgotPassModal(false);
    setforgotEmail('');
    Keyboard.dismiss();
  };

  const forgotPasSuc = () => {
    setforgotPassModal(false);
    toast?.current?.show('Please check your email', toastduration);
  };

  const Login = () => {
    Keyboard.dismiss();

    if (email == '') {
      toast?.current?.show('Please enter your email');
      return;
    }

    if (email !== '' && emailReg.test(email) === false) {
      toast?.current?.show('Your email pattern is invalid', 1000);
      return;
    }

    if (pswd == '') {
      toast?.current?.show('Please enter your password', 1000);
      return;
    }

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const data = {
          email: email,
          password: pswd,
          // registrationToken: store.User.notificationToken,
        };
        store.User.attemptToLogin(data, goBack);
      } else {
        toast?.current?.show('Please connect internet', toastduration);
      }
    });
  };

  const sendForgotPaswd = () => {
    Keyboard.dismiss();

    if (forgotEmail == '') {
      toast?.current?.show('Please enter your email');
      return;
    }

    if (forgotEmail !== '' && emailReg.test(forgotEmail) === false) {
      Alert.alert('', 'Your email pattern is invalid');
      return;
    }

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const data = {
          email: email,
        };
        store.User.forgotPassword(data, forgotPasSuc);
        // props.navigation.navigate('OTP', {screen: 'login', data: data, s: s});
      } else {
        Alert.alert('Please connect internet');
      }
    });
  };

  // render

  const rendertextInputRightIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setspswd(!showPswd)}
        style={{
          width: '10%',
          alignItems: 'flex-end',
        }}>
        <utils.vectorIcon.Entypo
          style={styles.inputRightIcon}
          name={showPswd ? 'eye-with-line' : 'eye'}
          color={theme.color.subTitle}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  const renderBottomButton = () => {
    return (
      <>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 12,
            elevation: 20,
            backgroundColor: theme.color.background,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={Login}
            style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Login</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 7,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: theme.color.subTitle,
                fontFamily: theme.fonts.fontNormal,
                textAlign: 'center',
              }}>
              Don't have an Account?
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={goSignup}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: theme.color.subTitle,
                  fontFamily: theme.fonts.fontNormal,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const rednerForgotPaswdModal = () => {
    return (
      <Modal
        backdropOpacity={0.6}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => {
          closeForgotPaswdModal();
        }}
        isVisible={forgotPassModal}>
        <View
          style={{
            width: 300,
            backgroundColor: 'white',
            borderRadius: 5,
            alignSelf: 'center',
            elevation: 3,
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: theme.fonts.fontNormal,
              color: theme.color.title,
            }}>
            Please enter your email
          </Text>

          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            <TextInput
              placeholderTextColor={theme.color.subTitleLight}
              style={{
                backgroundColor: 'white',
                fontSize: 14,
                color: theme.color.title,
                borderBottomColor: theme.color.button1,
                borderBottomWidth: 1.5,
              }}
              placeholder="a@a.com"
              value={forgotEmail}
              onChangeText={text => {
                setforgotEmail(text);
              }}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '73%', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={closeForgotPaswdModal}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.color.button1,
                    fontFamily: theme.fonts.fontMedium,
                  }}>
                  CANCEL{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                disabled={forgotEmail == '' ? true : false}
                style={{opacity: forgotEmail == '' ? 0.6 : 3}}
                onPress={sendForgotPaswd}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.color.button1,
                    fontFamily: theme.fonts.fontMedium,
                  }}>
                  SEND
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.4} onPress={goBack}>
          <utils.vectorIcon.Ionicons
            name="chevron-back"
            color={theme.color.subTitle}
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainContent = () => {
    return (
      <>
        <Text style={styles.logoTitle}>Login</Text>

        <View style={styles.inputFieldConatiner}>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor={theme.color.subTitle}
              placeholder=""
              defaultValue={email}
              onChangeText={val => {
                setemail(val);
              }}
            />
          </View>
        </View>

        <View style={styles.inputFieldConatiner}>
          <Text style={styles.inputTitle}>Password</Text>
          <View
            style={[
              styles.InputContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <TextInput
              secureTextEntry={!showPswd}
              style={[styles.textInputStyle, {width: '85%'}]}
              placeholderTextColor={theme.color.subTitle}
              placeholder=""
              defaultValue={pswd}
              onChangeText={val => {
                setshowPswd(val);
              }}
            />
            {pswd.length > 0 && rendertextInputRightIcon()}
          </View>
        </View>

        {/* <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setfpModal(true);
              }}>
              <Text
                style={styles.fpt}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View> */}
      </>
    );
  };

  const renderStatusBar = () => {
    return (
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={'dark-content'}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <utils.Loader text={'Please wait'} load={loader || forgotPassLoader} />
      <Toast ref={toast} position="center" />
      {renderStatusBar()}
      {rednerForgotPaswdModal()}
      {renderHeader()}

      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {renderMainContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      {renderBottomButton()}
    </SafeAreaView>
  );
}
