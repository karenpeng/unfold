var falafel = require('falafel');
var inspect = require('object-inspect');
var fs = require('fs');
//var src = fs.readFileSync('fib.js', 'utf8');

module.exports = function (src) {
  var id = 0;
  var nodes = {};

  var out = falafel(src, function (node) {
    if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
      node.body.update('{' + '_enter(' + id + ',arguments);' + node.body.body
        .map(function (x) {
          return x.source()
        })
        .join(';\n') + '_exit(' + id + ');' + '}'
      );
      nodes[id] = node;
      id++;
    } else if (node.type === 'ReturnStatement') {
      node.argument.update(
        '_exit(' + id + ',' + node.argument.source() + ')'
      );
      nodes[id] = node;
      id++;
    }
  }).toString();

  var stack = [];
  Function(['_exit', '_enter'], out)(exit, enter);

  function exit(id, value) {
    stack.pop();
    console.log(value);
    return value;
  }

  function enter(id, args) {
    var indent = Array(stack.length + 1).join(' ');
    args = [].slice.call(args).map(inspect);
    console.log(indent + nodes[id].id.name + '(' + args.join(', ') + ')');
    stack.push(id);
  }

}