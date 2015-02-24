//TODO:
//1. think about graphic
//2. think about live coding(pause provide a nice way to call the function maybe?)
//3. think about return and declare a function, what if they are in the same line:)

// var inject = require('./inject.js');
// var evaluate = require('./evaluate.js');
var coverify = require('./coverify.js');
var renew = require('./renew.js');
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

var result;
var iterator;
var intervalHandle;

function getData() {
  var str1 = editor1.getValue();
  var str2 = editor2.getValue();
  //visualize(evaluate(inject(editor1.getValue()), editor2.getValue()));
  try {
    //if (checker.checkDeclare(str1) && checker.checkCall(str2)) {
    result = coverify(str1.concat(str2));
    //result = coverify(fibonacci.toString().concat('fibonacci(6)'));
    iterator = renew(result, info.stack);
    startAnimation();
    //}
    //console.log(result);
  } catch (error) {
    console.log('Caught execption: s%', error);
    killAnimation();
    return;
  }
}

var info = {
  stack: []
};

// function observer(changes) {
//   changes.forEach(function (change, i) {
//     console.log(change.name);
//     console.log(change);
//     animate();
//   })
// }

// Object.observe(info, observer);

// var it = iterator.next();
// if(it.done) return;
// it.value();

// makeDom(animate.typing(stack.info).value);

// iterator.next();
function startAnimation() {
  intervalHandle = setInterval(function () {
    var it = iterator.next();
    if (it.done) return;
    it.value();
    //wat???? pass by referrence?!!!
    document.getElementById('content').innerHTML = animate.makeDom(info.stack);
    //animate.typing(info.stack), iterator.next());
  }, 1000);
}

function killAnimation() {
  console.log('oh no... ' + intervalHandle);
  clearInterval(intervalHandle);
  document.getElementById('content').innerHTML = '';
  info.stack = [];
  iterator = null;
}

getData();

var content = require('./content.js');
var choice = document.getElementById('choice');
choice.onchange = function () {
  killAnimation();
  editor1.setValue(content[choice.value]['declare']);
  editor2.setValue(content[choice.value]['call']);
  setTimeout(function () {
    getData();
  }, 100);
}

editor1.on('change', function () {
  try {
    //if (checker.checkDeclare(editor1.getValue())) {
    killAnimation();
    eval(editor1.getValue());
    eval(editor2.getValue());
    //}
  } catch (error) {
    console.log('Caught execption: s%', error);
    return;
  }
  getData();
});

editor2.on('change', function () {
  try {
    //if (checker.checkCall(editor2.getValue())) {
    killAnimation();
    eval(editor1.getValue());
    eval(editor2.getValue());
    //}
  } catch (error) {
    console.log('Caught execption: s%', error);
    return;
  }
  getData();
});