// [start, end) に含まれる整数を乱数で返す
exports.getRandom = (start, end) => Math.floor(Math.random() * (end - start)) + start;
