module.exports = {
  fibonacci: {
    declare: require('./content/fibonacci.js'),
    call: 'fibonacci(6);'
  },

  fibonacciTable: {
    declare: require('./content/fibonacciTable.js'),
    call: 'fibonacci(6);'
  },

  binarySearch: {
    declare: require('./content/binarySearch.js'),
    call: ['var test = [2, 2, 4, 6, 6, 6, 7, 13, 15, 64, 64, 246, 346];',
      'binarySearch(test, 15);'
    ].join('\n')
  },

  mergeSort: {
    declare: require('./content/mergeSort.js'),
    call: ['var test = [4, 6, 13, 6, 2, 7, 346, 15, 64, 246, 2, 6, 64];',
      'mergeSort(test);'
    ].join('\n')
  },

  quickSort: {
    declare: require('./content/quickSort.js'),
    call: ['var test = [4, 6, 13, 6, 2, 7, 346, 15, 64, 246, 2, 6, 64];',
      'mergeSort(test);'
    ].join('\n')
  }
}