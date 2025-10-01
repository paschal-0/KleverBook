import {StyleSheet, Platform} from 'react-native';
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
  section1: {
    marginTop: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveHeight(20),
    resizeMode: 'cover',
  },

  title: {
    fontSize: 30,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    alignSelf: 'center',
    textTransform: 'capitalize',
  },

  title2: {
    fontSize: 17,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginTop: 30,
  },

  title3: {
    fontSize: 14,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    alignSelf: 'center',
    marginTop: 5,
  },
  title4: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
    alignSelf: 'center',
    marginTop: 20,
  },
  title5: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
    alignSelf: 'center',
    marginTop: 5,
  },

  back: {
    width: responsiveWidth(12),
    justifyContent: 'center',
  },
  titleSection: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  descriptionSection: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
  },

  headerSection1: {
    width: '45%',
    // backgroundColor: 'red',
  },
  headerSection2: {
    width: '45%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  title1: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    marginRight: 5,
    textTransform: 'capitalize',
  },

  icon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    marginLeft: 10,
  },
  imageConatiner: {
    width: responsiveWidth(100),
    height: responsiveHeight(34),
    backgroundColor: theme.color.background,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptySECTION: {
    alignSelf: 'center',
    marginTop: '45%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: responsiveWidth(14),
    height: responsiveHeight(7),
    resizeMode: 'contain',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginTop: 0,
  },
  foodCard: {
    width: '100%',
    height: responsiveHeight(20),
    elevation: 7,
    backgroundColor: 'white',
    borderRadius: 7,

    justifyContent: 'center',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  foodCardImg: {
    width: '40%',
    height: '100%',
    elevation: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    // marginBottom: 20,
    // justifyContent: 'center',
  },
  addTitle1: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    marginHorizontal: 15,
    textTransform: 'capitalize',
  },
  addTitle2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    marginLeft: 15,
    marginRight: 5,
  },
  foodCardTitle2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
  },
  foodCardTitle3: {
    fontSize: 18,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
    lineHeight: 20,
  },
  fcBottom: {
    marginTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 20,
    width: '100%',
  },
  foodCardBottom: {
    marginTop: 10,
  },
  addcart: {
    width: '100%',
    height: responsiveHeight(6),
    backgroundColor: theme.color.cartbutton,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  foodCardButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.cartbuttonText,
    lineHeight: 20,
    marginLeft: 5,
  },
  likecart: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },

  section2: {
    padding: 12,
    // backgroundColor: 'yellow',
  },
  section2Title: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
  },
  section2subTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
  },

  section3: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    // backgroundColor: 'yellow',
  },
  section3Title: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
  },
  section3subTitle: {
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
  },

  sectionsTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textTransform: 'uppercase',
  },

  // Input: {
  //   borderBottomWidth: 0.6,
  //   borderColor: theme.color.subTitle,
  //   width: '100%',
  //   height: responsiveHeight(6),
  //   borderRadius: 4,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',

  //   marginTop: 5,
  // },
  CountryLogo: {
    height: 35,
    width: 28,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    top: -1,
    elevation: 5,
  },

  MobileInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.color.title,
    backgroundColor: theme.color.background,
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    height: 46,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: theme.color.subTitleLight,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  MobileInput2: {
    width: '80%',
    color: theme.color.title,

    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    height: 40,
  },

  pswdInput: {
    width: '92%',
    color: theme.color.title,

    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    height: 40,
  },

  Profile: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ProfileImageContainer: {
    width: 100,
    height: 100,
    borderColor: theme.color.subTitle,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  ImageUploadConatiner: {
    height: 30,
    width: 30,
    backgroundColor: '#DBDBDB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    bottom: -2,
    right: -2,
    opacity: 0.9,
    elevation: 5,
  },
  fullImageModalCross: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS == 'ios' ? theme.window.APPBAR_HEIGHT + 12 : 12,
    left: 12,
  },
  header: {
    width: responsiveWidth(100),
    paddingHorizontal: 15,
    backgroundColor: theme.color.background,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textTransform: 'capitalize',
  },
  headerRightTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
  },

  inputFieldConatiner: {marginBottom: 10},
  inputTitle: {
    fontSize: 15,
    lineHeight: 20,
    color: theme.color.title,
    fontFamily: theme.fonts.fontNormal,
    textTransform: 'capitalize',
    marginBottom: 5,
  },

  InputContainerP: {
    paddingVertical: 10,
    borderRadius: 0,
    borderWidth: 0.7,
    borderColor: theme.color.subTitle,
    paddingHorizontal: 10,
  },
  textInputStyleP: {
    color: theme.color.title,
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    textTransform: 'capitalize',
  },

  InputContainer: {
    width: '100%',
    height: 40,
    borderRadius: 0,
    borderWidth: 0.7,
    borderColor: theme.color.subTitle,
    paddingHorizontal: 10,

    alignItems: 'center', //for iso
    justifyContent: 'center', //for ios
  },
  textInputStyle: {
    width: '100%',
    color: theme.color.title,
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    height: '100%',
  },
  textInputStyleCode: {
    color: theme.color.title,
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    left: -5,
    textTransform: 'capitalize',
  },
  textDropDown: {
    color: theme.color.title,
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    lineHeight: 15,
  },

  bottomButton: {
    backgroundColor: theme.color.button1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 0,
  },

  bottomButtonText: {
    color: theme.color.buttonText,
    fontSize: 17,
    fontFamily: theme.fonts.fontNormal,
  },
  inputRightIcon: {},
});
