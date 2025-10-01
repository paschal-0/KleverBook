import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.color.background,
  },
  header: {
    width: responsiveWidth(100),
    paddingHorizontal: 15,
    marginTop: theme.window.STATUSBAR_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  headerSection1: {
    // width: '15%',
  },
  headerSection2: {
    width: '45%',
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  title1: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    marginRight: 5,
  },

  title2: {
    fontSize: 15,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    lineHeight: 17,
    textTransform: 'capitalize',
  },
  icon: {
    width: 33,
    height: 33,
    borderRadius: 33 / 2,
    backgroundColor: theme.color.button1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginLeft: 10,
    borderColor: theme.color.background,
    borderWidth: 1,
  },
  imageGif: {
    width: responsiveWidth(100),
    height: responsiveHeight(22),
    resizeMode: 'cover',
    elevation: 5,
  },
  emptySECTION: {
    top: '45%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  emptySECTION33: {
    top: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  emptySECTION2: {
    alignSelf: 'center',
    marginTop: '45%',

    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: responsiveWidth(12),
    height: responsiveHeight(5),
    resizeMode: 'contain',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginTop: 0,
  },

  image: {
    flex: 1,
    resizeMode: 'stretch',
  },

  mask: {
    backgroundColor: theme.color.button1,
    width: '100%',
  },
  BottomButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 3,
  },
  buttonTextBottom: {
    color: theme.color.buttonText,
    fontSize: 16,
    fontFamily: theme.fonts.fontNormal,
    lineHeight: 20,
    // textTransform: 'capitalize',
  },
  LinearGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomButton2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: theme.color.background,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.button1,
  },
  LinearGradient2: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginVertical: 10,
  },
  titleText3: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
  },

  catTitle1: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
  },
  catTitle2: {
    fontSize: 13,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },
});
