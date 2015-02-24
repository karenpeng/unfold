module.exports = [quickSort.toString(),
  _quickSort.toString(),
  partition.toString(),
  swap.toString()
].join('\n')

function quickSort(arr) {
  _quickSort(arr, 0, arr.length);
}

function _quickSort(arr, first, last) {

  if (first >= last) {

    return;

  } else {
    var pivot = partition(arr, first, last);

    _quickSort(arr, first, pivot - 1);
    _quickSort(arr, pivot, last);
  }
}

function partition(arr, first, last) {
  var pivot = arr[first];

  //console.log('! ' + pivot);

  var lessIndex = first + 1;

  for (var moreIndex = lessIndex; moreIndex < last; moreIndex++) {

    if (arr[moreIndex] <= pivot) {

      swap(arr, moreIndex, lessIndex);
      lessIndex++;

    }

  }

  swap(arr, first, lessIndex - 1)

  //console.log(arr);

  return lessIndex;

}

function swap(arr, x, y) {
  var temp = arr[y];
  arr[y] = arr[x];
  arr[x] = temp;
}