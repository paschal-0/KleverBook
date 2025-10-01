import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';
import store from '../index';
import NetInfo from '@react-native-community/netinfo';
import db from '../../database/index';
import {Alert} from 'react-native';

class promos {
  constructor() {
    makeObservable(this);
  }

  @observable loader = false;

  @observable promos = [];

  @action setloader = obj => {
    this.loader = obj;
  };

  @action setpromos = obj => {
    this.promos = obj;
  };

  @action.bound
  getPromoById() {
    if (store.User.location) {
      this.setloader(true);
      console.log(
        'api : ',
        db.apis.GET_All_PROMOS_BY_ID + store.User.location.city._id,
      );
      db.hitApi(
        db.apis.GET_All_PROMOS_BY_ID + store.User.location.city._id,
        'get',
        null,
        store.User.authToken,
      )
        ?.then((resp: any) => {
          console.log(
            `response  ${db.apis.GET_All_PROMOS_BY_ID} : `,
            resp.data,
          );
          this.setloader(false);
          this.setpromos(resp.data.data);
        })
        .catch(err => {
          this.setloader(false);
          let msg = err.response.data.message || err.response.status;
          console.log(`Error in ${db.apis.GET_All_PROMOS_BY_ID} : `, msg);
          if (msg == 503 || msg == 500) {
            store.General.setisServerError(true);
            return;
          }

          if (msg == 'No records found') {
            this.setpromos([]);
            return;
          }

          Alert.alert('', msg);
        });
    }
  }
}

export const Promos = new promos();
