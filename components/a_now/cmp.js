// components/a_now/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    basic: Object,
    now: Object,
    update: String,
    aqi: String,
    qlty: String,
    bgImg: String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toSearch() {
      const basic = JSON.stringify(this.data.basic);
      wx.navigateTo({ url: '../../pages/search/search?basic=' + basic });
    }
  }
});
