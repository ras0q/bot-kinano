import ical from 'ical';
import rp from 'request-promise';
import cron from 'node-cron';
import { IDs } from '../src/words';
import { Robots } from '../src/types';

const baseURL = process.env.ICAL_URL;

if (!baseURL) {
  throw new Error('ICAL_URL should not be empty.');
}

module.exports = (robot: Robots) => {
  cron.schedule(
    '0 0 * * *',
    () => {
      try {
        readIcal(robot, baseURL);
      } catch (err) {
        robot.send({ userID: IDs.at_Ras }, `## cron error\n${err}`);
      }
    },
    { timezone: 'Asia/Tokyo' }
  );
};

/* eslint @typescript-eslint/no-non-null-assertion: 0 */
const readIcal = (robot: Robots, url: string) => {
  rp(url)
    .then((body) => {
      const ics = ical.parseICS(body);
      const sortedKeys = Object.keys(ics).sort((a, b) => {
        if (ics[a].start! < ics[b].start!) return -1;
        else return 1;
      });
      const now = Date.now();
      const todayEvents = sortedKeys.filter(
        (key) =>
          ics[key].start &&
          ics[key].start!.getTime() - now > 0 &&
          ics[key].start!.getTime() - now < 1000 * 60 * 60 * 24
      );
      for (const event of todayEvents) {
        const { start, summary, description } = ics[event];
        console.log(
          `# Next:『${summary}』\n#### ${start!.toString()}\n${description}`
        );
        setTimeout(() => {
          robot.send(
            { channelID: IDs.gt_Ras },
            `# Next:『${summary}』\n#### ${start!.toString()}\n${description}`
          );
        }, start!.getTime() - Date.now() - 1000 * 5);
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
