//TODO:
//1. think about graphic
//2. think about live coding(pause provide a nice way to call the function maybe?)
//3. think about return and declare a function, what if they are in the same line:)

// var inject = require('./inject.js');
// var evaluate = require('./evaluate.js');
var coverify = require('./coverify.js');
//var visualize = require('./visualize.js');
var animate = require('./animate.js');

var editor1 = ace.edit("editor1");
editor1.setTheme("ace/theme/monokai");
editor1.getSession().setMode("ace/mode/javascript");

var editor2 = ace.edit("editor2");
editor2.setTheme("ace/theme/monokai");
editor2.getSession().setMode("ace/mode/javascript");
//
function fibonacci(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

function getData() {
  //visualize(evaluate(inject(editor1.getValue()), editor2.getValue()));
  try {
    //var result = coverify(editor1.getValue().concat(editor2.getValue()));
    var result = coverify(fibonacci.toString().concat('fibonacci(6)'));
    //console.log(result);
  } catch (error) {
    console.log('Caught execption: s%', error);
    return;
  }

  var info = {
    stack: []
  };
  var iterator = animate.updateStack(result, info.stack);
  setInterval(function () {
    var it = iterator.next();
    if (it.done) return;
    it.value();
    //wat???? pass by referrence?!!!
    document.getElementById('content').innerHTML = animate.makeDom(info.stack);
    //graphic(info.stack, 'content');
    //animate.typing(info.stack), iterator.next());
  }, 1000);

}

getData();

// editor1.on('change', function () {
//   try {
//     eval(editor1.getValue());
//   } catch (error) {
//     console.log('Caught execption: s%', error);
//     return;
//   }
//   getData();
// });

// editor2.on('change', function () {
//   try {
//     eval(editor1.getValue());
//   } catch (error) {
//     console.log('Caught execption: s%', error);
//     return;
//   }
//   getData();
// });