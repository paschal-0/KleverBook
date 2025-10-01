import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';
import store from '../index';
import NetInfo from '@react-native-community/netinfo';
import db from '../../database/index';
import {Alert} from 'react-native';

class downloads {
  constructor() {
    makeObservable(this);
  }

  @observable loader = false;
  @observable loader2 = false;

  @persist('object') @observable data = [];
  @persist('object') @observable pList = [];

  @persist('object') @observable defaultAd = [];

  @action setpList = obj => {
    this.pList = obj;
  };

  @action setdefaultAd = obj => {
    this.defaultAd = obj;
  };

  @action setloader = obj => {
    this.loader = obj;
  };

  @action setloader2 = obj => {
    this.loader2 = obj;
  };

  @action setdata = obj => {
    this.data = obj;
  };

  @action.bound
  getDefaultAD() {
    db.hitApi2(db.apis.GET_DEF_AD, 'get', null, null)
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.GET_DEF_AD} : `, resp.data);
        let data = resp.data.data[0] || [];
        this.setdefaultAd(data);
      })
      .catch(err => {
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_DEF_AD} : `, msg);
        // if (msg == 503 || msg == 500) {
        //   store.General.setisServerError(true);
        //   return;
        // }

        // if (msg == 'No records found') {

        //   return;
        // }

        // Alert.alert('', msg.toString());
      });
  }

  @action.bound
  getDataById() {
    this.setloader(true);
    // console.log(db.apis.GET_ORDERS_BY_USER_ID + store.User.user.user._id);
    db.hitApi(
      db.apis.GET_ORDERS_BY_USER_ID + store.User.user._id,
      'get',
      null,
      store.User.authToken,
    )
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.GET_ORDERS_BY_USER_ID} : `, resp.data);
        this.setloader(false);
        this.setdata(resp.data.data);
      })
      .catch(err => {
        this.setloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ORDERS_BY_USER_ID} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        if (msg == 'No records found') {
          this.setdata([]);
          return;
        }

        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  DownloadBook(book, funCal) {
    this.setloader2(true);

    let body = {
      adverbook: book,
      user: store.User.user._id,
      book: book._id,
    };
    console.log(db.apis.DOWNLOAD_BOOK);
    console.log('body : ', body);
    db.hitApi(db.apis.DOWNLOAD_BOOK, 'post', body, store.User.authToken)
      ?.then((resp: any) => {
        this.setloader2(false);
        console.log(`response  ${db.apis.DOWNLOAD_BOOK} : `, resp.data);
        funCal();
      })
      .catch(err => {
        this.setloader2(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.DOWNLOAD_BOOK} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  adSentAmount(data, id) {
    let did = id;
    const body = {ad: data};

    console.log(db.apis.AD_SENT_AMOUNT + did);
    console.log('body : ', body);

    db.hitApi(db.apis.AD_SENT_AMOUNT + did, 'post', body, store.User.authToken)
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.AD_SENT_AMOUNT} : `, resp.data);
      })
      .catch(err => {
        // let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.AD_SENT_AMOUNT} : `, err);
        // if (msg == 503 || msg == 500) {
        //   store.General.setisServerError(true);
        //   return;
        // }

        // console.warn("err : ",msg.toString())
        // Alert.alert('', msg.toString());
      });
  }
}

export const Downloads = new downloads();
