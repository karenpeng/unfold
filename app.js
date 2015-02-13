var stack = require('callsite');

//1.inject callsite
//2.call it
//3.get callste data
//4.analysis the data
//5.form an object
//6.use the object to animate

var counter = 0;

function callSite() {
  stack().forEach(function (callsite, i) {
    console.log('%s counter: %s, level: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
      new Array(i + 1).join(' '), counter, i, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
      callsite.getLineNumber(), callsite.getColumnNumber());
  });
  counter++;
}

//function below scans the function string line by line
//but i'm not going to do it any more
//b/c let's assume there's only one recursive function on the outtest layer
//make our lives easier :)
// function inject(strArray) {
//   var functionRe = /function\s\S*\(.*?\)\{/;

//   var endStr = '';
//   strArray.forEach(function (str) {
//     if (str.match(functionRe) !== null) {
//       var functionLine = str.match(functionRe)[0];
//       console.log(functionLine);

//       var postStr = str.split(functionRe);
//       //console.log(postStr);
//       postStr = functionLine.concat(postStr[0]).concat('\n').concat(callSite.toString()).concat(postStr[1]).concat('\n');
//       endStr += postStr;
//     } else {
//       endStr += str.concat('\n');
//     }
//   });
//   console.log(endStr);
//   return endStr;
// }

function inject(str) {
  var functionRe = /function\s\S*\s*\(.*?\)\s*\{/;
  var endStr = '';
  if (str.match(functionRe) !== null) {
    var functionLine = str.match(functionRe)[0];
    //console.log('functionLine ' + functionLine);
    //do something here for the firstLine
    console.log('functionLine ' + functionLine);
    functionLine = transformFunction(functionLine);
    // functionLine.
    var postStr = str.split(functionRe);
    var latterPart = postStr[1]
      // concat(postStr[0]).
      // concat('\n').
      // concat(callSite.toString()).
      // concat(postStr[1]).
      // concat('\n');

  } else {
    console.log('no function (ಥ_ಥ)');
    endStr += str;
  }
  console.log(endStr);
  return endStr;
}

//okay, now this is the wacky part
function transformFunction(str) {
  var newFunctionLine = '';

  var functionNameRe1 = /var\s\w+\s*/;
  var functionNameRe2 = /function\s\w+\s*/;
  var functionName = '';

  if (str.match(functionNameRe1) !== null) {
    functionName = str.match(functionNameRe1)[0].replace(/var/, '');
  }
  if (str.match(functionNameRe2) !== null) {
    functionName = str.match(functionNameRe2)[0].replace(/function/, '');
  }
  console.log('functionName ' + functionName);

  var param = '';
  var paramRe = /\(\w+\)/;
  if (str.match(paramRe) !== null) {
    param = str.match(paramRe)[0].replace('(', '').replace(')', '');
  }
  console.log('param ' + param);

  newFunctionLine = 'var '.concat(functionName).concat(' = new Function (').concat(param).concat(', ')

  return newFunctionLine;

}

function getRidOfBracket(str) {
  for (var i = str.length; i >= 0; i--) {
    if (str[i] === '}') {

      break;
    }

  }
}

function evaluate(str) {
  //overwrite the function
  try {
    console.log(typeof str);
    eval(str);
    console.log('evaluation done!');
  } catch (ಠ‿ಠ) {
    console.log('ಠ‿ಠ ' + ಠ‿ಠ);
  }
}

function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 1) + fib(num - 2);
}

// var fibStr = [
//   "function fib(num){",
//   "if (num === 0) return 0;",
//   "if (num === 1) return 1;",
//   "return fib(num - 1) + fib(num - 2);",
//   "}"
// ]

//console.log(fib)
//console.log(fib.toString())

evaluate(inject(fib.toString()));

//console.log(fib);
//fib(5);