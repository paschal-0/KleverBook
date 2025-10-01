import {Dimensions, Platform, StatusBar} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export default window = {
  Width,
  Height,
  STATUSBAR_HEIGHT,
  APPBAR_HEIGHT,
};
