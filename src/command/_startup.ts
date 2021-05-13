//Description:
//  StartUp

import cron from 'node-cron';
import Sitemapper from 'sitemapper';
import { getRandom } from '../utils/random';
import { getMofu } from '../utils/mofu';
import { scheduling, IDs } from '../src/words';
import { RobotHearResponse, Robots } from '../src/types';

let trapBlogMapper: null | string[] = null;

module.exports = (robot: Robots) => {
  //dev環境
  if (process.env.KINANO_WORK_ENV === 'develop') {
    console.log(
      `\n\u001b[35mDEVELOPMENT ENVIRONMENT\nMy name is ${process.env.HUBOT_TRAQ_NAME}\u001b[0m`
    );
    robot.hear(/./, (res) => {
      devInit(res.message);
    });
  }

  //起動時メッセージ
  robot.send(
    { channelID: IDs.gtRB_log },
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})`
  );

  //postのcronセット
  const trapBlog = new Sitemapper({
    url: 'https://trap.jp/sitemap-posts.xml',
  });
  const fetchSiteMap = async () => {
    try {
      const { sites } = await trapBlog.fetch();
      trapBlogMapper = sites;
    } catch (err) {
      console.error(err);
      robot.send({ userID: IDs.at_Ras }, `## get blog error\n  ${err}`);
    }
  };
  fetchSiteMap();
  cron.schedule('0 0 * * *', () => {
    fetchSiteMap;
  }); // 毎日 update

  [...Object.values(scheduling)].forEach(({ channelId, hour }) => {
    cron.schedule(
      `0 ${hour.map((h) => h.toString()).join(',')} * * *`,
      () => {
        if (trapBlogMapper === null) return;
        robot.send(
          { channelID: channelId },
          trapBlogMapper[getRandom(0, trapBlogMapper.length)]
        );
      },
      { timezone: 'Asia/Tokyo' }
    );
  });
};

const devInit = (message: RobotHearResponse['message']) => {
  message.message = {
    id: '00000000-0000-0000-0000-000000000000',
    user: {
      id: '0fa5d740-0841-4b88-b7c8-34a68774c784',
      name: 'Ras',
      displayName: 'らす',
      iconId: '00000000-0000-0000-0000-000000000000',
      bot: false,
    },
    channelId: '00000000-0000-0000-0000-000000000000',
    text: message.text,
    plainText: message.text,
    embedded: [
      {
        raw: '@BOT_kinano',
        type: 'user',
        id: 'f60166fb-c153-409a-811d-272426eda32b',
      },
    ],
    createdAt: '2020-01-01T00:00:00.000000Z',
    updatedAt: '2021-01-01T00:00:00.000000Z',
  };
};
