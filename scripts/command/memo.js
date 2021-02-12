//Description:
//  make or update MEMO.

const rp = require('request-promise');
const cron = require('node-cron');
const {
  at_Ras,
  gt_Ras
} = require('../src/words').IDs;

const op = (method, url, qs) => ({
  method,
  uri: `${url}?client_id=${clientID}`,
  headers: {'Content-type': 'application/json'},
  qs,
  json: true
});

const format = (memo) => (
  memo !== ''
    ? memo.replace(/\n/g, '|\n|')
    : ':404_notfound.ex-large:'
);

const table = (memo) => (
  '|memo|\n' +
  '|----|\n' +
  `|${format(memo)}|`
);

const clientID = process.env.SHOWCASE_CLIENT_ID;
const url = process.env.SHOWCASE_URL+ '/memo';

module.exports = robot => {
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, res => {
    const { message }  = res.message;
    const { id, user } = message;
    if(!user.bot){
      rp(op('get', `${url}/${user.name}`))
        .then((body) => {
          const { memo } = body;
          res.send(
            { type: 'stamp', name: 'writing_hand' },
            table(memo)
          );
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(=|＝)/i, res => {
    const { message } = res.message;
    const { id, text, user } = message;
    if(!user.bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝)\s?/i, '');
      const qs = {user: user.name, memo};
      rp(op('post', url, qs))
        .then(() => {
          res.send(
            { type: 'stamp', name: 'writing_hand' },
            table(memo)
          );
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, res => {
    const { message } = res.message;
    const { id, text, user } = message;
    if(!user.bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, '');
      const qs = {user: user.name, memo};
      rp(op('patch', url, qs))
        .then((body) => {
          const { memo } = body;
          res.send(
            { type: 'stamp', name: 'writing_hand' },
            table(memo)
          );
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  cron.schedule('0 0 8,16 * * *', () => {
    rp(op('get', `${url}/Ras`))
      .then((body) => {
        const { memo } = body;
        if(memo !== ''){
          robot.send({channelID: gt_Ras}, table(memo));
        }
      })
      .catch((err) => {
        console.log(err);
        robot.send({userID: at_Ras}, err);
      });
  }, { timezone: 'Asia/Tokyo' });
};