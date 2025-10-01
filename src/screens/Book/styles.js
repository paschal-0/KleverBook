import {StyleSheet, Platform} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

let padding = 2;
let Contentpadding = 7;
let br = 10;
let height = 4.5;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },

  titleSection: {
    width: '100%',
    marginTop: 15,
  },
  descriptionSection: {
    width: '100%',
    marginTop: 15,
  },
  categorySection: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    width: responsiveWidth(100),
    paddingHorizontal: 15,
    paddingVertical: 7,
    top:
      Platform.OS == 'android'
        ? theme.window.STATUSBAR_HEIGHT + 5
        : theme.window.APPBAR_HEIGHT + 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    // backgroundColor: theme.color.background,
    // elevation: 5,
  },
  icon: {
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    backgroundColor: theme.color.button1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },

  buttomIcon: {
    width: 26,
    height: 26,
    borderRadius: 36 / 2,
    backgroundColor: theme.color.button1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },

  title2: {
    fontSize: 15,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    lineHeight: 17,
    textTransform: 'capitalize',
  },
  icona: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    marginLeft: 10,
  },
  imageConatiner: {
    width: responsiveWidth(100),
    height: responsiveHeight(28),
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
  foodCardTitle1: {
    fontSize: 18,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    textTransform: 'capitalize',
    lineHeight: 22,
  },
  foodCardTitle2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    lineHeight: 18,
  },
  foodCardDetails: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 20,
  },

  foodCardDetailss: {
    fontSize: 18,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    lineHeight: 20,
  },

  catDetails: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 20,
  },

  catDetails2: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 20,
    textTransform: 'capitalize',
  },

  categoryDetails: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    lineHeight: 20,
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
  fullImageModalContainer: {flex: 1, backgroundColor: 'black'},
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
  fullImageModalLoader: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    position: 'absolute',
  },
  fullImageModalImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  addcart2Container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mask: {
    backgroundColor: theme.color.button1,
    width: '100%',
  },
  ButtonText: {
    fontSize: 15,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.buttonText,
    lineHeight: 18,
  },
  cartCountText: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    textTransform: 'capitalize',
    lineHeight: 20,
    textAlign: 'center',
  },

  modalCont: {
    borderRadius: br,
    backgroundColor: theme.color.addcartModalBackground,
    width: responsiveWidth(85),
    alignSelf: 'center',
  },
  modalCont2: {
    borderRadius: br,
    backgroundColor: theme.color.addcartModalBackground,
    width: responsiveWidth(85),
    height: responsiveHeight(50),
    alignSelf: 'center',
  },
  modalHeader: {
    backgroundColor: theme.color.addcartModalHeader,
    borderTopLeftRadius: br,
    borderTopRightRadius: br,
    paddingVertical: padding,
    paddingHorizontal: Contentpadding,
    justifyContent: 'center',
    width: '100%',
  },
  modalHeaderText: {
    color: theme.color.addcartModalHeaderText,
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'uppercase',
  },
  headerSection: {
    padding: Contentpadding,
  },
  headerSection2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSectionText1: {
    color: theme.color.title,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },
  headerSectionText11: {
    color: theme.color.subTitle,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: theme.fonts.fontMedium,

    marginTop: 5,
  },
  headerSectionText2: {
    color: theme.color.addcartModalSubText,
    fontSize: 13,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
    lineHeight: 15,
  },
  selectionHeader: {
    backgroundColor: theme.color.addcartModalHeader,

    paddingVertical: padding,
    paddingHorizontal: Contentpadding,
    justifyContent: 'center',
    width: '100%',
  },
  selectionSection: {
    paddingVertical: padding + 8,
    paddingHorizontal: Contentpadding,
  },
  selectionSection1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  varaintDetailsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    paddingVertical: 7,
  },
  selectionSection2: {
    width: '100%',
    paddingVertical: 15,
    // backgroundColor: 'red',
  },
  selectionSectionText2: {
    color: theme.color.addcartModalButton,
    fontSize: 13,

    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
    lineHeight: 18,
  },
  totalSection: {
    backgroundColor: theme.color.addcartModalTotalBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Contentpadding,
    marginTop: 15,
    width: '100%',
    paddingVertical: padding + 2,
  },
  totalText: {
    color: theme.color.addcartModalButton,
    fontSize: 13,
    fontFamily: theme.fonts.fontMedium,

    textTransform: 'capitalize',
    lineHeight: 18,
  },

  addSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Contentpadding,
    marginTop: 10,
    width: '100%',
    paddingVertical: padding,
    backgroundColor: theme.color.background,
  },

  addSectionTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.addcartModalText,
    lineHeight: 26,
    textTransform: 'capitalize',
    textAlign: 'center',
  },

  modalBottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(height),
    width: '100%',
  },
  modalBottomButton1: {
    width: '40%',
    height: '100%',
    backgroundColor: theme.color.addcartModalHeader,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: br,
  },
  modalBottomButton1Text: {
    color: theme.color.addcartModalHeaderText,
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
  },
  modalBottomButton2: {
    width: '60%',
    height: '100%',

    backgroundColor: '#f27f33',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: br,
  },
  modalBottomButton2Text: {
    color: theme.color.addcartModalButtonText,
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
  },
  chooseButton: {
    width: 64,
    height: 23,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.disableBack,
  },
  chooseButtonText: {
    color: theme.color.subTitle,
    fontSize: 10,
    lineHeight: 12,
    fontFamily: theme.fonts.fontBold,
    textTransform: 'capitalize',
  },

  selectionSectionshow: {},
  selectionSectionshow2: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
  },

  variationDeatlsText: {
    color: theme.color.title,
    fontSize: 13,
    lineHeight: 15,
    fontFamily: theme.fonts.fontMedium,
    textTransform: 'capitalize',
  },

  BottomButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    height: 46,
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
});
