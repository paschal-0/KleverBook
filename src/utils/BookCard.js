import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
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

export default observer(BookCard);
function BookCard(props) {
  const toast = props.toast || null;
  const d = props.data;
  let pid = d._id;
  let nav = props.nav;

  let detail = d.book_story || '---';
  let authorName = d.author.name || '';
  let aboutAuthor = d.writer.author_biography || '';
  let screen = props.screen || '';

  let name = d.book_title || '';
  let writerName = authorName || 'Gabrielle Zevin';
  let category = d.book_category.category_name || '';
  let rating = 3 || 0;
  let image = d.book_cover
    ? {uri: d.book_cover}
    : require('../assets/images/burger/img.jpeg');
  let imgLoader = require('../assets/images/imgLoader/img.gif');

  const sep = () => {
    return (
      <View
        style={{
          width: responsiveWidth(100),
          alignSelf: 'center',
          height: 1.5,
          backgroundColor: theme.color.subTitle,
          top: 13,
          opacity: 0.1,
        }}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          nav.navigate('Book', {data: d, screen: screen});
        }}
        style={styles.foodCard}>
        <View style={styles.foodCardTxtConatiner}>
          <Text
            style={styles.foodCardTitle1}
            numberOfLines={2}
            ellipsizeMode="tail">
            {name}
          </Text>

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
              {/* <Text style={styles.foodCardTitle33}>{category}</Text> */}
            </Text>
            <View style={{width: '45%', marginTop: 5}}>
              <StarRating
                starSize={16}
                disabled={true}
                maxStars={5}
                fullStarColor={'#EDAF3A'}
                rating={rating}
              />
            </View>
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
      </TouchableOpacity>

      {sep()}
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
    height: 110,
    // backgroundColor: 'red',
  },

  foodCardTxtConatiner: {
    width: '60%',
    height: '100%',
    // backgroundColor: 'blue',
  },
  foodCardImgConatiner: {
    width: '40%',
    height: '100%',
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
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
