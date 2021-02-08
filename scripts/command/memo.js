//Description:
//  make or update MEMO.

require('dotenv').config();
const request = require('request');
const cron = require('node-cron');
const {
  gt_Ras,
  gtRB_log,
  gitea
} = require('../src/words').IDs;

const option = (url, Q = {}) => ({
  uri: url,
  headers: {'Content-type': 'application/json'},
  qs: Q,
  json: true
});

const format = (memo) => (
  memo !== ''
    ? memo.replace(/\n/gi, '|\n|')
    : '|:404_notfound.ex-large:'
);

const clientID = process.env.SHOWCASE_CLIENT_ID;
const url = process.env.SHOWCASE_URL+ '/memo';

module.exports = robot => {
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, res => {
    const { bot, name } = res.message.message.user;
    if(!bot){
      request.get(option(`${url}/${name}?client_id=${clientID}`), (error, respond, body) => {
        if(error){
          res.send(`@Ras Error at ${gitea}/memo.js: ${error.toString()}`);
        }
        else {
          const { memo } = body;
          res.send(`|memo\n|-|\n${format(memo)}|`);
          res.send({ type: 'stamp', name: 'writing_hand' });
        }
      });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(=|＝)\s?/i, res => {
    const { text, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(=|＝)\s?/i, '');
      const Q = {user: name, memo};
      request.post(option(`${url}?client_id=${clientID}`, Q), (error, _respond, _body) => {
        if(error){
          res.send('@Ras Error at memo.js: ' + error.toString());
        }
        else{
          res.send(`|memo|\n|-|\n${format(memo)}|`);
          res.send({type: 'stamp', name: 'writing_hand'});
        }
      });
    }
  });

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, res => {
    const { text, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const memo = text.replace(/^(me|め|メ)(mo|も|モ)(\+|＋)\s?/i, '');
      const qs = {user: name, memo};
      request.patch(option(`${url}?client_id=${clientID}`, qs), (error, respond, body) => {
        if(error){
          res.send(`@Ras Error at ${gitea}/memo.js: ${error.toString()}`);
        }
        else {
          const { memo } = body;
          res.send(`|memo|\n|-|\n${format(memo)}|`);
          res.send({type: 'stamp', name: 'writing_hand'});
        }
      });
    }
  });

  cron.schedule('0 0 8,16 * * *', () => {
    request.get(option(`${url}/Ras?client_id=${clientID}`), (error, respond, body) => {
      if(error) {
        robot.send({channelID: gtRB_log}, `@Ras Error at ${gitea}/memo.js: ${error.toString()}`);
      }
      else {
        const { memo } = body;
        if(memo){
          robot.send({channelID: gt_Ras}, `|memo\n|-|\n${format(memo)}|`);
        }
      }
    });
  }, { timezone: 'Asia/Tokyo' });
};