import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import theme from '../theme/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import utils from '.';
import store from '../store/index';
import {observer} from 'mobx-react';
import Modal from 'react-native-modal';
import Toast from 'react-native-easy-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

export default observer(FilterModal);
function FilterModal(props) {
  let data = props.data.slice();
  let category = props.cat.slice();
  const noi = 5;

  const [filterData, setfilterData] = useState(data);

  const sep = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'silver',
          height: 0.5,
          marginTop: 10,
          alignSelf: 'center',
        }}
      />
    );
  };

  const ClearFilter = () => {
    if (category.length > 0) {
      let dt = category.slice();

      let ar = [];
      if (dt.length > 0) {
        dt.map((e, i, a) => {
          ar.push({name: e.name, isSel: false});
        });
      }

      if (ar.length > 0) {
        let arr = [];
        arr.push({section: 'categories', items: ar, isShowMore: false});
        setfilterData(arr);
      }
    }
  };

  const Apply = () => {
    if (filterData.length > 0) {
      let dt = filterData.slice();

      let ar = [];
      if (dt.length > 0) {
        dt.map((e, i, a) => {
          let section = e.section;
          let items = e.items;
          let isShowMore = false;
          let chk = false;
          let arr = [];

          if (items.length > 0) {
            items.map((ee, ii, aa) => {
              if (ee.isSel) {
                chk = true;
                arr.push(ee);
              }
            });
          }

          if (chk) {
            ar.push({section, isShowMore, items: arr});
          }
        });
      }
      store.General.setselectedFilter(ar);
      props.closeSheet();
    }
  };

  const onPressItem = (sn, si, ii) => {
    if (filterData.length > 0) {
      let d = filterData.slice();
      let chk = d[si].items[ii].isSel;
      d[si].items[ii].isSel = !chk;
      setfilterData(d);
    }
  };

  const onPressViewMore = si => {
    if (filterData.length > 0) {
      let d = filterData.slice();
      let chk = d[si].isShowMore;
      d[si].isShowMore = !chk;
      setfilterData(d);
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{width: '57%', alignItems: 'flex-end'}}>
          <Text style={styles.headerTitle1}>Filter</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            ClearFilter();
          }}
          style={{width: '43%', alignItems: 'flex-end'}}>
          <Text style={styles.headerTitle2}>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderShowItems = (data, sn, si, more) => {
    const g = data.map((e, i, a) => {
      let itemIndex = i;
      let name = e.name;
      let sel = e.isSel;
      let isVeiwMore = more;

      if (i > noi + 1 && !isVeiwMore) {
        return null;
      } else {
        return (
          <>
            {(i <= noi || (i > noi && isVeiwMore)) && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={i => {
                  onPressItem(sn, si, itemIndex);
                }}
                style={styles.itemContainer}>
                <View style={{width: '80%'}}>
                  <Text style={styles.itemTitle}>{name}</Text>
                </View>
                <View style={{width: '15%', alignItems: 'flex-end'}}>
                  <utils.vectorIcon.Octicons
                    size={20}
                    name={sel ? 'check-circle-fill' : 'circle'}
                    color={!sel ? theme.color.subTitle : '#EDAF3A'}
                  />
                </View>
              </TouchableOpacity>
            )}

            {i > noi && !isVeiwMore && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  onPressViewMore(si);
                }}
                style={styles.itemContainerMore}>
                <utils.vectorIcon.AntDesign
                  name={'down'}
                  size={16}
                  color={'#EDAF3A'}
                />

                <View
                  style={{
                    width: '93%',
                  }}>
                  <Text style={[styles.itemTitleMore, {color: '#EDAF3A'}]}>
                    View more ({a.length - (noi + 1)})
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        );
      }
    });

    return g;
  };

  const renderShowCat = ({item, index}) => {
    const e = item;
    const i = index;
    const a = filterData.length;

    let sectionName = e.section || '';
    let items = e.items;
    let isViewMore = e.isShowMore;

    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{sectionName}</Text>
          {items.length > 0 &&
            renderShowItems(items, sectionName, i, isViewMore)}
        </View>
        {i == a.length - 1 && sep()}
      </>
    );
  };

  const renderBottomButton = () => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Apply()}
            style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      {renderHeader()}
      {sep()}
      {filterData.length > 0 ? (
        <KeyboardAvoidingView style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
            data={filterData}
            renderItem={renderShowCat}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
          />
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No record found!</Text>
        </View>
      )}
      {filterData.length > 0 && renderBottomButton()}
    </>
  );
}

let ph = 15;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ph,
  },
  headerTitle1: {
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    fontSize: 18,
  },
  headerTitle2: {
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    fontSize: 15,
  },
  emptyContainer: {
    alignSelf: 'center',
    marginTop: '40%',
  },
  emptyText: {
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    fontSize: 15,
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  itemContainer: {
    // backgroundColor: 'red',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainerMore: {
    // backgroundColor: 'red',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemTitle: {
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    fontSize: 15,
    textTransform: 'capitalize',
  },
  itemTitleMore: {
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    fontSize: 14,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: ph,
    paddingVertical: Platform.OS == 'android' ? 10 : theme.window.APPBAR_HEIGHT,
    elevation: 20,
    backgroundColor: theme.color.background,
  },
  bottomButton: {
    backgroundColor: theme.color.button1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    alignSelf: 'center',

    borderRadius: 10,
  },
  bottomButtonText: {
    color: theme.color.buttonText,
    fontSize: 16,
    fontFamily: theme.fonts.fontNormal,
  },
});
