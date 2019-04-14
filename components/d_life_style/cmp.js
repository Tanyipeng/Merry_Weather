// components/d_life_style/cmp.js
Component({
  externalClasses: ['common'],
  /**
   * 组件的属性列表
   */
  properties: {
    lifestyle: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    map: {
      comf: '舒适度指数',
      cw: '洗车指数',
      drsg: '穿衣指数',
      flu: '感冒指数',
      sport: '运动指数',
      trav: '旅游指数',
      uv: '紫外线指数',
      air: '空气污染扩散条件指数',
      ac: '空调开启指数',
      gi: '太阳镜指数',
      mu: '化妆指数',
      airc: '晾晒指数',
      ptfc: '交通指数',
      fsh: '钓鱼指数',
      spl: '防晒指数'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});
