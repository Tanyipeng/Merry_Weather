// components/e_share/cmp.js
Component({
  externalClasses: ['share'],
  /**
   * 组件的属性列表
   */
  properties: {
    isShare: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toSaveImg() {
      wx.showToast({
        title: '抱歉，此功能暂未开放',
        icon: 'none'
      });
      // wx.navigateTo({ url: '/pages/saveImg/saveImg' });
    },

    hideShare() {
      this.triggerEvent('masktap', {});
    }
  }
});
