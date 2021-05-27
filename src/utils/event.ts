import ical from 'ical';
import requestPromise from 'request-promise';
import cron from 'node-cron';
import { IDs } from '../src/words';
import { Robots } from '../src/types';

const baseURL = process.env.ICAL_URL;
const events: cron.ScheduledTask[] = [];

if (!baseURL) {
  throw new Error('ICAL_URL should not be empty.');
}

/* eslint @typescript-eslint/no-non-null-assertion: 0 */
export const setTodayEvents = (robot: Robots): void => {
  for (const event of events) {
    event.destroy();
  }

  requestPromise(baseURL)
    .then((body) => {
      const ics = ical.parseICS(body);
      const sortedKeys = Object.keys(ics).sort((a, b) => {
        if (ics[a].start! < ics[b].start!) return -1;
        else return 1;
      });
      const now = Date.now();
      const todayEventKeys = sortedKeys.filter(
        (key) =>
          ics[key].start &&
          ics[key].start!.getTime() - now > 0 &&
          ics[key].start!.getTime() - now < 1000 * 60 * 60 * 24
      );
      todayEventKeys.forEach((key, i) => {
        const { start, summary, description } = ics[key];
        start!.setMinutes(start!.getMinutes() - 5);
        events[i] = cron.schedule(
          convertToCronTime(start!),
          () => {
            robot.send(
              { channelID: IDs.gt_Ras },
              `# Next:『${summary}』\n#### ${start!.toString()}\n${description}`
            );
          },
          { timezone: 'Asia/Tokyo' }
        );
      });
    })
    .catch((err) => {
      robot.send({ userID: IDs.at_Ras }, err);
      return err;
    });
};

const convertToCronTime = (date: Date) => {
  const m = date.getMinutes();
  const h = date.getHours();
  const d = date.getDate();
  const M = date.getMonth();
  return `${m} ${h} ${d} ${M+1} *`;
};
