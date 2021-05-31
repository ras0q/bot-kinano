import { Robots } from '../src/types';
import cron from 'node-cron';
import { convertToCronTime } from '../utils/crontime';

module.exports = (robot: Robots) => {
  robot.hear(/remind/, (res) => {
    const { user, plainText } = res.message.message;
    if (!user.bot) {
      const [text, timeStr] = plainText
        .replace(/[@＠]BOT_kinano/i, '')
        .replace(/remind/, '')
        .replace(/\s+/, '')
        .split(/\s/);
      const resText = `時間になったやんね！\n${text}`;

      const arr = timeStr.match(/^([01][0-9]|2[0-3]):[0-5][0-9]$/);
      const remindTime = new Date();
      if (arr) {
        const [h, m] = arr[0].split(':').map((s) => Number(s));
        const nh = remindTime.getHours();
        const nm = remindTime.getMinutes();
        if (h < nh || (h === nh && m <= nm)) {
          remindTime.setDate(remindTime.getDate() + 1);
        }
        remindTime.setHours(h);
        remindTime.setMinutes(m);
        remindTime.setSeconds(0);

        res.send({
          type: 'stamp',
          name: 'blobdrum',
        });

        const remindEvent = cron.schedule(convertToCronTime(remindTime), () => {
          res.reply(resText);
          remindEvent.destroy();
        });
      } else {
        res.reply(`『${timeStr}』はいんばりっどな時間やんね...？`);
      }
    }
  });
};
