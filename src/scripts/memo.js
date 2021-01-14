//Description:
//  make or update MEMO.

require('dotenv').config();
const request = require('request');
const cron = require('node-cron');

//requestのoptionをつくる
const option = Q => ({
  uri: process.env.MEMO_SS, //SS
  headers: {'Content-type': 'application/json'},
  qs: Q,
  json: true
});

module.exports = robot => {
  const gtR_ID ='f58c72a4-14f0-423c-9259-dbb4a90ca35f';
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, res => {
    const { bot, name } = res.message.message.user;
    if(!bot){
      const qs = {user: name};
      request.get(option(qs), (error,respond,body) => {
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
      const qs = { user: name, memo };
      request.post(option(qs), (error, _respond, _body) => {
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
      const i = text.search(/(\+|＋)/);
      const qs = {user: name};
      request.get(option(qs), (error, respond, body) => {
        if(!error){
          const { memo } = body;
          const updatedMemo = memo + text.slice(i + 1);
          const formatedMemo = updatedMemo.replace(/\n/gi, '\n|');
          const qs2 = {user: name, memo: updatedMemo};
          request.post(option(qs2), (error2, _respond, _body) => {
            if(!error2){
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
        else{
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
        const formatedMemo = memo !== ''
          ? memo.replace(/\n/gi, '\n|')
          : '\n|:404_notfound.ex-large:|';
        robot.send({channelID: gtR_ID}, `|memo\n|-${formatedMemo}|`);
      }
    });
  }, { timezone: 'Asia/Tokyo' });
};