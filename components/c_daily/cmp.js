// components/c_daily/cmp.js
Component({
  externalClasses: ['common'],
  /**
   * 组件的属性列表
   */
  properties: {
    daily_forecast: Array
  },

  attached() {
    const date = new Date();
    const dayIndex = date.getDay();
    const obj = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let dayArr = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        dayArr.push('今天');
      } else if (i === 1) {
        dayArr.push('明天');
      } else {
        const nowDay = obj[(dayIndex + i) % 7];
        dayArr.push(nowDay);
      }
    }
    this.setData({ dayArr });
  },
  /**
   * 组件的初始数据
   */
  data: {
    dayArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});
