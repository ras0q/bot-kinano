//Description:
//  make or update MEMO.

import requestPromise from 'request-promise';
import * as cron from 'node-cron';
import { IDs } from '../src/words';

const op = (method: any, url: string, qs?: any) => ({
  method,
  uri: `${url}?client_id=${clientID}`,
  headers: {'Content-type': 'application/json'},
  qs,
  json: true
});

const format = (memo: string) => (
  memo !== ''
    ? memo.replace(/\n/g, '|\n|')
    : ':404_notfound.ex-large:'
);

const table = (memo: string) => (
  '|memo|\n' +
  '|----|\n' +
  `|${format(memo)}|`
);

const clientID = process.env.SHOWCASE_CLIENT_ID;
const url = process.env.SHOWCASE_URL+ '/memo';

module.exports = (robot: any) =>{
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, (res: any) => {
    const { message }  = res.message;
    const { id, user } = message;
    if(!user.bot){
      requestPromise(op('get', `${url}/${user.name}`))
        .then((body) => {
          const { memo } = body;
          res.send(
            { type: 'stamp', name: 'writing_hand' },
            `めも！\n${table(memo)}`
          );
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(=|＝)/i, (res: any) => {
    const { message } = res.message;
    const { id, text, user } = message;
    if(!user.bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝)\s?/i, '');
      const qs = {user: user.name, memo};
      requestPromise(op('post', url, qs))
        .then(() => {
          res.send(
            { type: 'stamp', name: 'writing_hand' },
            `メモをアップデートしたやんね！:Hyperblob:\n${table(memo)}`
          );
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, (res: any) => {
    const { message } = res.message;
    const { id, text, user } = message;
    if(!user.bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, '');
      const qs = {user: user.name, memo};
      requestPromise(op('patch', url, qs))
        .then((body) => {
          const { memo } = body;
          res.send(
            { type: 'stamp', name: 'writing_hand' },
            `メモをアップデートしたやんね！:partyparrot_blob:\n${table(memo)}`
          );
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  cron.schedule('0 0 8,16 * * *', () => {
    requestPromise(op('get', `${url}/Ras`))
      .then((body) => {
        const { memo } = body;
        if(memo !== ''){
          robot.send({channelID: IDs.gt_Ras}, `めも！\n${table(memo)}`);
        }
      })
      .catch((err) => {
        console.log(err);
        robot.send({userID: IDs.at_Ras}, err);
      });
  }, { timezone: 'Asia/Tokyo' });
};