import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import DynamicTabView from 'react-native-dynamic-tab-view';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-easy-toast';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, {Path} from 'react-native-svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextInput} from 'react-native-paper';

export default observer(Home);
function Home(props) {
  let internet = store.General.isInternet;
  let tagLine = '';
  let coverImage = require('../../assets/images/homeCover/img.jpg');
  const rbSheet = useRef(null);
  const rbSheet2 = useRef(null);
  const toast = useRef(null);
  const user = store.User.user;
  const getBooksLoader = store.User.AdverbookLoader;
  const adverBooks = store.User.adverBooks;
  const bookCat = store.User.bookCat;
  let getDataOnce = store.User.isGetAllDatainSplash;
  let isServerError = store.General.isServerError;
  const selectedFilter = store.General.selectedFilter;

  const windowWidth = theme.window.Width;
  const imageAspectWidth = 375;
  const imageAspectHeight = 332;
  const curveAdjustment = 10;
  const maskHeight = responsiveHeight(28);
  const scaleFactor = imageAspectWidth / imageAspectHeight;
  const scaledHeight = scaleFactor * maskHeight;
  const controlPointX = windowWidth / 2.0;
  const controlPointY = scaledHeight + curveAdjustment;
  const curveCenterPointY = (controlPointY - maskHeight) / 2;

  const [search, setsearch] = useState('');
  const [data, setData] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedTab, setselectedTab] = useState('');
  const [numOfSelFilter, setnumOfSelFilter] = useState(0);
  const [filter, setfilter] = useState([]);
  const [load, setload] = useState(false);

  //hook

  useEffect(() => {
    if (!getDataOnce && internet) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          setData(false);
          let isLogin = store.User.user !== false ? true : false;
          if (isLogin) {
            store.User.getAllData('user');
          } else {
            store.User.getAllData('');
          }
        }
      });
    }
  }, [internet, getDataOnce]);

  useEffect(() => {
    setload(true);
    if (adverBooks.length > 0) {
      let dd = [];
      dd.push({title: 'KleverBook', key: 'item1', data: adverBooks});
      setData(dd);
    } else {
      setData([]);
    }
  }, [adverBooks]);

  useEffect(() => {
    if (data !== false) {
      setTimeout(() => {
        setload(false);
      }, 1000);
    }
    if (data !== false && data.length > 0) {
      setselectedTab(data[0].title);
    }
  }, [data]);

  useEffect(() => {
    if (bookCat.length > 0) {
      let dd = bookCat.slice();
      setCategory(dd);
    }
  }, [bookCat]);

  useEffect(() => {
    if (category.length > 0) {
      let dd = category.slice();
      let ar = [];
      ar.push({section: 'categories', items: dd, isShowMore: false});
      setfilter(ar);
    }
  }, [category]);

  useEffect(() => {
    if (selectedFilter.length > 0) {
      let num = 0;
      selectedFilter.map((e, i, a) => {
        let itm = e.items;
        if (itm.length > 0) {
          num = num + itm.length;
        }
      });
      setnumOfSelFilter(num);
    } else {
      setnumOfSelFilter(0);
    }
  }, [selectedFilter]);

  //method

  const onChangeTab = e => {
    setselectedTab(data[e].title);
  };

  const onPressFilter = () => {
    let selFilter = selectedFilter;

    if (category.length > 0) {
      let dt = category.slice();
      let ar = [];
      if (dt.length > 0) {
        dt.map((e, i, a) => {
          ar.push({name: e.name, isSel: false});
        });
      }

      let arr = [];
      if (ar.length > 0) {
        arr.push({section: 'categories', items: ar, isShowMore: false});
      }

      if (selFilter.length <= 0) {
        setfilter(arr);
        rbSheet2?.current?.open();
        return;
      }

      if (arr.length > 0) {
        arr.map((e, i, a) => {
          if (selFilter.length > 0) {
            selFilter.map((ee, ii, a) => {
              if (e.section == ee.section) {
                let it1 = e.items;
                let it2 = ee.items;

                if (it1.length > 0) {
                  it1.map((eee, iii, a) => {
                    if (it2.length > 0) {
                      it2.map((eeee, iiii, a) => {
                        if (eee.name == eeee.name) {
                          arr[i].items[iii].isSel = true;
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        });
        setfilter(arr);
        rbSheet2?.current?.open();
        return;
      }
    }
  };

  //render

  const renderTab = e => {
    let d = e;

    if (d.name != 'empty') {
      if (selectedFilter.length <= 0) {
        return (
          <utils.BookCard
            data={d}
            nav={props.navigation}
            screen="home"
            toast={toast}
          />
        );
      } else {
        let chk = false;

        selectedFilter.map((e, i, a) => {
          if (e.section == 'categories') {
            e.items.map((e, i, a) => {
              if (e.name == d.book_category.category_name) {
                chk = true;
              }
            });
          }
        });

        if (chk) {
          return (
            <utils.BookCard
              data={d}
              nav={props.navigation}
              screen="home"
              toast={toast}
            />
          );
        }
      }
    }
  };

  const renderHeader = () => {
    const gotoSearch = () => {
      // props.navigation.navigate('Search', {data: foodCategory});
    };

    const gotoHelp = () => {
      // props.navigation.navigate('Help');
    };

    const gotoSetting = () => {
      if (!store.User.user) {
        rbSheet?.current?.open();
        return;
      }
      props.navigation.navigate('Setting');
    };

    const iconColor = 'black';

    return (
      <View
        style={[
          styles.header,
          {
            marginTop:
              internet && tagLine == ''
                ? theme.window.STATUSBAR_HEIGHT + 12
                : 12,
          },
        ]}>
        <View style={{width: 30}} />

        <View style={styles.headerSection2}>
          <TouchableOpacity
            disabled
            onPress={gotoSearch}
            activeOpacity={0.5}
            style={{width: 30, height: 30}}>
            {/* <utils.vectorIcon.AntDesign
              name="search1"
              color={iconColor}
              size={20}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            onPress={gotoHelp}
            activeOpacity={0.5}
            style={{width: 30, height: 30}}>
            {/* <utils.vectorIcon.Feather
              name="help-circle"
              color={iconColor}
              size={20}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={gotoSetting}
            activeOpacity={0.5}
            style={styles.icon}>
            <utils.vectorIcon.AntDesign
              name="user"
              color={iconColor}
              size={22}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderImageSliderBox = () => {
    return (
      <MaskedView
        style={[
          styles.mask,
          {
            height: controlPointY - curveCenterPointY,
          },
        ]}
        maskElement={
          <Svg height="100%" width="100%">
            <Path
              d={`M0 0 L${windowWidth} 0 L${windowWidth} ${maskHeight} Q${controlPointX} ${controlPointY} 0 ${maskHeight} Z`}
              fill={'#fff'}
            />
          </Svg>
        }>
        <Image
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
          }}
          resizeMode="stretch"
          source={coverImage}
        />

        {renderHeader()}
      </MaskedView>
    );
  };

  const renderTitleSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 10,
          marginBottom: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '75%'}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 18,
              fontFamily: theme.fonts.fontMedium,
              color: theme.color.title,
              textTransform: 'capitalize',
              lineHeight: 22,
            }}>
            {store.General.AppName}
          </Text>
        </View>
        {!getBooksLoader &&
          !load &&
          data !== false &&
          data.length > 0 &&
          renderFilter()}
      </View>
    );
  };

  const renderBottomSheet = () => {
    const Login = () => {
      rbSheet?.current?.close();
      props.navigation.navigate('Login', {screen: 'home'});
    };

    const Guest = () => {
      rbSheet?.current?.close();
      props.navigation.goBack();
    };

    const renderLoginButton = () => {
      return (
        <>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Login();
            }}
            style={styles.BottomButton}>
            <Text style={styles.buttonTextBottom}>Login</Text>
          </TouchableOpacity>
        </>
      );
    };

    const renderGuestButton = () => {
      return (
        <>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Guest();
            }}
            style={styles.BottomButton2}>
            <Text style={styles.buttonTextBottom}>Continue as Guest</Text>
          </TouchableOpacity>
        </>
      );
    };

    return (
      <>
        <RBSheet
          ref={rbSheet}
          height={responsiveHeight(35)}
          closeOnPressBack={true}
          openDuration={250}
          screen={''}
          closeOnDragDown={true}
          closeOnPressMask={true}
          KeyboardAvoidingView={true}
          customStyles={{
            wrapper: {
              flex: 1,
              // backgroundColor: 'transparent',
            },
            container: {
              backgroundColor: theme.color.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              elevation: 5,
            },
            draggableIcon: {
              // backgroundColor: theme.color.cartbutton,
            },
          }}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: 15,
              }}>
              <Text
                style={{
                  fontFamily: theme.fonts.fontMedium,
                  color: theme.color.title,
                  fontSize: 18,
                }}>
                Sign up or log in
              </Text>

              <View style={{marginTop: 30}}>
                {renderLoginButton()}

                <Text style={styles.titleText2}>or</Text>
                {renderGuestButton()}
              </View>
            </View>
          </ScrollView>
        </RBSheet>
      </>
    );
  };

  const renderFilterSheet = () => {
    return (
      <>
        <RBSheet
          ref={rbSheet2}
          onOpen={() => {}}
          onClose={() => {}}
          height={responsiveHeight(70)}
          closeOnPressBack={true}
          openDuration={250}
          screen={''}
          closeOnDragDown={true}
          closeOnPressMask={true}
          KeyboardAvoidingView={true}
          customStyles={{
            wrapper: {
              flex: 1,
            },
            container: {
              backgroundColor: theme.color.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              elevation: 5,
            },
          }}>
          <utils.FilterModal
            data={filter}
            cat={category}
            closeSheet={() => {
              rbSheet2?.current?.close();
            }}
            onApply={c => {
              // console.log('filter : ', filter);
              // closeModalFilterSeet();
              // store.General.setselectedFilter(c);
            }}
          />
        </RBSheet>
      </>
    );
  };

  const renderStatusBar = () => {
    if (Platform.OS == 'android') {
      if (internet && tagLine == '') {
        return (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'light-content'}
          />
        );
      } else {
        return (
          <StatusBar
            translucent={false}
            backgroundColor={theme.color.button1}
            barStyle={'dark-content'}
          />
        );
      }
    } else {
      return (
        <StatusBar
          translucent={false}
          backgroundColor={'black'}
          barStyle={'dark-content'}
        />
      );
    }
  };

  const renderFilter = () => {
    let length = numOfSelFilter;

    if (
      (selectedTab == 'KleverBook' &&
        data !== false &&
        data.length > 0 &&
        data[0]) ||
      (selectedTab == 'Downloads' &&
        data != false &&
        data.length > 0 &&
        data[1])
    ) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: '20%',
            alignItems: 'flex-end',
          }}
          onPress={() => {
            onPressFilter();
          }}>
          <Text style={styles.catTitle2}>
            {length > 0 ? `Filter (${length > 99 ? '99+' : length})` : 'Filter'}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View style={{width: '20%'}} />;
    }
  };

  const renderSearchBox = () => {
    return (
      <View
        style={{
          width: 170,
          height: 32,
          backgroundColor: theme.color.background,
          // borderBottomWidth: 1,
          borderWidth: 0,
          borderColor: theme.color.button1,
          position: 'absolute',
          top: 8,
          right: 12,
        }}>
        <TextInput
          selectionColor={theme.color.button1}
          underlineColor={'#dbdbdb'}
          activeUnderlineColor={theme.color.button1}
          placeholder="Search"
          placeholderTextColor={'#c4c4c4'}
          value={search}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.color.background,
            paddingLeft: 20,
            color: theme.color.subTitleLight,
            // backgroundColor: 'red',
          }}
          onChangeText={t => setsearch(t)}
        />
        <utils.vectorIcon.Ionicons
          style={{position: 'absolute', top: 5}}
          name="search"
          color={'#c4c4c4'}
          size={24}
        />
      </View>
    );
  };

  const renderLoaderShow = () => {
    return (
      <View style={styles.emptySECTION33}>
        <ActivityIndicator size={40} color={theme.color.button1} />
      </View>
    );
  };

  const renderEmptyShow = () => {
    return (
      <View style={styles.emptySECTION33}>
        <Image
          style={styles.emptyImg}
          source={require('../../assets/images/empty/img.png')}
        />
        <Text style={styles.emptyText}>Sorry!</Text>
        <Text style={[styles.emptyText, {marginTop: -3}]}>
          Currently no books are available here
        </Text>
      </View>
    );
  };

  const renderShowData = () => {
    return (
      <View style={{flex: 1}}>
        <DynamicTabView
          data={data}
          search={search}
          defaultIndex={0}
          renderTab={renderTab}
          onChangeTab={onChangeTab}
          headerTextStyle={{
            color: theme.color.title,
            fontFamily: theme.fonts.fontMedium,
          }}
          headerBackgroundColor={theme.color.background}
          headerUnderlayColor={theme.color.button1}
          containerStyle={{
            backgroundColor: theme.color.background,
            overflow: 'hidden',
          }}
        />
        {renderSearchBox()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isServerError && <utils.ServerRes />}
      {!internet && <utils.InternetMessage color={theme.color.button1} />}
      <Toast ref={toast} position="bottom" />
      {renderStatusBar()}
      {renderFilterSheet()}
      {renderBottomSheet()}
      <View>
        {renderImageSliderBox()}
        {renderTitleSection()}
      </View>
      {(getBooksLoader || load) && renderLoaderShow()}
      {!getBooksLoader &&
        !load &&
        data !== false &&
        data.length <= 0 &&
        renderEmptyShow()}
      {!getBooksLoader &&
        !load &&
        data !== false &&
        data.length > 0 &&
        renderShowData()}
    </SafeAreaView>
  );
}
