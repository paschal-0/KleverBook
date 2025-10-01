import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
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

import {getCountries, getStates} from 'country-state-picker';
import IntlPhoneInput from 'react-native-intl-phone-input';

export default observer(Signup);
function Signup(props) {
  const toast = useRef(null);
  const toastduration = 700;
  let screen = props.route.params.screen;
  let loader = store.User.regLoader;
  var nameReg = /^[a-zA-Z ]{2,40}$/;
  const mobileReg = /^[3]\d{9}$/ || /^[0][3]\d{9}$/;
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [isDropDownCountry, setisDropDownCountry] = useState(false);
  const [isDropDownState, setisDropDownState] = useState(false);
  const [country, setcountry] = useState(false);
  const [state, setstate] = useState('');
  const [city, setcity] = useState('');
  const [zipCode, setzipCode] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [countryList, setcountryList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [phone, setphone] = useState('');
  const [isVerifyPhone, setisVerifyPhone] = useState('a');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pswd, setpswd] = useState('');
  const [showPswd, setshowPswd] = useState(false);
  const [confirmPswd, setconfirmPswd] = useState('');
  const [showConfirmPswd, setshowConfirmPswd] = useState(false);

  // hook

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    if (country) {
      getAllStates();
    }
  }, [country]);

  // method

  const getAllCountries = async () => {
    let c = await getCountries();
    setcountryList(c);
  };

  const getAllStates = async () => {
    let c = await getStates(country.code);
    setstateList(c);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const closeAllDropDown = () => {
    let c = false;
    Keyboard.dismiss();
    setisDropDownCountry(c);
    setisDropDownState(c);
  };

  const goLogin = () => {
    goBack();
  };

  const Signup = () => {
    Keyboard.dismiss();
    closeAllDropDown();

    if (name == '') {
      toast?.current?.show('Please enter your name', toastduration);
      return;
    }

    if (name != '' && nameReg.test(name) === false) {
      toast?.current?.show('Please enter your correct name', toastduration);
      return;
    }

    if (email == '') {
      toast?.current?.show('Please enter your email', toastduration);
      return;
    }

    if (email !== '' && emailReg.test(email) === false) {
      toast?.current?.show('Your email pattern is invalid', toastduration);
      return;
    }

    if (phone == '') {
      toast?.current?.show('Please enter your phone number', toastduration);
      return;
    }

    if (phone !== '' && !isVerifyPhone) {
      toast?.current?.show('Your phone number is inavlid', toastduration);
      return;
    }

    if (!country) {
      toast?.current?.show('Please select your country', toastduration);
      return;
    }

    if (state == '') {
      toast?.current?.show('Please select your state', toastduration);
      return;
    }

    if (city == '') {
      toast?.current?.show('Please enter your city', toastduration);
      return;
    }

    if (zipCode == '') {
      toast?.current?.show('Please enter your zip code', toastduration);
      return;
    }
    if (streetAddress == '') {
      toast?.current?.show('Please enter your street address', toastduration);
      return;
    }

    if (pswd == '') {
      toast?.current?.show('Please enter your password', toastduration);
      return;
    }

    if (pswd.length < 7) {
      toast?.current?.show(
        'Password length must be greater than 6',
        toastduration,
      );
      return;
    }

    if (confirmPswd == '') {
      toast?.current?.show('Please enter your confirm password', toastduration);
      return;
    }

    if (pswd != confirmPswd) {
      toast?.current?.show('Confirm password not match', toastduration);
      return;
    }

    NetInfo.fetch().then(statee => {
      if (statee.isConnected) {
        const data = {
          name: name,
          email: email,
          password: pswd,
          phone: phone,
          address: {
            name: streetAddress,
            zip: zipCode,
            city: city,
            state: state,
            country: country.name,
          },
          // registrationToken: store.User.notificationToken,
        };

        store.User.registerUser(data, goHome);
      } else {
        toast?.current?.show('Please connect internet', toastduration);
      }
    });
  };

  const setPhoneNumber = p => {
    console.log('p : ', p.isVerified);
    setisVerifyPhone(p.isVerified);
    if (p.unmaskedPhoneNumber == '') {
      setphone('');
    } else {
      setphone(p.dialCode + p.unmaskedPhoneNumber);
    }
  };

  // render

  const renderBottomButton = () => {
    return (
      <>
        <View style={styles.bottom1}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={Signup}
            style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.bottom2}>
            <Text style={styles.bottom3}>Already have an Account?</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={goLogin}>
              <Text style={styles.bottom4}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const textInputRightIcon = (chk, c) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (c == 'sp') setshowPswd(!showPswd);
          else setshowConfirmPswd(!showConfirmPswd);
        }}
        style={{
          width: '10%',
          alignItems: 'flex-end',
        }}>
        <utils.vectorIcon.Entypo
          style={styles.inputRightIcon}
          name={chk ? 'eye-with-line' : 'eye'}
          color={theme.color.subTitle}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  const textInputRightIcon2 = () => {
    return (
      <TouchableOpacity
        disabled
        style={{
          width: '11%',
          alignItems: 'flex-end',
        }}>
        <utils.vectorIcon.Entypo
          style={styles.inputRightIcon}
          name={'chevron-small-down'}
          color={theme.color.subTitle}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  const renderDropDown = c => {
    let data = [];

    if (c == 'country') {
      data = countryList;
    } else if (c == 'state') {
      data = stateList;
    }

    const onclickSelect = d => {
      console.log('on select : ', d);

      if (c == 'country') {
        setcountry(d);
        setstate('');
      } else if (c == 'state') {
        setstate(d);
      }
    };

    return (
      <theme.DropDown
        data={data}
        onSelectItem={d => {
          onclickSelect(d);
        }}
        setVisible={d => {
          closeAllDropDown();
        }}
        search={data.length > 0 ? true : false}
        c={c}
        absolute={false}
      />
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

  const renderStatusBar = () => {
    return (
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={'dark-content'}
      />
    );
  };

  const renderMainContent = () => {
    return (
      <>
        <Text style={styles.mcTitle}>Let's create your account!</Text>

        <View style={styles.inputFieldConatiner}>
          <Text style={styles.inputTitle}>Name</Text>
          <View style={styles.InputContainer}>
            <TextInput
              maxLength={40}
              style={styles.textInputStyle}
              placeholderTextColor={theme.color.subTitle}
              placeholder=""
              defaultValue={name}
              onChangeText={val => {
                setname(val);
              }}
            />
          </View>
        </View>

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
          <Text style={styles.inputTitle}>Contact No.</Text>
          <View style={styles.InputContainer}>
            <IntlPhoneInput
              onChangeText={p => {
                setPhoneNumber(p);
              }}
              defaultCountry="PK"
              lang="EN"
              renderAction={() => (
                <>
                  {!isVerifyPhone && phone != '' && (
                    <utils.vectorIcon.Entypo
                      name="cross"
                      color={theme.color.subTitle}
                      size={18}
                    />
                  )}

                  {isVerifyPhone == true && (
                    <utils.vectorIcon.Entypo
                      name="check"
                      color={'green'}
                      size={18}
                    />
                  )}
                </>
              )}
            />
          </View>
        </View>

        <View
          style={[
            styles.inputFieldConatiner,
            {
              flexDirection: 'row',

              justifyContent: 'space-between',
            },
          ]}>
          <View style={{width: '48%'}}>
            <Text style={styles.inputTitle}>Country</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                closeAllDropDown();
                setisDropDownCountry(!isDropDownCountry);
              }}
              style={[
                styles.InputContainer,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <View style={{width: '85%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.textDropDown,
                    {
                      color: country ? theme.color.subTitle : theme.color.title,
                    },
                  ]}>
                  {country ? country.name : 'Select Country'}
                </Text>
              </View>

              {textInputRightIcon2()}
            </TouchableOpacity>
            {isDropDownCountry && renderDropDown('country')}
          </View>

          <View
            style={{
              width: '48%',
            }}>
            <Text style={styles.inputTitle}>State</Text>
            <TouchableOpacity
              disabled={!country ? true : false}
              activeOpacity={0.6}
              onPress={() => {
                closeAllDropDown();
                setisDropDownState(!isDropDownState);
              }}
              style={[
                styles.InputContainer,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: country
                    ? theme.color.background
                    : theme.color.disableBack,
                },
              ]}>
              <View style={{width: '85%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.textDropDown,
                    {
                      color:
                        state == '' ? theme.color.subTitle : theme.color.title,
                    },
                  ]}>
                  {state == '' ? 'Select State' : state}
                </Text>
              </View>

              {textInputRightIcon2()}
            </TouchableOpacity>
            {isDropDownState && renderDropDown('state')}
          </View>
        </View>

        <View
          style={[
            styles.inputFieldConatiner,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <View style={{width: '48%'}}>
            <Text style={styles.inputTitle}>City</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                defaultValue={city}
                onChangeText={val => {
                  setcity(val);
                }}
              />
            </View>
          </View>

          <View
            style={{
              width: '48%',
            }}>
            <Text style={styles.inputTitle}>Zip Code</Text>
            <View style={styles.InputContainer}>
              <TextInput
                keyboardType="number-pad"
                style={styles.textInputStyle}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                value={zipCode}
                maxLength={10}
                defaultValue={zipCode}
                onChangeText={val => {
                  setzipCode(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputFieldConatiner}>
          <Text style={styles.inputTitle}>Street Address</Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor={theme.color.subTitle}
              placeholder=""
              defaultValue={streetAddress}
              onChangeText={val => {
                setstreetAddress(val);
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
                setpswd(val);
              }}
            />

            {pswd.length > 0 && textInputRightIcon(showPswd, 'sp')}
          </View>
        </View>

        <View style={styles.inputFieldConatiner}>
          <Text style={styles.inputTitle}>Confirm Password</Text>
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
              secureTextEntry={!showConfirmPswd}
              style={[styles.textInputStyle, {width: '85%'}]}
              placeholderTextColor={theme.color.subTitle}
              placeholder=""
              defaultValue={confirmPswd}
              onChangeText={val => {
                setconfirmPswd(val);
              }}
            />

            {confirmPswd.length > 0 &&
              textInputRightIcon(showConfirmPswd, 'scp')}
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <utils.Loader text={'Please wait'} load={loader} />
      <Toast ref={toast} position="center" />
      {renderStatusBar()}
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
