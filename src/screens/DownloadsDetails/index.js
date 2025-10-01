import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import DynamicTabView from 'react-native-dynamic-tab-view';
import {ActivityIndicator} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import moment from 'moment';

export default observer(DownloadsDetails);
function DownloadsDetails(props) {
  const d = props.route.params.data;

  let contact = store.Food.sliderImages;
  let phone = contact.phone ? '0' + contact.phone : '';

  let internet = store.General.isInternet;
  let orders = store.Orders.orders;
  let loader = store.Orders.loader;
  const [data, setdata] = useState(d);

  const [isShowItems, setisShowItems] = useState(false);
  const [isShowPromo, setisShowPromo] = useState(false);

  let pc = data.promoCode || '';
  let pt = data.promoType || '';
  let pp = data.promoDiscountPercentage || 0;
  let pd = data.promoDiscountAmount || 0;

  let taxprcnt = data.taxpercent || 0;
  let taxPrice = data.tax || 0;
  let subtotal = data.bill || 0;
  let total = data.finalBill || 0;
  let dc = data.deliveryCharges || 0;
  let oid = data.orderId || '';
  let createdAt = data.createdAt;
  let pm = data.paymentMethod || '';
  let status = data.status || '';
  let cart = data.products || [];
  let dType = data.deliveryType || '';
  let address =
    dType == 'delivery'
      ? data.address + ', ' + data.location.address || ''
      : data.address;
  let estimateTime =
    dType == 'delivery'
      ? contact.estimatedDeliveryTime
      : contact.estimatedPickupTime;

  console.log('data : ', data);
  console.log('dc : ', dc);

  const goBack = () => {
    props.navigation.goBack();
  };

  const formateDateTime = d => {
    var tt = moment(d).format('hh:mm a');
    var dd = moment(d).format('DD-MM-Y');
    return dd + ', ' + tt;
  };

  const sep = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'silver',
          height: 0.6,
          alignSelf: 'center',
        }}
      />
    );
  };

  const sepVar = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'silver',
          height: 0.6,
          marginVertical: 7,
          alignSelf: 'center',
        }}
      />
    );
  };

  const renderVaR = vart => {
    const valueArr = vart.map(item => {
      return item.variant;
    });

    let uniqueArray = valueArr.filter(function (item, pos) {
      return valueArr.indexOf(item) == pos;
    });

    let farr = [];
    if (uniqueArray.length > 0) {
      uniqueArray.map((e, i, a) => {
        let baseVar = e;
        let value = '';

        if (vart.length > 0) {
          vart.filter(function (item) {
            if (item.variant.toLowerCase() === baseVar.toLowerCase()) {
              value = value + item.value + ', ';
            }
          });
        }

        let v = value.replace(/,\s*$/, '');
        farr.push({variant: baseVar, value: v});
      });
    }

    const v = farr.map((e, i, a) => {
      let BaseVar = e.variant;
      let Value = e.value;

      return (
        <>
          <View style={{marginTop: 3, flexDirection: 'row'}}>
            <Text
              style={{
                textTransform: 'capitalize',
                fontFamily: theme.fonts.fontMedium,
                fontSize: 12,
                color: theme.color.title,
              }}>
              {BaseVar}:{' '}
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.fontNormal,
                fontSize: 12,
                color: theme.color.subTitle,
              }}>
              {Value}
            </Text>
          </View>
        </>
      );
    });

    return v;
  };

  const renderShowItem = () => {
    const f = cart.map((e, i, a) => {
      console.log('e : ', e);

      let index = i;
      let ItemName = e.productName;
      // let firstPrice = e.firstBill || e.price;
      let totalPrice = parseFloat(e.totalprice) || 0;
      let ItemDesc = e.productId.description || '---';
      let quantity = e.quantity;
      let vartns = e.variants;

      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: i == 0 ? 10 : 0,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '77%',
              }}>
              <Text
                style={{
                  fontFamily: theme.fonts.fontMedium,
                  fontSize: 13,
                  color: theme.color.title,
                }}>
                {quantity} x{'  '} {ItemName}
              </Text>
              <Text
                style={{
                  fontFamily: theme.fonts.fontNormal,
                  fontSize: 13,
                  color: theme.color.subTitle,
                }}>
                {ItemDesc}
              </Text>
              {vartns.length > 0 && renderVaR(vartns)}
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontFamily: theme.fonts.fontMedium,
                  fontSize: 12,
                  color: theme.color.title,
                }}>
                {totalPrice.toFixed()}
              </Text>
            </View>
          </View>

          {i < a.length - 1 && sepVar()}
        </>
      );
    });

    return f;
  };

  const onPressPhone = () => {
    if (phone != '') {
      Linking.openURL(`tel:${phone}`);
    }
  };

  let txt =
    dType == 'delivery' ? 'Estimated delivery time' : 'Estimated pick up time';
  return (
    <SafeAreaView style={styles.container}>
      {!internet && <utils.InternetMessage />}
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
            <utils.vectorIcon.Ionicons
              name="chevron-back"
              color={theme.color.title}
              size={26}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.htitle}>Orders</Text>
      </View>

      {data && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainSec}>
            <View style={{padding: 12}}>
              {status !== 'delivered' && status !== 'cancelled' && (
                <>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      lineHeight: 15,
                      fontFamily: theme.fonts.fontBold,
                      color: theme.color.subTitleLight,
                    }}>
                    {txt}
                  </Text>

                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      lineHeight: 24,
                      fontFamily: theme.fonts.fontBold,
                      color: theme.color.subTitle,
                      marginTop: 10,
                    }}>
                    {estimateTime} min
                  </Text>

                  <Image
                    style={styles.dimg}
                    source={require('../../assets/images/delivery/img.png')}
                  />
                </>
              )}

              {status == 'cancelled' ? (
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: 'red',
                    fontFamily: theme.fonts.fontMedium,
                    textTransform: 'capitalize',
                  }}>
                  {status}
                </Text>
              ) : (
                <>
                  {dType == 'delivery' ? (
                    <utils.StatusIndicator
                      data={[
                        'order accepted',
                        'preparing food',
                        'picked up by rider',
                        'delivered',
                      ]}
                      status={status}
                    />
                  ) : (
                    <utils.StatusIndicatorR
                      data={[
                        'order accepted',
                        'preparing food',
                        'ready to pick up',
                        'picked up',
                      ]}
                      status={status}
                    />
                  )}
                </>
              )}
            </View>
            {sep()}
            <View style={{padding: 12}}>
              <Text style={styles.sectionsTitle}>helpline</Text>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  onPressPhone();
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <utils.vectorIcon.Feather
                  name="phone-call"
                  color={'green'}
                  size={25}
                />

                <Text
                  style={{
                    fontSize: 13,
                    color: 'green',
                    fontFamily: theme.fonts.fontMedium,
                    marginLeft: 10,
                  }}>
                  {phone}
                </Text>
              </TouchableOpacity>
            </View>
            {sep()}
            <View style={{padding: 12}}>
              <Text style={styles.sectionsTitle}>Order details</Text>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    width: '37%',
                    fontSize: 12,
                    lineHeight: 15,
                    color: theme.color.subTitle,
                    fontFamily: theme.fonts.fontMedium,
                    textTransform: 'uppercase',
                  }}>
                  order number
                </Text>

                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 15,
                      color: theme.color.subTitleLight,
                      fontFamily: theme.fonts.fontMedium,

                      textTransform: 'uppercase',
                    }}>
                    {oid}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    width: '37%',
                    fontSize: 12,
                    lineHeight: 15,
                    color: theme.color.subTitle,
                    fontFamily: theme.fonts.fontMedium,
                    textTransform: 'uppercase',
                  }}>
                  date
                </Text>

                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 15,
                      color: theme.color.subTitleLight,
                      fontFamily: theme.fonts.fontMedium,

                      textTransform: 'uppercase',
                    }}>
                    {formateDateTime(createdAt)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    width: '37%',
                    fontSize: 12,
                    lineHeight: 15,
                    color: theme.color.subTitle,
                    fontFamily: theme.fonts.fontMedium,
                    textTransform: 'uppercase',
                  }}>
                  address
                </Text>

                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 15,
                      color: theme.color.subTitleLight,
                      fontFamily: theme.fonts.fontMedium,

                      textTransform: 'uppercase',
                    }}>
                    {address}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 7,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    width: '37%',
                    fontSize: 12,
                    lineHeight: 15,
                    color: theme.color.subTitle,
                    fontFamily: theme.fonts.fontMedium,
                    textTransform: 'uppercase',
                  }}>
                  payment method
                </Text>

                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '60%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 15,
                      color: theme.color.subTitleLight,
                      fontFamily: theme.fonts.fontMedium,

                      textTransform: 'uppercase',
                    }}>
                    {pm}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mainSec}>
            <View style={{padding: 12}}>
              <TouchableOpacity
                onPress={() => setisShowItems(!isShowItems)}
                activeOpacity={0.5}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.sectionsTitle}>Items</Text>
                <utils.vectorIcon.AntDesign
                  name={!isShowItems ? 'down' : 'up'}
                  color={theme.color.subTitle}
                  size={17}
                />
              </TouchableOpacity>

              {cart.length > 0 && isShowItems && renderShowItem()}
            </View>
          </View>

          {pc != '' && (
            <View style={styles.mainSec}>
              <View style={{padding: 12}}>
                <TouchableOpacity
                  onPress={() => setisShowPromo(!isShowPromo)}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.sectionsTitle}>Promo</Text>
                  <utils.vectorIcon.AntDesign
                    name={!isShowItems ? 'down' : 'up'}
                    color={theme.color.subTitle}
                    size={17}
                  />
                </TouchableOpacity>
                {isShowPromo && (
                  <View>
                    <View
                      style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          width: '37%',
                          fontSize: 12,
                          lineHeight: 15,
                          color: theme.color.subTitle,
                          fontFamily: theme.fonts.fontMedium,
                          textTransform: 'uppercase',
                        }}>
                        code
                      </Text>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          width: '60%',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 15,
                            color: theme.color.subTitleLight,
                            fontFamily: theme.fonts.fontMedium,
                          }}>
                          {pc}
                        </Text>
                      </View>
                    </View>

                    {/* <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          width: '37%',
                          fontSize: 12,
                          lineHeight: 15,
                          color: theme.color.subTitle,
                          fontFamily: theme.fonts.fontMedium,
                          textTransform: 'uppercase',
                        }}>
                        type
                      </Text>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          width: '60%',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 15,
                            color: theme.color.subTitleLight,
                            fontFamily: theme.fonts.fontMedium,

                            textTransform: 'capitalize',
                          }}>
                          {pt}
                        </Text>
                      </View>
                    </View> */}

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          width: '37%',
                          fontSize: 12,
                          lineHeight: 15,
                          color: theme.color.subTitle,
                          fontFamily: theme.fonts.fontMedium,
                          textTransform: 'uppercase',
                        }}>
                        discount
                      </Text>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          width: '60%',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 15,
                            color: theme.color.subTitleLight,
                            fontFamily: theme.fonts.fontMedium,

                            textTransform: 'uppercase',
                          }}>
                          {pp} %
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          width: '37%',
                          fontSize: 12,
                          lineHeight: 15,
                          color: theme.color.subTitle,
                          fontFamily: theme.fonts.fontMedium,
                          textTransform: 'uppercase',
                        }}>
                        Amount
                      </Text>

                      <View
                        style={{
                          alignItems: 'flex-end',
                          width: '60%',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 15,
                            color: theme.color.subTitleLight,
                            fontFamily: theme.fonts.fontMedium,
                          }}>
                          Rs. {pd}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          <View style={[styles.mainSec, {marginBottom: 0}]}>
            <View style={{padding: 12}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.sectionsTitle}>Subtotal</Text>
                <Text style={styles.sectionsTitle}>{subtotal}</Text>
              </View>
              {pc != '' && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.section3subTitle}>promo discount</Text>
                  <Text style={styles.section3subTitle}>- {pd}</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.section3subTitle}>Tax ({taxprcnt}%)</Text>
                <Text style={styles.section3subTitle}>{taxPrice}</Text>
              </View>

              {dc > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.section3subTitle}>Delivery charges</Text>
                  <Text style={styles.section3subTitle}>{dc}</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.section3subTitle}>Total (inc. Tax)</Text>
                <Text style={styles.section3subTitle}>{total.toFixed()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
