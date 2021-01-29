//Description:
//  make or update MEMO.

require('dotenv').config();
const request = require('request');
const cron = require('node-cron');

//requestのoptionをつくる
const option = (url, Q = {}) => ({
  uri: url,
  headers: {'Content-type': 'application/json'},
  qs: Q,
  json: true
});

const url = process.env.SHOWCASE_URL;
const clientID = process.env.SHOWCASE_CLIENT_ID;

module.exports = robot => {
  const gtR_ID ='f58c72a4-14f0-423c-9259-dbb4a90ca35f';
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, res => {
    const { bot, name } = res.message.message.user;
    if(!bot){
      request.get(option(`${url}/${name}?client_id=${clientID}`), (error,respond,body) => {
        if(!error){
          const { memo } = body;
          const formatedMemo = memo !== ''
            ? memo.replace(/\n/gi, '\n|')
            : '\n|:404_notfound.ex-large:|';
          res.send(`|memo\n|-${formatedMemo}|`);
          res.send(
            {
              type: 'stamp',
              name: 'writing_hand'
            }
          );
        }
        else {
          res.send('@Ras Error at memo.js');
        }
      });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(=|＝)/i, res => {
    const { text, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝)/i, '');
      const Q = {user: name, memo};
      request.post(option(`${url}?client_id=${clientID}`, Q), (error, _respond, _body) => {
        if(!error){
          const formatedMemo = memo !== ''
            ? memo.replace(/\n/gi, '\n|')
            : '\n|:404_notfound.ex-large:|';
          res.send(`|memo\n|-${formatedMemo}|`);
          res.send(
            {
              type: 'stamp',
              name: 'writing_hand'
            }
          );
        }
        else{
          res.send('@Ras Error at memo.js');
        }
      });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)/i, res => {
    const { text, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(\+|＋)/i, '');
      const qs = {user: name, memo};
      request.patch(option(qs), (error, respond, body) => {
        if(!error){
          const { memo } = body;
          const formatedMemo = memo !== ''
            ? memo.replace(/\n/gi, '\n|')
            : '\n|:404_notfound.ex-large:|';
          res.send(`|memo\n|-${formatedMemo}|`);
          res.send(
            {
              type: 'stamp',
              name: 'writing_hand'
            }
          );
        }
        else {
          res.send('@Ras Error at memo.js');
        }
      });
    }
  });

  cron.schedule('0 0 8,16 * * *', () => {
    const qs = {user: 'Ras'};
    request.get(option(qs), (error, respond, body) => {
      if(!error){
        const { memo } = body;
        if(memo){
          const formatedMemo = memo.replace(/\n/gi, '\n|');
          robot.send({channelID: gtR_ID}, `|memo\n|-${formatedMemo}|`);
        }
      }
    });
  }, { timezone: 'Asia/Tokyo' });
};