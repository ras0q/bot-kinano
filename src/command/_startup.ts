//Description:
//  StartUp

import cron from 'node-cron';
import { getMofu } from '../utils/mofu';
import { setTodayBlogs } from '../utils/blog';
import { setTodayEvents } from '../utils/event';
import { setSampleMessage } from '../utils/develop';
import { IDs } from '../src/words';
import { Robots } from '../src/types';

module.exports = (robot: Robots) => {
  //開発環境
  if (process.env.KINANO_WORK_ENV === 'develop') {
    console.log(
      `\n\u001b[35mDEVELOPMENT ENVIRONMENT\nMy name is ${process.env.HUBOT_TRAQ_NAME}\u001b[0m`
    );
    robot.hear(/./, (res) => {
      setSampleMessage(res.message);
    });
  }

  //デプロイ時実行
  robot.send(
    { channelID: IDs.gtRB_log },
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})`
  );

  //cronセット
  const now = new Date();
  const m = now.getMinutes();
  const h = now.getHours();
  cron.schedule(`${m + 1} ${h} * * *`, () => {
    setTodayBlogs(robot);
    setTodayEvents(robot);
  });
};
