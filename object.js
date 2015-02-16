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