var callsite = require('callsite');

module.exports = function (fn, paramSource) {

  var paramRe = /\(.*\)/;

  function getParams(str) {
    var paramArray = str.slice(1, str.length - 1).trim().split(/\s*,\s*/);
    return paramArray;
  }

  function evaluate(fn, str) {

    console.log(str)

    var res = str.match(paramRe);
    if (!res) {
      throw new Error('parameter not found');
    }

    var params = getParams(res[0]);

    if (!Array.isArray(params)) {
      params = [params];
    }
    // 执行的时候需要把 callsite 传递进去
    params.push(callsite);
    // 拿一个变量来存放 fn 执行时产生的堆栈信息
    // 执行函数
    return result = fn.apply(null, params);
  }

  return evaluate(fn, paramSource);
}