module.exports = function (res) {

  // 捕获到的 stacks
  var info = res.stacks;

  //console.log(info);

  info.forEach(function (stack, index) {
    console.log();
    console.log('func %s with arguments %s, result %s:', index, JSON.stringify(stack.args), stack.result);

    for (var i = 0; i < stack.stacks.length; i++) {
      var s = stack.stacks[i];
      var fnName = s.getFunctionName();
      // 如果调用的名字是 eval，说明这个堆栈已经到了 new Function 里面了，后面的展示出来没有意义了
      if (fnName === 'eval') {
        return;
      }
      // console.log('%s level: %s, this: %s, type: %s, method: %s, function: %s, line: %s, column: %s, evalOrigin: %s',
      //   new Array(i * 2 + 1).join(' '),
      //   i,
      //   s.getThis(),
      //   s.getTypeName(),
      //   s.getMethodName(),
      //   s.getFunctionName(),
      //   s.getLineNumber(),
      //   s.getColumnNumber(),
      //   s.getEvalOrigin()
      // );
      console.log('%s level: %s, function: %s, line: %s, column: %s',
        new Array(i * 2 + 1).join(' '), i, s.getFunctionName(), s.getLineNumber(), s.getColumnNumber()
      );
    }
  });

}