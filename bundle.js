(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function (require, module, exports) {
    var callsite = require('callsite');

    module.exports = Analyser;

    function Analyser() {

    }

    Analyser.prototype.injector = function (defineSource) {

      // function fib() {} 形式的正则
      // 函数名和参数列表的地方用括号括起来
      // 这样 'function fib(num) {}'.match(functionRe) 的结果数组的第二个参数会是函数名，第三个参数会是函数列表
      var functionRe = /function\s*(\S*)\s*\((.*?)\)\s*\{/;

      // 用来注入的正则需要带 g 参数，用一个新的区分开来
      var functionReG = /function\s*(\S*)\s*\((.*?)\)\s*\{/g;

      // var fib = function () {} 形式的函数正则
      var varFunctionReG = /var\s+\S*\s*=\s*function\s*\S*\s*\((.*?)\)\s*\{/g;

      // 返回语句的正则
      var returnReG = /return\s*(.*?);/g;
      // 默认设置 source 都是标准的，第一行是函数定义，最后一行是函数结束的大括号

      function inject(source) {
        // 将第一个 function 匹配到，需要知道我们要调用一个什么样的函数
        var res = source.match(functionRe);
        if (!res) {
          throw new Error('can not found function');
        }

        // 正则执行 match 后的第二个参数会是函数名
        var fnName = res[1];

        // 解析参数，拿到参数列表
        var params = res[2].trim().split(/\*,\*/);
        // 注入 callsite
        source = source
          .replace(functionReG, addCallsite)
          .replace(varFunctionReG, addCallsite)
          .replace(returnReG, addReturn);
        // 函数第一行是存放 stacks 的变量的声明
        // 第二行拿到需要传递给真正执行函数的参数（去除传进来的 callsite）
        // wow it's actually borrowing methods from array to arguments
        // 函数体第二行注入一个用来存 stacks 的变量
        // 函数体最后一行，用来执行这个函数，并返回函数结果以及堆栈信息
        var fnBody = [
          'var $$stacks$$ = [];',
          'var args = [].slice.call(arguments, 0, -1)',
          source,
          'return { result: ' + fnName + '.apply(null, args), stacks: $$stacks$$}'
        ].join('\n');

        // 构建新的函数，这里会插入一个参数`$$callsite$$`
        // 因为在 new Function 里面读不到外面的 callsite，需要在执行的时候传进去
        return fn = Function.apply(null, params.concat(['$$callsite$$', fnBody]));
      }

      // replace 中用到的，匹配到函数定义的时候，就加入写 callsite 的代码
      function addCallsite(str) {
        return [
          str,
          'var $$infos$$ = {};', // 存放所有要注入的信息
          '$$infos$$.stacks = $$callsite$$();', // 记录堆栈
          '$$infos$$.args = [].slice.call(arguments);', // 记录调用的参数
          '$$stacks$$.push($$infos$$);' // 记录下来
        ].join('\n');
      }

      function addReturn(str, val) {
        // 记录下返回值，用 `,` 操作符，保证 if (num === 0) return 0; 的情况下也能够正确执行。
        return 'return ($$infos$$.result = (' + val + ')), $$infos$$.result;'
      }

      return inject(defineSource);

    }

    Analyser.prototype.evaluator = function (fn, paramSource) {

      var argumentRe = /\((.*?)\)/;

      function getRidOfBracket(str) {
        str = str.slice(1, str.length - 1);
        return str;
      }

      function getArgument(source) {
        source = source.replace(argumentRe, getRidOfBracket);
        source = souce.split(',');
        return source;
      }

      var params = getArgument(paramSource);

      if (!Array.isArray(params)) {
        params = [params];
      }
      // 执行的时候需要把 callsite 传递进去
      params.push(callsite);
      // 拿一个变量来存放 fn 执行时产生的堆栈信息
      // 执行函数
      return result = fn.apply(null, params);
    }
  }, {
    "callsite": 3
  }],
  2: [function (require, module, exports) {
    //1.inject callsite
    //2.call it
    //3.get callste data
    //4.analysis the data
    //5.form an object
    //6.use the object to animate

    var fibSources = [
      'function fib(num) {',
      '  if (num === 0) return 0;',
      '  if (num === 1) return 1;',
      '  return fib(num - 1) + fib(num - 2);',
      '}'
    ].join('\n');

    var callSource = 'fib(6);';

    var analyser = require('./analyser.js');
    var formObject = require('./object.js');

    // var fib = inject(fibSources);
    // var res = evaluate(fib, 6);

    var fib = analyser.injector(fibSources);
    var res = analyser.evaluator(fib, callSource);

    formObject(res);

    // 输出结果

    console.log('generate fib function:');
    console.log(fib.toString());
    console.log();

    console.log('fib result: ', res.result);
  }, {
    "./analyser.js": 1,
    "./object.js": 4
  }],
  3: [function (require, module, exports) {

    module.exports = function () {
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function (_, stack) {
        return stack;
      };
      var err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    };

  }, {}],
  4: [function (require, module, exports) {
    module.exports = FormObject;

    function FormObject(res) {

      // 捕获到的 stacks
      var stacks = res.stacks;

      stacks.forEach(function (stack, index) {
        console.log();
        console.log('func %s with arguments %j, result %s:', index, stack.args, stack.result);
        for (var i = 0; i < stack.stacks.length; i++) {
          var s = stack.stacks[i];
          var fnName = s.getFunctionName();
          // 如果调用的名字是 eval，说明这个堆栈已经到了 new Function 里面了，后面的展示出来没有意义了
          if (fnName === 'eval') {
            return;
          }
          console.log('%s level: %s, function: %s, line: %s, column: %s',
            new Array(i * 2 + 1).join(' '), i, s.getFunctionName(), s.getLineNumber(), s.getColumnNumber());
        }
      });

    }
  }, {}]
}, {}, [2]);