const options = {
  allWeatherData: 'https://free-api.heweather.net/s6/weather',
  air: 'https://free-api.heweather.net/s6/air/now',
  findCity: 'https://search.heweather.net/find',
  hotCity: 'https://search.heweather.net/top'
};

const _key = '41e9053b72b84c1d9dc5de628411a634';

class Request {
  constructor(opts = {}, _key = '41e9053b72b84c1d9dc5de628411a634') {
    Object.keys(opts).forEach(key => {
      this[key] = (data = {}, method = 'GET') => {
        data['key'] = _key;
        return this._request(opts[key], method, data)
          .then(res => {
            if (res) {
              if (res.statusCode === 200) {
                const resData =
                  res.data && res.data.HeWeather6 && res.data.HeWeather6[0];
                if (resData && resData.status === 'ok') {
                  return resData;
                } else {
                  return wx.showToast({
                    title: (resData && resData.status) || '请求错误',
                    icon: 'none'
                  });
                }
              }
              return wx.showToast({
                title: (res.errMsg && res.errMsg) || '请求错误',
                icon: 'none'
              });
            } else {
              return wx.showToast({
                title: '请求错误',
                icon: 'none'
              });
            }
          })
          .catch(err => {
            console.error(key, err);
          });
      };
    });
  }

  _request(url = '', method = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      wx.request({
        url,
        method,
        data,
        success: resolve,
        fail: reject,
        complete() {
          wx.hideLoading();
        }
      });
    });
  }

  _getLocation(type = 'wgs84') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.getLocation({
          type,
          success(res) {
            const { latitude, longitude } = res;
            const location = `${longitude},${latitude}`;
            resolve(location);
          },
          fail: reject
        });
      }, 50);
    });
  }
}

const API = new Request(options, _key);

export default API;
