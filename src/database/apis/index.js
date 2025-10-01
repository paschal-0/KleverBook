//local link
// const BASE_URL = 'http://192.168.100.18:9000/';

//online link
const BASE_URL = 'http://ec2-3-80-110-152.compute-1.amazonaws.com/';

//default ads link
const BASE_URL2 = 'http://ec2-18-206-55-156.compute-1.amazonaws.com/';

//apis

const GET_DEF_AD = 'defaultAd'; //base url 2
const FORGOT_PASWD = 'user/password/forgot1';
const GET_ALL_CATEGORY = 'category';
const GET_ADVERBOOKS = 'adverbook/approved';
const DOWNLOAD_BOOK = 'adverbook/download';
const GET_SLIDER_IMAGES = 'api/settings';
const GET_FOOD_CATEGORY = 'api/category/getAllCategories?branch=';
const PLACE_ORDER = 'api/orders';
const REGISTER_USER = 'customer/create';
const UPDATE_USER = 'customer/';
const LOGIN_USER = 'user/login';
const IMAGE_UPLOAD = 'api/upload';
const GET_USER_BY_ID = 'user/?_id=';
const GET_ORDERS_BY_USER_ID = 'adverbook/downloadedbooks?user=';
const GET_FAVRT_FOOD_LIST_BY_USER_ID = 'api/orders?customer=';
const GET_ADDRESS_BY_USER_ID = 'api/orders?customer=';
const SET_FAVRT_FOOD_LIST_BY_USER_ID = 'api/orders?customer=';
const REMOVE_FAVRT_FOOD_LIST_BY_USER_ID = 'api/orders?customer=';
const ADD_ADDRESS_BY_USER_ID = 'api/orders?customer=';
const REMOVE_ADDRESS_BY_USER_ID = 'api/orders?customer=';
const CHANGE_PASSWORD = 'user/';
const SUBSCRIBE_TOPIC = 'api/pushnotification/subscribeToTopic';
const CHECK_PROMO = 'api/promocode/checkCodeValidity';
const GET_All_PROMOS_BY_ID = 'api/promocode/getActiveCodes?city=';
const AD_SENT_AMOUNT = 'adverbook/deductamount/view/';

export default apis = {
  BASE_URL,
  BASE_URL2,
  GET_ALL_CATEGORY,
  GET_ADVERBOOKS,
  GET_SLIDER_IMAGES,
  GET_FOOD_CATEGORY,
  PLACE_ORDER,
  REGISTER_USER,
  UPDATE_USER,
  LOGIN_USER,
  IMAGE_UPLOAD,
  GET_USER_BY_ID,
  GET_ORDERS_BY_USER_ID,
  GET_FAVRT_FOOD_LIST_BY_USER_ID,
  GET_ADDRESS_BY_USER_ID,
  SET_FAVRT_FOOD_LIST_BY_USER_ID,
  REMOVE_FAVRT_FOOD_LIST_BY_USER_ID,
  ADD_ADDRESS_BY_USER_ID,
  REMOVE_ADDRESS_BY_USER_ID,
  CHANGE_PASSWORD,
  SUBSCRIBE_TOPIC,
  CHECK_PROMO,
  GET_All_PROMOS_BY_ID,
  DOWNLOAD_BOOK,
  AD_SENT_AMOUNT,
  GET_DEF_AD,
  FORGOT_PASWD,
};
