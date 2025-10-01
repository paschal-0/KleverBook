import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import theme from '../theme/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import utils from '.';
import ProgressiveFastImage from '@freakycoder/react-native-progressive-fast-image';
import store from '../store/index';
import {observer} from 'mobx-react';
import NetInfo from '@react-native-community/netinfo';
import RBSheet from 'react-native-raw-bottom-sheet';
import StarRating from 'react-native-star-rating';

export default observer(BookCardDownload);
function BookCardDownload(props) {
  const toast = props.toast || null;

  const dt = props.data || [];
  const d = props.book || [];
  let expire = dt.expired || false;
  // console.log("dt : ",dt)
  // console.log("book : ",d)
  let screen = props.screen || '';

  let nav = props.nav;
  let detail = d.book_story || '---';
  let authorName = d.author.name || '';
  let aboutAuthor = d.writer.author_biography || '';

  let name = d.book_title || '';
  let writerName = authorName || 'Gabrielle Zevin';
  let category = d.book_category.category_name || '';
  let rating = 3 || 0;
  let image = d.book_cover
    ? {uri: d.book_cover}
    : require('../assets/images/burger/img.jpeg');
  let imgLoader = require('../assets/images/imgLoader/img.gif');
  const all = props.all || [];

  const gotoReadBook = () => {
    NetInfo.fetch().then(statee => {
      if (statee.isConnected) {
        nav.navigate('Pdf', {dt: dt, d: d, screen: screen});
      } else {
        toast?.current?.show('Please connect internet', 800);
      }
    });
  };

  const sty =
    Platform.OS == 'android'
      ? {
          elevation: 5,
        }
      : {
          shadowColor: '#000',

          shadowOffset: {width: 0, height: 0.5},

          shadowOpacity: 0.6,

          shadowRadius: 1,
        };

  return (
    <>
      <View style={[styles.foodCard, sty]}>
        <View style={styles.foodCardTxtConatiner}>
          <Text style={styles.foodCardTitle1}>{name}</Text>

          <View style={styles.fcBottom}>
            <Text
              style={styles.foodCardTitle2}
              numberOfLines={1}
              ellipsizeMode="tail">
              by <Text style={styles.foodCardTitle22}> {writerName}</Text>
            </Text>
            <Text
              style={styles.foodCardTitle3}
              numberOfLines={1}
              ellipsizeMode="tail">
              {category}
            </Text>
            {!expire && (
              <TouchableOpacity
                onPress={() => {
                  gotoReadBook();
                }}
                style={{
                  width: 60,
                  height: 29,
                  borderRadius: 10,
                  backgroundColor: '#d6d6d6',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.foodCardTitleb}>READ</Text>
              </TouchableOpacity>
            )}
            {expire && (
              <View style={{width: '100%'}}>
                <Text style={[styles.foodCardTitleb, {color: 'red'}]}>
                  Expired
                </Text>
                <Text style={[styles.foodCardTitleb, {color: 'red'}]}>
                  Please download again
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.foodCardImgConatiner}>
          <ProgressiveFastImage
            source={image}
            style={styles.foodCardImg}
            loadingSource={imgLoader}
            loadingImageStyle={styles.ImageLoader}
            // thumbnailSource={image}
            // thumbnailAnimationDuration={2000}
          />
        </View>

        {/* {item > 0 && (
          <View style={styles.section1}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.t1}>
              {item <= 99 ? item : '99+'}
            </Text>
          </View>
        )} */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  foodCard: {
    width: '100%',
    backgroundColor: theme.color.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,

    padding: 5,
    borderRadius: 5,
  },

  foodCardTxtConatiner: {
    width: '60%',
    height: '100%',
    // backgroundColor: 'blue',
  },
  foodCardImgConatiner: {
    width: '40%',
    height: 110,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  foodCardImg: {
    width: 115,
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: theme.color.background,
    // elevation: 3,
  },
  ImageLoader: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },
  foodCardTitle1: {
    fontSize: 15,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 22,
    textTransform: 'capitalize',
  },
  foodCardTitle2: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 17,
  },
  foodCardTitle22: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: 'green',
    lineHeight: 17,
    textTransform: 'capitalize',
  },
  foodCardTitle3: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    lineHeight: 17,

    textTransform: 'capitalize',
  },
  foodCardTitle33: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 17,
  },
  fcBottom: {
    marginTop: 10,
    width: '100%',
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  foodCardTitleb: {
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
  },
  addcart: {
    width: '60%',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: theme.color.button1,
  },
  addcart2Container: {
    width: '50%',
    height: responsiveHeight(3.3),
    // backgroundColor: 'yellow',
    borderRadius: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodCardButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.cartbuttonText,
    lineHeight: 20,
    marginLeft: 3,
  },
  likecart: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },

  section1: {
    borderColor: theme.color.background,
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    top: -2,
    // backgroundColor: theme.color.button1,
    elevation: 3,
    backgroundColor: 'red',
  },
  t1: {
    fontSize: 10,
    color: theme.color.buttonText,

    fontFamily: theme.fonts.fontBold,
    lineHeight: 15,
  },
});
