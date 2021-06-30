//Description:
//  talk with BOT_kinano naturally.

//Reference:
//https://www.chaplus.jp/
//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

import fetch, { RequestInit } from 'node-fetch';
import { getRandom } from '../utils/random';
import { IDs } from '../src/words';
import { Robots } from '../src/types';

const apiKey = process.env.CHAPLUS_API_KEY;
const baseApiUrl = `https://www.chaplus.jp/v1/chat?apikey=${apiKey}`;

module.exports = (robot: Robots) => {
  let chatChannelId = IDs['#g/t/R/Bot'];

  robot.hear(/.+/i, async (res) => {
    const { message } = res.message;
    const { channelId, id, plainText, user } = message;
    const called = plainText.match(/((?<!BOT_)kinano|きなの)(?!gacha)/i);
    const replacedText = plainText.replace(/((きなの|kinano)\s|\s(きなの|kinano))/i, ''); //前後に空白があれば「きなの」を除く

    const option: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        utterance: replacedText,
        agentState: {
          agentName: 'きなの',
          age: '20'
        }
      })
    };

    if (!user.bot && (called || chatChannelId === channelId)) {
      try {
        const body = await fetch(baseApiUrl, option);
        const { responses } = await body.json();
        console.log(body);
        const r = getRandom(0, responses.length);
        res.reply(`${responses[r].utterance}`);
      } catch (err) {
        console.log(err);
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        );
      }
    }
  });

  // Update `chatChannelId`
  robot.hear(/^:koko:$/, (res) => {
    const { channelId, id, user } = res.message.message;
    if (!user.bot) {
      chatChannelId = channelId;
      res.send({ type: 'stamp', name: 'haakusita' });
      robot.send(
        { channelID: IDs['#g/t/R/B/log'] },
        `\`Chat Channel\` moved here!!\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });
};
