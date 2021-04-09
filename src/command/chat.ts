//Description:
//  talk with BOT_kinano naturally.

//Reference:
//https://www.chaplus.jp/
//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

import requestPromise from 'request-promise';
import { getRandom } from '../utils/random';
import { IDs } from '../src/words';

const op = (method: any, message: any) => ({
  method,
  uri: 'https://www.chaplus.jp/v1/chat',
  qs: {'apikey': process.env.CHAPLUS_API_KEY},
  headers: {'Content-type': 'application/json'},
  json: {
    'utterance': message.plainText,
    'username': message.user.displayName,
    'agentState': {
      'agentName': 'きなの',
      'age': '14',
    }
  }
});

module.exports = (robot: any) =>{
  let chatChannelId = '';

  robot.hear(/.+/i, (res: any) => {
    const { message } = res.message;
    const { channelId, id, plainText, user } = message;
    const called = /((?<!BOT_)kinano|きなの)/i.test(plainText);
    if(!user.bot && (called || chatChannelId === channelId)){
      requestPromise(op('post', message))
        .then((body) => {
          const { responses } = body;
          const i = getRandom(0, (responses).length);
          res.reply(`${responses[i].utterance}`);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  // Update `chatChannelId`
  robot.hear(/^:koko:$/, (res: any) => {
    const { message } = res.message;
    const { channelId, id, user } = message;
    if(!user.bot){
      chatChannelId = channelId;
      res.send({type: 'stamp', name: 'haakusita'});
      robot.send({channelID: IDs.gtRB_log}, `\`Chat Channel\` moved here!!\nhttps://q.trap.jp/messages/${id}`);
    }
  });
};

