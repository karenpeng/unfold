var stack = require('callsite');
//eventally it's just a json object to control the animation???

//what is a recursive function?

//a function that calls itself?

//looks like
//function xxx(){
//
//xxx()
//
//}
//
var counter = 0;
var callSiteCode = [
  " stack().forEach(function (callsite, i) { ",
  "console.log('%s counter: %s, level: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s', ",
  "new Array(i + 1).join(' '), counter, i, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(), ",
  "callsite.getLineNumber(), callsite.getColumnNumber()); ",
  "})",
  "counter++;"
]

function joinCallSiteCode() {
  var endStr = '';
  endStr += '\n';
  callSiteCode.forEach(function (code) {
    endStr += code.concat('\n');
  });
  return endStr;
}

function inject(strArray) {
  var functionRe = /function\s\S*\(\S*\)\{/;
  //var postStr = functionRe.exec(str);
  var endStr = '';
  strArray.forEach(function (str) {
    if (str.match(functionRe) !== null) {
      var functionLine = str.match(functionRe)[0];
      //console.log(functionLine)
      var postStr = str.split(functionRe);
      //console.log(postStr)
      postStr = functionLine.concat(postStr[0]).concat('\n').concat(joinCallSiteCode()).concat(postStr[1]).concat('\n');
      endStr += postStr;
    } else {
      endStr += str.concat('\n');
    }

  });
  // var functionLine = str.match(functionRe)[0];
  // var postStr = str.split(functionRe);
  // //console.log(postStr)
  // postStr = functionLine.concat(postStr[0]).concat(callSiteCode).concat(postStr[1]);
  //console.log(postStr);
  console.log(endStr);
  return endStr;
}

function quickTest() {
  var str = "sddg"
  var functionRe = /function\s\S*\(\S*\)\{/
  if (str.match(functionRe) !== null) {
    var functionLine = str.match(functionRe)[0];
    console.log(functionLine)
    var postStr = str.split(functionRe);
    console.log(postStr)
  }
}

function evaluate(str) {
  //overwrite the function
  try {
    console.log(typeof str);
    eval(str);
    console.log('evaluation done!');
  } catch (ಠ‿ಠ) {
    console.log("ಠ‿ಠ " + ಠ‿ಠ);
  }
}

// function fib(num) {
//   if (num === 0) return 0;
//   if (num === 1) return 1;
//   return fib(num - 1) + fib(num - 2);
// }

var fibStr = [
  "function fib(num){",
  "if (num === 0) return 0;",
  "if (num === 1) return 1;",
  "return fib(num - 1) + fib(num - 2);",
  "}"
]

//console.log(fib)

evaluate(inject(fibStr));

// function fib(num) {

//   stack().forEach(function (callsite, i) {
//     console.log('%s counter: %s, level: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
//       new Array(i + 1).join(' '), counter, i, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
//       callsite.getLineNumber(), callsite.getColumnNumber());
//   })

//   if (num === 0) return 0;
//   if (num === 1) return 1;
//   return fib(num - 1) + fib(num - 2);
// }
console.log(fib);
fib(5);