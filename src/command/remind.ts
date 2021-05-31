import { Robots } from '../src/types';
import cron from 'node-cron';
import { convertToCronTime } from '../utils/crontime';

module.exports = (robot: Robots) => {
  robot.hear(/remind/i, (res) => {
    const { user, plainText } = res.message.message;
    if (!user.bot) {
      const timeArr = plainText.match(/([01][0-9]|2[0-3]):([0-5][0-9])/);
      if (timeArr) {
        const text = plainText
          .replace(/([@＠]BOT_kinano|remind)/i, '')
          .replace(timeArr[0], '')
          .replace(/^\s+/, '');
        const resText = `時間になったやんね！\n${text}`;

        const remindTime = new Date();
        const rh = Number(timeArr[1]);
        const rm = Number(timeArr[2]);
        const nh = remindTime.getHours();
        const nm = remindTime.getMinutes();
        if (rh < nh || (rh === nh && rm <= nm)) {
          remindTime.setDate(remindTime.getDate() + 1);
        }
        remindTime.setHours(rh);
        remindTime.setMinutes(rm);
        remindTime.setSeconds(0);

        res.send({
          type: 'stamp',
          name: 'blobdrum',
        });

        const remindEvent = cron.schedule(
          convertToCronTime(remindTime),
          () => {
            res.reply(resText);
            remindEvent.destroy();
          },
          { timezone: 'Asia/Tokyo' }
        );
      } else {
        res.reply('時間がいんばりっどやんね...？');
      }
    }
  });
};
