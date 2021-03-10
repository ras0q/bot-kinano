const { getRandom } = require('./random');

//もふもふ
exports.getMofu = () => {
  const r = new Array(2)
    .fill(null)
    .map(() => String.fromCodePoint(getRandom('ぁ'.codePointAt(0), 'ん'.codePointAt(0) + 1)))
    .join('');
  return r + r;
};