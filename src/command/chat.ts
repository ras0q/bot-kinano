//Description:
//  talk with BOT_kinano naturally.

//Reference:
//https://www.chaplus.jp/
//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

import requestPromise from 'request-promise';
import { getRandom } from '../utils/random';
import { IDs } from '../src/words';
import { Robots } from '../src/types';

const op = (method: string, text: string, userName: string) => ({
  method,
  uri: 'https://www.chaplus.jp/v1/chat',
  qs: { apikey: process.env.CHAPLUS_API_KEY },
  headers: { 'Content-type': 'application/json' },
  json: {
    utterance: text,
    username: userName,
    agentState: {
      agentName: 'きなの',
      age: '14',
    },
  },
});

module.exports = (robot: Robots) => {
  let chatChannelId = '';

  robot.hear(/.+/i, (res) => {
    const { message } = res.message;
    const { channelId, id, plainText, user } = message;
    const called = plainText.match(/((?<!BOT_)kinano|きなの)(?!gacha)/i);
    const replacedText = plainText.replace(/((きなの|kinano)\s|\s(きなの|kinano))/i, ''); //前後に空白があれば「きなの」を除く
    if (!user.bot && (called || chatChannelId === channelId)) {
      requestPromise(op('post', replacedText, user.displayName))
        .then((body) => {
          const { responses } = body;
          const i = getRandom(0, responses.length);
          res.reply(`${responses[i].utterance}`);
        })
        .catch((err) => {
          console.log(err);
          robot.send(
            { userID: IDs.at_Ras },
            `${err}\nhttps://q.trap.jp/messages/${id}`
          );
        });
    }
  });

  // Update `chatChannelId`
  robot.hear(/^:koko:$/, (res) => {
    const { channelId, id, user } = res.message.message;
    if (!user.bot) {
      chatChannelId = channelId;
      res.send({ type: 'stamp', name: 'haakusita' });
      robot.send(
        { channelID: IDs.gtRB_log },
        `\`Chat Channel\` moved here!!\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });
};
