import cron from 'node-cron'
import Sitemapper from 'sitemapper'
import { Robots } from '../src/types'
import { scheduling } from '../src/words'
import { getRandom } from '../utils/random'
import { IDs } from '../config/id'

const trapBlog = new Sitemapper({
  url: 'https://trap.jp/sitemap-posts.xml'
})

const blogEvents: cron.ScheduledTask[] = []

let trapBlogMapper: string[] = []

export const setTodayBlogs = async (robot: Robots): Promise<void> => {
  // prettier-ignore
  console.log('Start setting today\'s blogs')
  for (const event of blogEvents) {
    event.destroy()
  }

  try {
    const { sites } = await trapBlog.fetch()
    trapBlogMapper = sites
  } catch (err) {
    console.error(err)
    robot.send({ userID: IDs['@Ras'] }, `## get blog error\n  ${err}`)
  }

  ;[...Object.values(scheduling)].forEach(({ channelId, hour }, i) => {
    blogEvents[i] = cron.schedule(
      `0 ${hour.map((h) => h.toString()).join(',')} * * *`,
      () => {
        if (trapBlogMapper === []) return
        robot.send(
          { channelID: channelId },
          trapBlogMapper[getRandom(0, trapBlogMapper.length)]
        )
      },
      { timezone: 'Asia/Tokyo' }
    )
  })
}
