//Description:
//  make or update MEMO.

import * as cron from 'node-cron';
import { IDs } from '../src/words';
import { Robots } from '../src/types';
import fetch from 'node-fetch';

const clientID = process.env.SHOWCASE_CLIENT_ID;
const baseApiUrl = process.env.SHOWCASE_URL + '/memo';

const apiUrl = (path?: string) => {
  return `${baseApiUrl}${path}?client_id=${clientID}`;
};

const format = (memo: string) =>
  memo !== '' ? memo.replace(/\n/g, '|\n|') : ':404_notfound.ex-large:';

const table = (memo: string) => '|memo|\n' + '|----|\n' + `|${format(memo)}|`;


module.exports = (robot: Robots) => {
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, async (res) => {
    const { id, user } = res.message.message;
    if (!user.bot) {
      try {
        const body = await fetch(apiUrl(`/${user.name}`));
        if(body.status !== 200) throw new Error(body.statusText);
        const { memo } = await body.json();
        res.send(
          { type: 'stamp', name: 'writing_hand' },
          `めも！\n${table(memo)}`
        );
      } catch(err) {
        console.log(err);
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        );
      };
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(=|＝)/i, async (res) => {
    const { id, text, user } = res.message.message;
    if (!user.bot) {
      try {
        const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝)\s?/i, '');
        const body = await fetch(apiUrl(), {
          method: 'POST',
          body: JSON.stringify({ user: user.name, memo }),
        });
        if(body.status !== 200) throw new Error(body.statusText);
        res.send(
          { type: 'stamp', name: 'writing_hand' },
          `メモをアップデートしたやんね！:Hyperblob:\n${table(memo)}`
        );
      } catch (err) {
        console.log(err);
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        );
      }
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, async (res) => {
    const { id, text, user } = res.message.message;
    if (!user.bot) {
      try {
        const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝)\s?/i, '');
        const body = await fetch(apiUrl(), {
          method: 'PATCH',
          body: JSON.stringify({ user: user.name, memo }),
        });
        if(body.status !== 200) throw new Error(body.statusText);
        res.send(
          { type: 'stamp', name: 'writing_hand' },
          `メモをアップデートしたやんね！:partyparrot_blob:\n${table(memo)}`
        );
      } catch (err) {
        console.log(err);
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        );
      }
    }
  });

  cron.schedule(
    '0 0 8,16 * * *',
    async () => {
      try {
        const body = await fetch(apiUrl('/Ras'));
        if(body.status !== 200) throw new Error(body.statusText);
        const { memo } = await body.json();
        if (memo !== '') {
          robot.send({ channelID: IDs['#g/t/R/Bot'] }, `@Ras\nめも！\n${table(memo)}`);
        }
      } catch(err) {
        console.log(err);
        robot.send({ userID: IDs['@Ras'] }, `${err}`);
      };
    },
    { timezone: 'Asia/Tokyo' }
  );
};
