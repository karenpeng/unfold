module.exports = animate;

function* animate(arr) {
  console.log('hello?')
  var stack = [];

  function pushPush() {
    stack.push(arr[i]);
    console.log('push ' + stack.toString())
  }

  function changeValue() {
    stack[stack.length - 1] = arr[i];
    console.log('change value ' + stack.toString())
  }

  function popPop() {
    stack.pop();
    console.log('pop ' + stack.toString())
  }

  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      yield pushPush;
    } else if (typeof arr[i] === 'number') {
      yield changeValue;
      yield popPop;
    }
  }
  console.log(stack)
}