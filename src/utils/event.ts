import ical from 'ical'
import cron from 'node-cron'
import fetch from 'node-fetch'
import { Robots } from '../src/types'
import { IDs } from '../src/words'
import { convertToCronTime } from './crontime'

const baseURL = process.env.ICAL_URL
const events: cron.ScheduledTask[] = []

if (!baseURL) {
  throw new Error('ICAL_URL should not be empty.')
}

/* eslint @typescript-eslint/no-non-null-assertion: 0 */
export const setTodayEvents = async (robot: Robots): Promise<void> => {
  // prettier-ignore
  console.log('Start setting today\'s events')
  for (const event of events) {
    event.destroy()
  }
  events.splice(0)

  try {
    const body = await fetch(baseURL)
    const ics = ical.parseICS(await body.text())
    const sortedKeys = Object.keys(ics).sort((a, b) => {
      if (ics[a].start! < ics[b].start!) return -1
      else return 1
    })
    const now = Date.now()
    const todayEventKeys = sortedKeys.filter(
      (key) =>
        ics[key].start &&
        ics[key].start!.getTime() - now > 0 &&
        ics[key].start!.getTime() - now < 1000 * 60 * 60 * 24
    )
    console.log(`${todayEventKeys.length} events found.`)
    todayEventKeys.forEach((key) => {
      const { start, summary, description } = ics[key]
      const notifyTime = new Date(start!.getTime())
      notifyTime.setMinutes(notifyTime.getMinutes() - 5)
      events.push(
        cron.schedule(
          convertToCronTime(notifyTime),
          () => {
            robot.send(
              { channelID: IDs['#g/t/Ras'] },
              `# ==『${summary}』==\n#### ${start!.toString()}\n${description}\n@Ras`
            )
          },
          { timezone: 'Asia/Tokyo' }
        )
      )
    })
  } catch (err) {
    robot.send({ userID: IDs['@Ras'] }, `${err}`)
  }
}
