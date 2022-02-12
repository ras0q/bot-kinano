export const convertToCronTime = (date: Date): string => {
  const m = date.getMinutes()
  const h = date.getHours()
  const d = date.getDate()
  const M = date.getMonth()
  const D = date.getDay()
  return `${m} ${h} ${d} ${M + 1} ${D}`
}

export const convertToCronTimePerDate = (date: Date): string => {
  const m = date.getMinutes()
  const h = date.getHours()
  return `${m} ${h} * * *`
}
