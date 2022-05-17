/**
 * [start, end) に含まれる整数を乱数で返す
 */
export const getRandom = (start: number, end: number): number =>
  Math.floor(Math.random() * (end - start)) + start

export default function shuffle<T>(array: T[]): T[] {
  const out = Array.from(array)
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[r]] = [out[r], out[i]]
  }
  return out
}
