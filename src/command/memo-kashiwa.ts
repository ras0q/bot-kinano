import { Robots } from '../src/types';

const memoRegexp = {
  add: /^a{3,}\s+/,
  edit: /^e{3,}\s+/,
  finish: /^(d{3,}|e{3,})\s+/,
  show: /^s{3}\s*/,
};

module.exports = (robot: Robots) => {
  robot.hear(memoRegexp.add, res => {
    const { user, plainText } = res.message.message;
    if (user.bot) return;
    res.send(`@BOT_kashiwade memo add ${plainText.replace(memoRegexp.add, '')}やんね！`);
  });

  robot.hear(memoRegexp.edit, res => {
    const { user, plainText } = res.message.message;
    if (user.bot) return;
    const [num, txt] = plainText.replace(memoRegexp.edit, '').split(/\s+/);
    res.send(`@BOT_kashiwade memo edit ${num}${txt}やんね！`);
  });

  robot.hear(memoRegexp.finish, res => {
    const { user, plainText } = res.message.message;
    if (user.bot) return;
    res.send(`@BOT_kashiwade memo finish ${plainText.replace(memoRegexp.finish, '')}`);
  });

  robot.hear(memoRegexp.show, res => {
    if (res.message.message.user.bot) return;
    res.send('@BOT_kashiwade memo show');
  });
};
