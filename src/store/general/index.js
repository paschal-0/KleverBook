import {observable, makeObservable, action} from 'mobx';
import {AppState} from 'react-native';
import {persist} from 'mobx-persist';

class general {
  constructor() {
    makeObservable(this);
  }

  @observable AppName = 'Decade 2 Publishing';
  @observable isServerError = false;
  @observable Loading = true;
  @observable isInternet = false;
  @observable isLocation = false;
  @observable appState = AppState.currentState;
  @persist @observable apiLevel = '';
  @persist @observable appBuildNumber = '';
  @persist @observable appVersionNumber = '';
  @observable selectedFilter = [];

  @action setselectedFilter = obj => {
    this.selectedFilter = obj;
  };

  @action setisServerError = obj => {
    this.isServerError = obj;
  };

  @action setappBuildNumber = obj => {
    this.appBuildNumber = obj;
  };

  @action setappVersionNumber = obj => {
    this.appVersionNumber = obj;
  };

  @action setLoading = obj => {
    this.Loading = obj;
  };

  @action setInternet = obj => {
    this.isInternet = obj;
  };

  @action setLocation = obj => {
    this.isLocation = obj;
  };

  @action.bound
  setapiLevel(val) {
    this.apiLevel = val;
  }

  @action setappState = obj => {
    this.appState = obj;
  };
}
export const General = new general();
