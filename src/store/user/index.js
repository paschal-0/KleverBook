import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';
import store from '../index';
import NetInfo from '@react-native-community/netinfo';
import db from '../../database/index';
import {Alert} from 'react-native';
// import carStore from '../index';
// import NotificationManager from '../index';
// import db from '../../database/index';
// import utils from '../../utils';
// import store from '../index';
// import auth from '@react-native-firebase/auth';

class user {
  constructor() {
    makeObservable(this);
  }

  @observable cart = {totalbill: 0, totalitems: 0, data: []};
  @observable isAddModal = false;
  @observable isVarModal = false;
  @observable isSubModal = false;
  @observable isChkLoginModal = false;

  @observable loader = false;
  @observable fploader = false;
  @observable fvrtloader = false;
  @observable adrsloader = false;
  @observable loginLoader = false;
  @observable regLoader = false;

  @persist('object') @observable location = false; //set  delivery adress location
  @observable cl = false; //curemt location
  @observable rl = false; //curemt resturant location
  @persist('object') @observable user = false;
  @persist('object') @observable polygons = [];

  @persist('object') @observable fvrtList = [];
  @persist('object') @observable adrsList = [];

  @persist('object') @observable adverBooks = [];
  @persist('object') @observable bookCat = [];

  @observable AdverbookLoader = false;
  @observable catLoader = false;

  @observable online = false;
  @observable notificationToken = '';
  @persist @observable authToken = '';

  @observable isGetAllDatainSplash = false;
  @observable total = 0; //total uploaded image length
  @observable done = 0; //done uloaded image counter
  @observable isAllImageUploadDone = false;

  @action setloginLoader = obj => {
    this.loginLoader = obj;
  };

  @action setregLoader = obj => {
    this.regLoader = obj;
  };

  @action setadverBooks = obj => {
    this.adverBooks = obj;
  };

  @action setbookCat = obj => {
    this.bookCat = obj;
  };

  @action setAdverbookLoader = obj => {
    this.AdverbookLoader = obj;
  };

  @action setcatLoader = obj => {
    this.catLoader = obj;
  };

  @action setLoader = obj => {
    this.loader = obj;
  };

  @action setfpLoader = obj => {
    this.fploader = obj;
  };

  @action.bound
  setisGetAllDatainSplash(val) {
    this.isGetAllDatainSplash = val;
  }

  @action.bound
  addnotificationToken(n) {
    this.notificationToken = n;
  }

  addUser(token, user) {
    console.log('add user : ', token, user);
    this.addauthToken(token);
    this.setUser(user);
    return;
  }

  setUser(user) {
    this.user = user;
    return;
  }

  @action.bound
  addauthToken(n) {
    this.authToken = n;
  }

  @action.bound
  getAllData = c => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        console.log('get all  data  : ', c);

        if (c == 'user') {
          this.attemptToGetUser();
        }

