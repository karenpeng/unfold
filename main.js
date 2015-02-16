var analyser = require('./analyser.js');
var formObject = require('./object.js');

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

// var fib = inject(fibSources);
// var res = evaluate(fib, 6);

var fib = analyser.injector(fibSources);
var res = analyser.evaluator(fib, callSource);

//formObject(res);

// 输出结果

console.log('generate fib function:');
console.log(fib);
// var a = '';
// eval('a = fib(6)');
// console.log(a);
//console.log(fib(6))

console.log('fib result: ', res.result);

formObject(res);