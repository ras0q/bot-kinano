//Description:
//  reply or send messages when BOT_kinano receives specific words.

const {
  natterus,
  is_mentioned,
  is_not_mentioned,
  loops,
  IDs
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
  //起動時メッセージ
  robot.send(
    {channelID: IDs.gtRB_log},
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})\n`
  );

  //メンション付きメッセージ
  is_mentioned.forEach(({ msg, ans }) => {
    robot.respond(msg, res => {
      if(!res.message.message.user.bot){
        setTimeout(() => {
          res.reply(ans); //replyでメンション付きメッセージ
        }, 500);
      }
    });
  });

  // メンション無しメッセージ
  is_not_mentioned.forEach(({ msg, ans }) => {
    robot.hear(msg, res => {
      if(!res.message.message.user.bot){
        setTimeout(() => {
          res.send(ans); //sendでメンション無しメッセージ
        }, 500);
      }
    });
  });

  //loops
  loops.forEach(({ msg, ans }) => {
    robot.hear(msg, res => {
      const { message } = res.message;
      const { plainText, user } = message;
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
    if(!res.message.message.user.bot){
      setTimeout(() => {
        res.send(getMofu());
      }, 500);
    }
  });

  //なってる
  robot.hear(/なってる$/, res => {
    if(!res.message.message.user.bot){
      setTimeout(() => {
        res.reply(natterus[getRandom(0, natterus.length)]);
      }, 500);
    }
  });
};