        // this.attemptToSubTopic();
        this.getAdverBooks();
        this.getBooksCat();
        store.Downloads.getDefaultAD();
      }
    });
  };

  @action.bound
  getAdverBooks() {
    this.setAdverbookLoader(true);
    db.hitApi(db.apis.GET_ADVERBOOKS, 'get', null, null)
      ?.then((resp: any) => {
        this.setAdverbookLoader(false);
        console.log(`response  ${db.apis.GET_ADVERBOOKS} : `, resp.data.data);
        this.setadverBooks(resp.data.data);
        this.setisGetAllDatainSplash(true);
      })
      .catch(err => {
        this.setAdverbookLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ADVERBOOKS} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  getBooksCat() {
    this.setcatLoader(true);
    db.hitApi(db.apis.GET_ALL_CATEGORY, 'get', null, null)
      ?.then((resp: any) => {
        this.setcatLoader(false);
        console.log(`response  ${db.apis.GET_ALL_CATEGORY} : `, resp.data.data);
        let dt = resp.data.data;
        let ar = [];
        if (dt.length > 0) {
          dt.map((e, i, a) => {
            ar.push({name: e.category_name, isSel: false});
          });
        }
        this.setbookCat(ar);
      })
      .catch(err => {
        this.setcatLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ALL_CATEGORY} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  attemptToGetUser() {
    db.hitApi(
      db.apis.GET_USER_BY_ID + this.user.user._id,
      'get',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.GET_USER_BY_ID} : `, resp.data);
        let data = resp.data.data[0] || [];

        if (data.isActive) {
          let u = {...this.user};
          u.user[data];
          this.setUser(u);
        } else {
          Alert.alert(
            '',
            'Sorry, you account is inactive. Please contact customer support.',
            [{text: 'OK', onPress: () => this.Logout('')}],
          );
        }
      })
      .catch(err => {
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_USER_BY_ID} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        Alert.alert('', msg);
      });
  }

  @action.bound
  attemptToLogin(body, calFunc) {
    this.setloginLoader(true);

    db.hitApi(db.apis.LOGIN_USER, 'post', body, null)
      ?.then((resp: any) => {
        this.setloginLoader(false);
        console.log(`response  ${db.apis.LOGIN_USER} : `, resp.data);
        let data = resp.data.data;
        let token = resp.data.token;
        this.addUser(token, data);

        calFunc();
      })
      .catch(err => {
        this.setloginLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.LOGIN_USER} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  registerUser(body, funCal) {
    this.setregLoader(true);
    db.hitApi(db.apis.REGISTER_USER, 'post', body, null)
      ?.then(resp => {
        this.setregLoader(false);
        console.log(`response  ${db.apis.REGISTER_USER} : `, resp.data);
        let data = resp.data.data;
        let token = resp.data.token;
        this.addUser(token, data);
        funCal();
      })
      .catch(err => {
        this.setregLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.REGISTER_USER} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  updateUser(body, funCall) {
    this.setregLoader(true);
    db.hitApi(db.apis.UPDATE_USER + this.user._id, 'put', body, this.authToken)
      ?.then(resp => {
        this.setregLoader(false);
        console.log(`response  ${db.apis.UPDATE_USER} : `, resp.data);
        let data = resp.data.data;
        // let token = resp.data.token;
        this.setUser(data);
        funCall();
      })
      .catch(err => {
        this.setregLoader(false);
        console.log(`Error in ${db.apis.UPDATE_USER} : `, err);
        //   let msg = err.response.data.message || err.response.status;
        //   console.log(`Error in ${db.apis.UPDATE_USER} : `, msg);
        //   if (msg == 503 || msg == 500) {
        //     store.General.setisServerError(true);
        //     return;
        //   }
        //   Alert.alert('', msg.toString());
      });
  }

  @action.bound
  ChangePassword(cp, np, suc) {
    this.setLoader(true);
    let body = {
      _id: this.user.user._id,
      curr_pass: cp,
      new_pass: np,
    };

    db.hitApi(
      db.apis.CHANGE_PASSWORD + this.user.user._id + '/password/change',
      'put',
      body,
      this.authToken,
    )
      ?.then(resp => {
        this.setLoader(false);
        console.log(`response  ${db.apis.CHANGE_PASSWORD} : `, resp.data);
        suc();
      })
      .catch(err => {
        this.setLoader(false);

        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.CHANGE_PASSWORD} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  forgotPassword(body, suc) {
    this.setfpLoader(true);

    db.hitApi(db.apis.FORGOT_PASWD, 'put', body, null)
      ?.then(resp => {
        this.setfpLoader(false);
        console.log(`response  ${db.apis.FORGOT_PASWD} : `, resp.data);
        suc();
      })
      .catch(err => {
        this.setfpLoader(false);

        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.FORGOT_PASWD} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  // @action.bound
  Logout(goHome) {
    this.authToken = '';

    store.Downloads.setdata([]);
    store.Downloads.setpList([]);
    store.Downloads.setdefaultAd([]);

    this.setUser(false);
    if (goHome != '') {
      goHome();
    }
  }
}

export const User = new user();
