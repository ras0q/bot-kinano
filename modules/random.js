// [start, end) に含まれる整数を乱数で返す
export const getRandom = (start, end) => Math.floor(Math.random() * (end - start)) + start;
