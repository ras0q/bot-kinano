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

const url = process.env.SHOWCASE_URL+ '/memo';
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
          res.send('@Ras Error at memo.js: ' + error.toString());
        }
      });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(=|＝)+/i, res => {
    const { text, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝|\s)+/i, '\n');
      const Q = {user: name, memo};
      request.post(option(`${url}?client_id=${clientID}`, Q), (error, _respond, _body) => {
        if(!error){
          const formatedMemo = memo !== ''
            ? memo.replace(/\n/gi, '|\n|')
            : '\n|:404_notfound.ex-large:|';
          res.send(`|memo|\n|-${formatedMemo}|`);
          res.send(
            {
              type: 'stamp',
              name: 'writing_hand'
            }
          );
        }
        else{
          res.send('@Ras Error at memo.js: ' + error.toString());
        }
      });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋|\s)*\n/i, res => {
    const { text, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(\+|＋|\s)*/i, '\n');
      const qs = {user: name, memo};
      request.patch(option(`${url}?client_id=${clientID}`, qs), (error, respond, body) => {
        if(!error){
          const { memo } = body;
          const formatedMemo = memo !== ''
            ? memo.replace(/\n/gi, '|\n|')
            : '\n|:404_notfound.ex-large:|';
          res.send(`|memo|\n|-${formatedMemo}|`);
          res.send(
            {
              type: 'stamp',
              name: 'writing_hand'
            }
          );
        }
        else {
          res.send('@Ras Error at memo.js: ' + error.toString());
        }
      });
    }
  });

  cron.schedule('0 0 8,16 * * *', () => {
    request.get(option(`${url}/Ras?client_id=${clientID}`), (error,respond,body) => {
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