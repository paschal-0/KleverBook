import {Platform, StyleSheet} from 'react-native';
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
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top:
      Platform.OS == 'android'
        ? theme.window.STATUSBAR_HEIGHT
        : theme.window.APPBAR_HEIGHT + 10,
    left: 15,
    right: 15,
  },
  title1: {
    fontSize: 20,
    fontFamily: theme.fonts.fontBold,
    color: 'white',
    alignSelf: 'center',
  },
  title2: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: theme.fonts.fontBold,
    color: 'white',
    alignSelf: 'center',
  },
});
