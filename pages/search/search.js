// pages/search/search.js
import API from '../../utils/request';
import debounce from '../../utils/debounce';
import formatCity from '../../utils/formatCity';

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isInput: false,
    isFocus: false,
    hasSearch: false,
    hotCityArr: [],
    searchList: [],
    markers: [],
    value: '',
    longitude: '',
    latitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const basic = options.basic ? JSON.parse(options.basic) : {};
    this.search = debounce.call(this, this._search, 1000);
    this.getHotCity();
    this._getL(basic);
  },

  getHotCity() {
    return API.hotCity({
      group: 'cn',
      number: 18
    }).then(res => {
      if (!res) return;
      const hotCityArr = res.basic;
      this.setData({ hotCityArr });
    });
  },

  _getL(basic = {}, showT = false) {
    const {
      admin_area,
      parent_city,
      location,
      lon: longitude,
      lat: latitude
    } = basic;
    const markers = [
      {
        id: 1,
        latitude,
        longitude,
        iconPath: '/images/mark.png',
        width: '80rpx',
        height: '80rpx',
        label: {
          content: formatCity(admin_area, parent_city, location),
          color: '#ffffff',
          fontSize: '24rpx',
          bgColor: '#333333',
          borderRadius: '4rpx',
          padding: '10rpx',
          display: 'ALWAYS',
          textAlign: 'center'
        }
      }
    ];
    this.setData({
      longitude,
      latitude,
      markers
    });
    if (showT) {
      app.globalData = basic;
      wx.showToast({
        title: '天气位置更改成功~',
        icon: 'none'
      });
    }
  },

  // setlongAndla(res = '116.40,39.9') {
  //   const [longitude, latitude] = res.split(',');
  //   this.setData({ longitude, latitude });
  // },

  setInpToBlur() {
    this.setData({
      isFocus: false,
      isInput: false,
      hasSearch: false,
      value: ''
    });
  },

  focus() {
    this.setData({ isFocus: true });
  },

  input(e) {
    const { value, cursor } = e.detail;
    const { value: oldValue } = this.data;
    if (value === oldValue) return;
    cursor
      ? this.setData({ isInput: true })
      : this.setData({ isInput: false, hasSearch: false });
    this.setData({ value });
    this.search(value);
  },

  _search(value) {
    value &&
      API.findCity({
        group: 'cn',
        location: value,
        number: 15
      }).then(res => {
        console.log(res);
        if (!res) return;
        const searchList = res.basic;
        this.setData({ searchList, hasSearch: true });
      });
  },

  clearIpt() {
    this.setData({ value: '', isInput: false, hasSearch: false });
  },

  searchMap(e) {
    const dataset = e.currentTarget.dataset;
    this.setData({ hasSearch: false });
    this._getL(dataset, true);
    this.setInpToBlur();
  }
});
