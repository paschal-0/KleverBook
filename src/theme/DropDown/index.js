import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../index';
import color from '../Color/index';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default function DropDown(props) {
  let isSearchBar = props.search || false;
  let c = props.c;
  let absolute = props.absolute || false;

  let Message =
    c == 'timeslots' ? 'No any time slot available' : 'No record found';

  const [data, setData] = useState(props.data);
  const [search, setsearch] = useState('');

  useEffect(() => {
    if (search != '') {
      let Search = search.toLowerCase();
      let searchLength = Search.length;

      let d = [];
      props.data.map((item, i, a) => {
        let n =
          c == 'country'
            ? item.name
            : c == 'state'
            ? item
            : c == 'city'
            ? item.name
            : '';
        var Name = n.toLowerCase();
        let s = Name.substr(0, searchLength);

        if (s == Search) {
          d.push(item);
        }

        if (a.length - 1 == i) {
          setData(d);
          return;
        }
      });
    } else {
      setData(props.data);
    }
  }, [search]);

  const renderSearchBar = () => {
    return (
      <View style={styles.searchBarContainer}>
        <AntDesign name="search1" color={color.subTitle} size={18} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={color.subTitle}
          style={[
            styles.Text,
            {
              width: '92%',
              paddingHorizontal: 10,
            },
          ]}
          onChangeText={t => {
            setsearch(t);
          }}
        />
      </View>
    );
  };

  const rendershowMessage = () => {
    return (
      <View style={styles.emptyMessageConatiner}>
        <Text style={styles.emptyText}>{Message}</Text>
      </View>
    );
  };

  const onClickItem = item => {
    props.onSelectItem(item);
    props.setVisible(false);
  };

  const renderItems = ({item, index}) => {
    let title =
      c == 'country'
        ? item.name
        : c == 'state'
        ? item
        : c == 'city'
        ? item.title
        : '';

    return (
      <TouchableOpacity
        onPress={() => {
          onClickItem(item);
        }}>
        <View
          style={[
            styles.rowContainer,
            {borderBottomWidth: index < data.length - 1 ? 0.7 : 0},
          ]}>
          <Text style={styles.Text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let abs = 0.3;

  const style = {
    height: responsiveHeight(27),
    marginTop: responsiveHeight(c == 'timeslots' ? abs : absolute ? 6.3 : 0.3),
    position: absolute ? 'absolute' : 'relative',
  };

  return (
    <SafeAreaView style={[styles.Container, style]}>
      <KeyboardAvoidingView style={{flex: 1}} enabled>
        {isSearchBar && renderSearchBar()}
        {data.length <= 0 && rendershowMessage()}
        <FlatList
          initialNumToRender={24}
          maxToRenderPerBatch={10}
          data={data}
          nestedScrollEnabled
          renderItem={renderItems}
          keyExtractor={(item, index) => item.title}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

let fontSize = 2;
let bordercolor = color.subTitle;
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    borderColor: bordercolor,
    borderWidth: 0.6,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    zIndex: 999,
    marginBottom: 5,
    elevation: 4,
  },
  searchBarContainer: {
    width: '100%',
    borderBottomWidth: 0.7,
    borderColor: bordercolor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,

    paddingVertical: Platform.OS == 'ios' ? 5 : 0,
  },
  rowContainer: {
    width: '100%',
    paddingVertical: 10,
    borderColor: bordercolor,
    paddingHorizontal: 15,
  },
  Text: {
    color: color.title,
    fontSize: responsiveFontSize(fontSize),
    fontFamily: fonts.fontNormal,
  },
  emptyMessageConatiner: {
    width: '100%',
    paddingVertical: 15,
    borderColor: bordercolor,
    paddingHorizontal: 15,
  },
  emptyText: {
    color: color.subTitle,
    fontSize: responsiveFontSize(fontSize - 0.2),
    fontFamily: fonts.fontNormal,
    textAlign: 'center',
  },
});
