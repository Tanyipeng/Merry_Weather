//index.js
import API from '../../utils/request';

const app = getApp();
const m = new Map();
m.set(/(100)|(900)/, 'sunny')
  .set(/101/, 'cloudy')
  .set(/10[23]/, 'fewCloudy')
  .set(/(104)|(901)/, 'overcast')
  .set(/2(0\d)|(1[0123])/, 'breeze')
  .set(/3(0\d)|(99)/, 'rain')
  .set(/31[012345678]/, 'storm')
  .set(/4(0\d)|(10)|(99)/, 'snow')
  .set(/5(0\d)|(1[012345])/, 'foggy');

Page({
  data: {
    showAll: false,
    lock: false,
    isShare: false,
    basic: {},
    daily_forecast: [],
    hourly: [],
    lifestyle: [],
    now: {},
    loc: '',
    bgImg: ''
  },

  onShareAppMessage(e) {
    return {
      title: '这是一个可爱的天气小程序~',
      imageUrl: '/images/shareImg.jpeg'
    };
  },

  onPullDownRefresh() {
    const { lock } = this.data;
    if (lock) return;
    this._request(true);
  },

  onShow() {
    const globalData = app.globalData;
    if (!globalData.location) return;
    const { lon: longitude, lat: latitude } = globalData;
    const location = `${longitude},${latitude}`;
    this._requestLocation(location).then(res => this._setData(res));
  },

  onLoad() {
    console.log(API);
    app.globalData = {};
    this._request();
  },

  _request(pull = false, defaultLocation = false) {
    pull && this.setData({ lock: true });
    pull && wx.startPullDownRefresh();
    API._getLocation()
      .then(
        location => this._requestLocation(location),
        () => {
          console.log('location error');
          if (defaultLocation) {
            return this._requestLocation('chaoyang,beijing');
          }
          return this.toSetting();
        }
      )
      .then(res => {
        pull && wx.stopPullDownRefresh();
        pull && this.setData({ lock: false });
        if (!res) return;
        return this._setData(res);
      })
      .catch(err => {
        console.error('allWeatherData', err);
        pull && wx.stopPullDownRefresh();
        pull && this.setData({ lock: false });
      });
  },

  _requestLocation(location = '116.40,39.9') {
    app.globalData = {};
    if (!location) return;
    const allWeatherData = API.allWeatherData({ location });
    // const air = API.air({ location });
    return Promise.all([allWeatherData])
      .then(resArr => {
        const flag = resArr.some(item => item);
        return flag && resArr;
      })
      .catch(err => console.error('promiseAll', err));
  },

  _setData(res) {
    if (res[0]) {
      const {
        basic,
        daily_forecast,
        hourly,
        lifestyle,
        now,
        update: { loc }
      } = res[0];
      this.setData({
        basic,
        daily_forecast,
        hourly,
        lifestyle,
        now,
        loc,
        showAll: true
      });
    }
    if (res[1]) {
      const {
        air_now_city: { aqi, qlty }
      } = res[1];
      this.setData({
        aqi,
        qlty,
        showAll: true
      });
    }
    this.getBgImg();
  },

  toSetting() {
    return wx.showModal({
      title: '获取地理位置失败',
      content: '请前往设置打开位置授权哟，未设置默认是北京朝阳~',
      showCancel: false,
      confirmColor: '#3cc51f',
      success: result => {
        if (result.confirm) {
          wx.openSetting({
            success: result => {
              app.globalData = {};
              console.log(result);
              return result.authSetting['scope.userLocation']
                ? this._request()
                : this._request(null, true);
            }
          });
        }
      }
    });
  },

  getBgImg() {
    const { now } = this.data;
    const { cond_code } = now;
    const hour = new Date().getHours();
    let bgImg = '';
    if (!(hour > 6 && hour < 19)) {
      bgImg = 'night';
    } else {
      for (let [key, value] of m) {
        if (key.test(cond_code)) {
          bgImg = value;
          break;
        }
      }
      if (!bgImg) bgImg = 'unknown';
    }
    bgImg = `/images/bgimg/${bgImg}.jpg`;
    this.setData({ bgImg });
    console.log(bgImg);
  },

  showShare() {
    this.setData({ isShare: true });
  },

  hideShare() {
    this.setData({ isShare: false });
  }
});
