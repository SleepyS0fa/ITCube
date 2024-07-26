module.exports = {
  ifeq: function(a, b, options){
    if (a === b) {
      return options.fn(this);
      }
    return options.inverse(this);
  },
  ifarr: function(val, options){
    if (val instanceof Array) {
      return options.fn(this);
    } else {
      return options.inverse(this);  
    }
  }
}