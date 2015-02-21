module.exports = animate;

function animate(arr) {
  var stack = [];
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      stack.push(arr[i]);
    } else if (typeof arr[i] === Number) {
      stack[i] = arr[i];
      stack.pop();
    }
  }

}