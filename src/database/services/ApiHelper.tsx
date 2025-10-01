import axios, {AxiosInstance} from 'axios';
import apis from '../apis/index';

let BASE_URL = apis.BASE_URL;
let BASE_URL2 = apis.BASE_URL2;

export const hitApi = (
  endPoint: string,
  reqType: CALL_METHOD,
  params?: any,
  token?: string,
) => {
  let occ: AxiosInstance;
  if (token !== null) {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    occ = axios.create({baseURL: BASE_URL, headers: header});
  } else {
    occ = axios.create({
      baseURL: BASE_URL,
    });
  }
  switch (reqType) {
    case 'get':
      return new Promise((resolve, reject) => {
        occ
          .get(endPoint)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });

    case 'post':
      return new Promise((resolve, reject) => {
        // const credentials = qs.stringify(params);
        occ
          .post(endPoint, params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    case 'put':
      return new Promise((resolve, reject) => {
        occ
          .put(endPoint, params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });

    default:
      break;
  }
};

export const hitApi2 = (
  endPoint: string,
  reqType: CALL_METHOD,
  params?: any,
  token?: string,
) => {
  let occ: AxiosInstance;
  if (token !== null) {
    const header = {
      Authorization: `Bearer ${token}`,
    };

    occ = axios.create({baseURL: BASE_URL2, headers: header});
  } else {
    occ = axios.create({
      baseURL: BASE_URL2,
    });
  }
  switch (reqType) {
    case 'get':
      return new Promise((resolve, reject) => {
        occ
          .get(endPoint)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });

    case 'post':
      return new Promise((resolve, reject) => {
        // const credentials = qs.stringify(params);
        occ
          .post(endPoint, params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    case 'put':
      return new Promise((resolve, reject) => {
        occ
          .put(endPoint, params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });

    default:
      break;
  }
};

export type CALL_METHOD = 'post' | 'get' | 'put';
