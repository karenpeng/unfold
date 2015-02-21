//1.inject callsite
//2.call it
//3.get callste data
//4.analysis the data
//5.form an object
//6.use the object to animate

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
// var fib = inject(fibSources);
// var res = evaluate(fib, 6);

//document.onload = function () {
//
// var fib = analyser.injector(fibSources);
// var res = analyser.evaluator(fib, callSource);
// 输出结果

// console.log('generate fib function:');
// console.log(fib);

// console.log('fib result: ', res.result);

// visibleObject(res);

//}

function getData() {
  //visualize(evaluate(inject(editor1.getValue()), editor2.getValue()));
  try {
    console.log(coverify(editor1.getValue().concat(editor2.getValue())));
    //console.log
  } catch (error) {
    console.log(error);
    return;
  }
}

getData();

editor1.on('change', function () {

  try {
    eval(editor1.getValue());
  } catch (error) {
    console.log('OOPS ' + error);
    return;
  }

  getData();

});

editor2.on('change', function () {

  try {
    eval(editor1.getValue());
  } catch (error) {
    console.log('OOPS ' + error);
    return;
  }
  getData();
});