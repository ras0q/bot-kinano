import { getRandom } from './random';

//もふもふ
export const getMofu = () => {
  const start = 'ぁ'.codePointAt(0);
  const end = 'ん'.codePointAt(0);
  if (!(start && end)) throw new Error('codePointAt returned undefined'); //ないけどgetRandomがnumberを引数に取るので
  const r = new Array(2)
    .fill(null)
    .map(() => String.fromCodePoint(getRandom(start, end + 1)))
    .join('');
  return r + r;
};