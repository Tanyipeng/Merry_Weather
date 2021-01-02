var formatCity = function(
  area,
  parent_city,
  location
) {
  return [area, parent_city, location].filter(item => !!item).join('-');
};

export default formatCity;
