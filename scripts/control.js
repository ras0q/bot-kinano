//Description:
//  reply or send messages when BOT_kinano receives specific words.

const {
  natterus,
  is_mentioned,
  is_not_mentioned,
  loop
} = require('../src/words');
const { getRandom } = require('../modules/random');

//もふもふ
const getMofu = () => {
  const r = new Array(2)
    .fill(null)
    .map(() => String.fromCodePoint(getRandom('ぁ'.codePointAt(0), 'ん'.codePointAt(0) + 1)))
    .join('');
  return r + r;
};

module.exports = robot => {
  const logID = '82b9f8ad-17d9-4597-88f1-0375247a2487';

  //起動時メッセージ
  robot.send(
    {channelID: logID},
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})`
  );

  //メンション付きメッセージ
  is_mentioned.forEach(({ msg, ans }) => {
    robot.respond(msg, res => {
      const { bot } = res.message.message.user;
      if(!bot){
        setTimeout(() => {
          res.reply(ans); //replyでメンション付きメッセージ
        }, 500);
      }
    });
  });

  // メンション無しメッセージ
  is_not_mentioned.forEach(({ msg, ans }) => {
    robot.hear(msg, res => {
      const { bot } = res.message.message.user;
      if(!bot){
        setTimeout(() => {
          res.send(ans); //sendでメンション無しメッセージ
        }, 500);
      }
    });
  });

  //loop
  loop.forEach(({ msg, ans }) => {
    robot.hear(msg, res => {
      const { user, plainText } = res.message.message;
      if(!user.bot){
        const times = plainText.match(msg).length;
        const text = ans.repeat(times);
        const ex = '！'.repeat(times);
        setTimeout(() => {
          res.send(text + ex);
        }, 500);
      }
    });
  });

  //もふもふ
  robot.hear(/もふもふ/, res => {
    const { bot } = res.message.message.user;
    if(!bot){
      setTimeout(() => {
        res.send(getMofu());
      },500);
    }
  });

  //なってる
  robot.hear(/なってる$/, res => {
    const { bot } = res.message.message.user;
    if(!bot){
      setTimeout(() => {
        res.reply(natterus[getRandom(0, natterus.length)]);
      },500);
    }
  });

  //メッセージの時間を返す
  robot.hear(/^\/.*/, res => {
    const { message } = res.message;
    const { id, createdAt, user } = message;
    const { bot } = user;
    if(!bot){
      const time2 = createdAt.slice(0,-1);
      const JPNhour = (Number(time2.substr(11,2)) + 9) % 24; //日本時間に変換
      const JPNhourStr = `0${JPNhour}`.slice(-2);
      const JPNtime = time2.replace(/T../, ' ' + JPNhourStr);
      res.send(`${JPNtime}\nhttps://q.trap.jp/messages/${id}`);
    }
  });
};