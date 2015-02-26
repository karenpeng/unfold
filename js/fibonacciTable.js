module.exports = fibonacciTable.toString();

function fibonacciTable(num) {
		var table = {};

		if (num === 0) return 0;
		if (num === 1) return 1;
		table[num] = talbe[num - 1] + table[num - 2];
		return table[num];

}