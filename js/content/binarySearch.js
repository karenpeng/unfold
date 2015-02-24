module.exports = binarySearch.toString();

function binarySearch(array, targetValue, _min, _max) {
  var min = _min || 0;
  var max = _max || array.length - 1;

  if (max < min) return -1;

  else {

    var guess = Math.floor((max + min) / 2);

    if (array[guess] === targetValue) {

      return guess;

    } else if (array[guess] > targetValue) {

      max = guess - 1;

    } else {

      min = guess + 1;
    }

    return binarySearch(array, targetValue, min, max);

  }

}