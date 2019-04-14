var formatCity = function(
  area = '湖北',
  parent_city = '武汉',
  location = '江岸'
) {
  var str = '';
  if (area !== parent_city && parent_city !== location && area !== location) {
    str = area + '省' + parent_city + '市' + location + '区';
  } else if (area === parent_city && area === location) {
    str = area + '市';
  } else if (area === parent_city && parent_city !== location) {
    str = parent_city + '市' + location + '区';
  } else {
    str = area + '省' + parent_city + '市';
  }
  return str;
};

export default formatCity;
