import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';
import store from '../index';
import NetInfo from '@react-native-community/netinfo';
import db from '../../database/index';
import {Alert} from 'react-native';

class food {
  constructor() {
    makeObservable(this);
  }

  @observable selectedProduct = [];
  @observable selectedvariationDetail = [];

  @observable variations = [];

  @observable loader = false;
  @observable getDataOnce = false;
  @persist('object') @observable food = [];
  @persist('object') @observable sliderImages = [];

  @action setselectedProduct = obj => {
    this.selectedProduct = obj;
  };
  @action setselectedvariationDetail = obj => {
    this.selectedvariationDetail = obj;
  };

  @action setloader = obj => {
    this.loader = obj;
  };

  @action setvariations = obj => {
    this.variations = obj;
  };

  @action setgetDataOnce = obj => {
    this.getDataOnce = obj;
  };

  @action setfood = obj => {
    this.food = obj;
  };

  @action setsliderImages = obj => {
    this.sliderImages = obj;
  };

  @action.bound
  getSliderImagesOnly() {
    db.hitApi(db.apis.GET_SLIDER_IMAGES, 'get', null, null)
      ?.then((resp: any) => {
        console.log(
          `response  ${db.apis.GET_SLIDER_IMAGES} Only : `,
          resp.data[0],
        );

        this.setsliderImages(resp.data[0]);
      })
      .catch(err => {
        console.log(`Error in ${db.apis.GET_SLIDER_IMAGES}  Only : `, err);
      });
  }

  @action.bound
  getSliderImages(city) {
    this.setloader(true);

    db.hitApi(db.apis.GET_SLIDER_IMAGES, 'get', null, null)
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.GET_SLIDER_IMAGES} : `, resp.data[0]);
        this.getFoofCatwithProducts(city);
        this.setsliderImages(resp.data[0]);
      })
      .catch(err => {
        console.log(`Error in ${db.apis.GET_SLIDER_IMAGES} : `, err);
        this.setloader(false);
      });
  }

  @action.bound
  getFoofCatwithProducts(city) {
    db.hitApi(db.apis.GET_FOOD_CATEGORY + city._id, 'get', null, null)
      ?.then((resp: any) => {
        console.log(
          `response  ${db.apis.GET_FOOD_CATEGORY} : `,
          resp.data.data,
        );
        this.setfood(resp.data.data);
        this.setgetDataOnce(true);
        this.setloader(false);
      })
      .catch(err => {
        this.setloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_FOOD_CATEGORY} : `, msg);

        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        if (msg == 'No records found') {
          this.setfood([]);
          return;
        }

        Alert.alert('', msg);
      });
  }
}

export const Food = new food();
