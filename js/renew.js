module.exports = updateStack;

function* updateStack(arr, stack) {
  console.log(arr);
  //var stack = [];

  function pushPush() {
    //stack.push(arr[i]['func']);
    //stack.push('<p>' + arr[i].replace(/\s/g, '&nbsp') + '</p>');
    stack.push(arr[i]);
    //console.log('push ' + stack.toString())
    //return stack;
  }

  function changeValue() {
    // stack[stack.length - 1] = arr[i]['return'];
    //stack[stack.length - 1] = '<p>' + arr[i] + '</p>';
    stack[stack.length - 1] = arr[i] + '';
    //console.log('change value ' + stack.toString())
    //return stack;
  }

  function popPop() {
    stack.pop();
    //console.log('pop ' + stack.toString())
    //return stack;
  }

  for (var i = 0; i < arr.length; i++) {
    //this is bad b/c what if it dose not return number? T_T
    //if (arr[i]['func']) {
    //if it returns a function
    if (typeof arr[i] !== 'string') {
      //if (arr[i]['return']) {
      yield changeValue;
      yield popPop;
      //if it does not return a function, it should be value i guess
    } else {
      yield pushPush;
    }
  }

  //console.log(stack)
}