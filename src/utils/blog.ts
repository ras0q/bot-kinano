import cron from 'node-cron';
import Sitemapper from 'sitemapper';
import { getRandom } from '../utils/random';
import { Robots } from '../src/types';
import { scheduling, IDs } from '../src/words';

const trapBlog = new Sitemapper({
  url: 'https://trap.jp/sitemap-posts.xml',
});

const blogEvents: cron.ScheduledTask[] = [];

let trapBlogMapper: string[] = [];

export const setTodayBlogs = async (robot: Robots): Promise<void> => {
  for (const event of blogEvents) {
    event.destroy();
  }

  try {
    const { sites } = await trapBlog.fetch();
    trapBlogMapper = sites;
  } catch (err) {
    console.error(err);
    robot.send({ userID: IDs.at_Ras }, `## get blog error\n  ${err}`);
  }

  [...Object.values(scheduling)].forEach(({ channelId, hour }, i) => {
    blogEvents[i] = cron.schedule(
      `0 ${hour.map((h) => h.toString()).join(',')} * * *`,
      () => {
        if (trapBlogMapper === []) return;
        robot.send(
          { channelID: channelId },
          trapBlogMapper[getRandom(0, trapBlogMapper.length)]
        );
      },
      { timezone: 'Asia/Tokyo' }
    );
  });
};
