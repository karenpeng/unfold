var falafel = require('falafel');
var inspect = require('object-inspect');

module.exports = function (src) {

  var id = 0;
  var nodes = {};
  var _obj = [];

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

  console.log(out);
  console.log(nodes);

  var stack = [];
  Function(['_exit', '_enter'], out)(exit, enter);

  function exit(id, value) {
    stack.pop();
    var indent = Array(stack.length + 1).join(' ');
    console.log(indent + value);

    _obj.push(value);
    return value;
  }

  function enter(id, args) {
    var indent = Array(stack.length + 1).join(' ');
    args = [].slice.call(args).map(inspect);
    console.log(indent + nodes[id].id.name + '(' + args.join(', ') + ')');

    var str = indent + nodes[id].id.name + '(' + args.join(', ') + ')';
    _obj.push(str);
    stack.push(id);
  }

  return _obj;

}