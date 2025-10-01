import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  ActivityIndicator,
  Modal,
  Keyboard,
  StatusBar,
} from 'react-native';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';

export default observer(Setting);
function Setting(props) {
  let user = store.User.user;

  console.log('user : ', user);

  let name = user?.user.name || '';
  let phone = user?.phone || '';
  let email = user?.user.email || '';

  let image = user?.image
    ? {uri: user.image}
    : require('../../assets/images/profile/img.png');

  const [profileImageLoader, setprofileImageLoader] = useState(false);
  const [showfullimagLoader, setshowfullimagLoader] = useState(false);
  const [pvm, setpvm] = useState(false); //show fulll image modal
  const [pv, setpv] = useState(''); //photo view

  const goBack = () => {
    props.navigation.goBack();
  };

  const sep = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'silver',
          height: 0.6,
          marginVertical: 15,
          alignSelf: 'center',
        }}
      />
    );
  };

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const onclickImage = c => {
    Keyboard.dismiss();

    if (c == 'profileV') {
      setpv(image);
      setpvm(true);
      return;
    }

    MultipleImage(c);
  };

  const renderFullImage = () => {
    return (
      <Modal
        visible={pvm}
        transparent
        onRequestClose={() => {
          setpvm(false);
          setpv('');
        }}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <Image
            onLoadStart={() => setshowfullimagLoader(false)}
            onLoad={() => {
              setshowfullimagLoader(true);
            }}
            style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
            resizeMode="contain"
            source={pv}
          />

          {!showfullimagLoader && (
            <ActivityIndicator
              size={40}
              color={'blue'}
              style={{
                top: '50%',
                left: '50%',
                right: '50%',
                bottom: '50%',
                position: 'absolute',
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setpvm(!pvm);
              setpv('');
            }}
            style={styles.fullImageModalCross}>
            <utils.vectorIcon.Entypo name="cross" color="white" size={35} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={'dark-content'}
      />
      {renderFullImage()}
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
            <utils.vectorIcon.Ionicons
              name="chevron-back"
              color={theme.color.subTitle}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section1}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: theme.color.subTitleLight,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled
              onPress={() => {
                Keyboard.dismiss();
                let i = user.image || '';
                if (i !== '') {
                  onclickImage('profileV');
                }
              }}>
              <Image
                onLoadStart={() => {
                  setprofileImageLoader(false);
                }}
                onLoad={() => {
                  setprofileImageLoader(true);
                }}
                style={styles.logo}
                source={image}
              />
              {!profileImageLoader && (
                <ActivityIndicator
                  size={22}
                  color={theme.color.button1}
                  style={{top: 40, position: 'absolute', alignSelf: 'center'}}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 17,
                color: theme.color.title,
                fontFamily: theme.fonts.fontBold,
                lineHeight: 27,
                textTransform: 'capitalize',
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: theme.color.subTitleLight,
                fontFamily: theme.fonts.fontMedium,
                lineHeight: 25,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {phone}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: theme.color.subTitleLight,
                fontFamily: theme.fonts.fontMedium,
                lineHeight: 25,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {email}
            </Text>
          </View>
        </View>

        <View style={styles.section2}>
          <Text
            style={{
              fontSize: 20,
              color: theme.color.title,
              fontFamily: theme.fonts.fontMedium,
            }}>
            Personal
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Profile')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <View
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <utils.vectorIcon.Ionicons
              name="person-circle"
              color={theme.color.subTitle}
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 7,
                color: theme.color.title,
                fontFamily: theme.fonts.fontMedium,
              }}>
              Profile
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={22}
          />
        </TouchableOpacity>
        {sep()}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('DownloadStack')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <View
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <utils.vectorIcon.MaterialCommunityIcons
              name="microsoft-xbox-controller-menu"
              color={theme.color.subTitle}
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 7,
                color: theme.color.title,
                fontFamily: theme.fonts.fontMedium,
              }}>
              Downloads
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={22}
          />
        </TouchableOpacity>
        {sep()}

        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            // props.navigation.navigate('Favourite');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <View
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <utils.vectorIcon.Ionicons
              name="heart-circle-sharp"
              color={theme.color.subTitle}
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 7,
                color: theme.color.title,
                fontFamily: theme.fonts.fontMedium,
              }}>
              My Favourites
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={22}
          />
        </TouchableOpacity>
        {sep()} */}

        <View style={styles.section3}>
          <Text
            style={{
              fontSize: 20,
              color: theme.color.title,
              fontFamily: theme.fonts.fontMedium,
            }}>
            General
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('ChangePassword');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <View
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <utils.vectorIcon.Feather
              name="lock"
              color={theme.color.subTitle}
              size={20}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                color: theme.color.title,
                fontFamily: theme.fonts.fontMedium,
              }}>
              Change Password
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={22}
          />
        </TouchableOpacity>
        {sep()}

        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('PromoStack')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <View
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <utils.vectorIcon.MaterialIcons
              name="money-off"
              color={theme.color.subTitle}
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                color: theme.color.title,
                fontFamily: theme.fonts.fontMedium,
              }}>
              Promos
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={22}
          />
        </TouchableOpacity>

        {sep()} */}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            store.User.Logout(goHome);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          }}>
          <View
            style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
            <utils.vectorIcon.MaterialCommunityIcons
              name="logout"
              color={theme.color.subTitle}
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                color: theme.color.title,
                fontFamily: theme.fonts.fontMedium,
              }}>
              Logout
            </Text>
          </View>
          <utils.vectorIcon.AntDesign
            name="right"
            color={theme.color.subTitle}
            size={22}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
