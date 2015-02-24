module.exports = {
  typing: typing,
  makeDom: makeDom
}

function* typing(str) {
  for (var i = 0; i < str.length; i++) {
    yield str[i];
  }
}

function makeDom(arr) {
  var output = '';
  arr.forEach(function (line) {
    output += '<p>' + line.replace(/\s/g, '&nbsp') + '</p>';
  });
  return output;
}