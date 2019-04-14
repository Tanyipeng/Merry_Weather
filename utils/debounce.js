const debounce = function(fn, t, ...args) {
  const _this = this;
  let timer = null;
  return function(..._args) {
    timer && clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(_this, args.concat(_args));
    }, t);
  };
};

export default debounce;
