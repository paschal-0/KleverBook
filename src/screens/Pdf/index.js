import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Image,
  Keyboard,
  Linking,
  Alert,
  Modal as MModal,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import NetInfo from '@react-native-community/netinfo';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Pdf from 'react-native-pdf';
import Modal from 'react-native-modal';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import FastImage from 'react-native-fast-image';
import VideoPlayer from 'react-native-video-player';

export default observer(PDF);
function PDF(props) {
  const toast = useRef(null);
  const rpdf = useRef(null);
  const player = useRef(null);
  let internet = store.General.isInternet;
  let dt = props.route.params.dt; //data
  let d = props.route.params.d; //books
  let ads = dt.ads || [];

  let slot = d.ad_slots || [];
  let dadO = store.Downloads.defaultAd;

  let adTime = dadO.ad_time || 20;

  let repeatTime = dadO.repeat_time || 0;

  let screen = props.route.params.screen;

  const source = {uri: d.pdf_file, cache: true};

  const [load, setload] = useState(false);
  const [isError, setisError] = useState(false);

  const [tp, settp] = useState(0);
  const [cp, setcp] = useState(1);
  const [dp, setdp] = useState('');
  const [isV, setisV] = useState(false);

  const [adLoadErr, setadLoadErr] = useState(false);
  const [adLoad, setadLoad] = useState(false);
  const [adType, setadType] = useState(false);
  const [adData, setadData] = useState(false);

  const [isShowAd, setisShowAd] = useState(false);
  const [adcp, setadcp] = useState(0);
  const [adcpOne, setadcpOne] = useState(false);
  let imgLoader = require('../../assets/images/imgLoader/img.gif');

  let name = d.book_title || '';
  let pL = store.Downloads.pList || [];

  // console.log('dt : ', dt);
  // console.log('book : ', d);
  console.log('slots : ', slot);
  // console.log('sL : ', slot.length);
  // console.log('ads : ', ads);
  // console.log('adsL : ', ads.length);
  // console.log('dad : ', dad);
  // console.log('adtime : ', adTime);
  // console.log('addata : ', adData);
  // console.log('pL : ', pL);

  useEffect(() => {
    if (isShowAd && adLoad) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          let dta = {...adData};
          delete dta.ad_time;
          delete dta.repeat_time;
          store.Downloads.adSentAmount(dta, dt._id);
        }
      });
    } else {
      setadLoadErr(false);
      setadLoad(false);
    }
  }, [isShowAd, adData, adLoad]);

  useEffect(() => {
    if (adcpOne == true && adcp > 0 && !isShowAd) {
      if (adcp != cp) {
        clearInterval(interval);
        setadcpOne(false);
        setadcp(0);
        return;
      }

      const interval = setInterval(() => {
        if (internet) {
          setisShowAd(true);
        }
      }, repeatTime * 1000);

      return () => clearInterval(interval);
    }
  }, [adcpOne, adcp, cp, isShowAd, internet]);

  useEffect(() => {
    if (slot.length > 0) {
      const index = slot.indexOf(cp.toString());
      if (index > -1) {
        if (ads.length > 0) {
          let obj = ads[index];
          if (obj) {
            const ext = obj.ad_file.split('.').slice(-1)[0];
            let extType = utils.CheckExtensionType(ext);
            if (extType != '') {
              setadType(extType);
              setadData(obj);
              setisShowAd(true);
              setadcpOne(true);
              setadcp(cp);
            } else {
              console.warn('ad url extnsn not found : ', extType);
            }
          }
        } else {
          //show dflt ad

          let obj = dadO;
          if (obj) {
            const ext = obj.ad_file.split('.').slice(-1)[0];
            let extType = utils.CheckExtensionType(ext);
            if (extType != '') {
              setadType(extType);
              setadData(obj);
              setisShowAd(true);
              setadcpOne(true);
              setadcp(cp);
            } else {
              console.warn('default ad url extnsn not found : ', extType);
            }
          }
        }
      }
    }
  }, [cp, ads, slot]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      subscription.remove();
    };
  }, [cp]);

  function handleBackButtonClick() {
    goBack();
    return true;
  }

  const setPageBck = () => {
    if (pL.length > 0) {
      let dt = pL.slice();
      const index = dt.findIndex(element => element._id === d._id);
      if (index > -1) {
        dt[index].cp = cp;
      } else {
        const obj = {_id: d._id, cp: cp};
        dt.push(obj);
      }
      store.Downloads.setpList(dt);
    } else {
      let ar = [];
      const obj = {_id: d._id, cp: cp};
      ar.push(obj);
      store.Downloads.setpList(ar);
    }
  };

  useEffect(() => {
    if (load) {
      gotoSavePage();
    }
  }, [load]);

  const gotoSavePage = () => {
    if (pL.length > 0) {
      let ccp = 1;
      const index = pL.findIndex(element => element._id === d._id);
      if (index > -1) {
        ccp = pL[index].cp;
      }
      rpdf?.current?.setPage(ccp);
    }
  };

  const goBack = () => {
    setPageBck();
    props.navigation.goBack();
  };

  const renderShowPageNum = () => {
    return (
      <View
        style={{
          width: '80%',
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: responsiveHeight(5),
        }}>
        <TouchableOpacity
          onPress={() => {
            setisV(true);
          }}
          style={{
            width: 75,
            height: 35,
            backgroundColor: 'black',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.6,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              fontFamily: theme.fonts.fontBold,
            }}>
            {cp} / {tp}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const gotoDirectPage = () => {
    closeDirectPageModa();
    rpdf?.current?.setPage(parseInt(dp));
  };

  const redirecturl = async url => {
    if (adLoad) {
      console.log('redirect url : ', url);
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        console.warn("Don't know how to open this URL: ", url);
        // Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }
  };

  const closeDirectPageModa = () => {
    setisV(false);
    setdp('');
    Keyboard.dismiss();
  };

  const DirectPageModal = () => {
    return (
      <Modal
        backdropOpacity={0.5}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => {
          closeDirectPageModa();
        }}
        isVisible={isV}>
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
            Go to page
          </Text>

          <View
            style={{
              marginTop: 15,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '70%'}}>
              <TextInput
                maxLength={JSON.stringify(tp).length}
                placeholderTextColor={theme.color.subTitle}
                style={{
                  backgroundColor: 'white',
                  fontSize: 14,
                  color: theme.color.title,
                  borderBottomColor: theme.color.button1,
                  borderBottomWidth: 1.5,
                }}
                keyboardType="number-pad"
                placeholder="Enter Page Number"
                value={dp}
                onChangeText={text => {
                  if (dp == '') {
                    if (text <= 0) {
                      return;
                    }
                  }
                  text <= tp ? setdp(text.replace(/[^0-9]/g, '')) : '';
                }}
              />
            </View>

            <View style={{width: '25%', alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.color.title,
                  fontFamily: theme.fonts.fontNormal,
                }}>
                (1 - {tp})
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 40,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '73%', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => closeDirectPageModa()}>
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
                opacity: dp == '' ? 0.6 : 3,
              }}>
              <TouchableOpacity
                disabled={dp == '' ? true : false}
                style={{opacity: dp == '' ? 0.6 : 3}}
                onPress={gotoDirectPage}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.color.button1,
                    fontFamily: theme.fonts.fontMedium,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renerInt = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: '100%',
          position: 'absolute',
          top: '10%',
          height: theme.window.Height,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontFamily: theme.fonts.fontNormal,
            top: '-10%',
          }}>
          Please connect internet to continue reading..
        </Text>
      </View>
    );
  };

  const renderPdf = () => {
    return (
      <>
        <Pdf
          enablePaging={true}
          // enableRTL={true}
          ref={rpdf}
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setload(true);
            settp(numberOfPages);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
            setcp(page);
          }}
          onError={error => {
            setisError(true);
            console.log('error ', error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
        {DirectPageModal()}
        {load && renderShowPageNum()}
      </>
    );
  };

  const renderTime = ({remainingTime}) => {
    return <Text style={styles.timeTxt}>{remainingTime}</Text>;
  };

  const renderAdShow = () => {
    let styleee =
      adType == 'image'
        ? {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }
        : {flex: 1, padding: 10, backgroundColor: 'rgba(0,0,0,0.8)'};

    return (
      <>
        <MModal animationType="fade" transparent={true} visible={isShowAd}>
          <View style={styleee}>
            {adType == 'image' && (
              <>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => redirecturl(adData.redirect_url)}>
                    <FastImage
                      onError={e => {
                        console.warn('video  load error : ', e);
                        setadLoadErr(true);
                      }}
                      onLoad={() => {
                        setadLoad(true);
                      }}
                      style={styles.foodCardImg}
                      source={{
                        uri: adData.ad_file,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    {!adLoad && (
                      <Image
                        source={imgLoader}
                        style={{
                          height: 40,
                          width: 40,
                          position: 'absolute',
                          alignSelf: 'center',
                          top: '45%',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {adLoad && (
                  <View
                    style={{
                      backgroundColor: 'black',
                      borderRadius: 36 / 2,
                      position: 'absolute',
                      top:
                        Platform.OS == 'android'
                          ? 15
                          : theme.window.APPBAR_HEIGHT,
                      right: 10,
                    }}>
                    <CountdownCircleTimer
                      size={36}
                      strokeWidth={2.5}
                      isPlaying={true}
                      duration={adTime}
                      onComplete={() => {
                        setisShowAd(false);
                      }}
                      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                      colorsTime={[
                        adTime,
                        (adTime / 3).toFixed(),
                        (adTime / 2).toFixed(),
                        0,
                      ]}>
                      {renderTime}
                    </CountdownCircleTimer>
                  </View>
                )}
              </>
            )}

            {adType == 'video' && (
              <>
                <View
                  style={{
                    flex: 1,

                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => redirecturl(adData.redirect_url)}>
                    <VideoPlayer
                      onError={e => {
                        console.warn('video  load error : ', e);
                        setadLoadErr(true);
                      }}
                      onEnd={() => {
                        setisShowAd(false);
                      }}
                      onLoad={() => setadLoad(true)}
                      disableFullscreen
                      showDuration={true}
                      disableSeek
                      disableControlsAutoHide
                      autoplay
                      toggleResizeModeOnFullscreen={true}
                      videoHeight={theme.window.Height - 200}
                      videoWidth={theme.window.Width}
                      video={{uri: adData.ad_file}}
                    />

                    {!adLoad && (
                      <Image
                        source={imgLoader}
                        style={{
                          height: 40,
                          width: 40,
                          position: 'absolute',
                          alignSelf: 'center',
                          top: '45%',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}

            {adLoadErr && (
              <View
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 10,
                  position: 'absolute',
                  alignSelf: 'center',
                  top: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.9)',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'silver',
                    fontFamily: theme.fonts.fontMedium,
                  }}>
                  {adType == 'video' ? 'Video' : 'Image'} ad load error !
                </Text>
                <TouchableOpacity
                  onPress={() => setisShowAd(false)}
                  style={{marginTop: 10}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      fontFamily: theme.fonts.fontMedium,
                      textDecorationLine: 'underline',
                      textDecorationColor: 'white',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </MModal>
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.back}>
            <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
              <utils.vectorIcon.Ionicons
                name="chevron-back"
                color={theme.color.title}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '92%'}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.htitle}>
              {name}
            </Text>
          </View>
        </View>

        {!internet && <utils.InternetMessage />}
        {renderPdf()}
        {!internet && !isShowAd && renerInt()}
        {isShowAd == true && renderAdShow()}
      </SafeAreaView>
    </>
  );
}
