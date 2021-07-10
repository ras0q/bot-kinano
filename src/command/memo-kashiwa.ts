import { Robots } from '../src/types';

const memoRegexp = {
  add: /^a{3,}\s+/,
  edit: /^e{3,}\s+/,
  finish: /^(d{3,}|f{3,})\s+/,
  show: /^s{3}\s*/,
};

module.exports = (robot: Robots) => {
  robot.hear(memoRegexp.add, res => {
    const { user, plainText } = res.message.message;
    if (user.bot) return;
    res.send(`@BOT_kashiwade add 『${plainText.replace(memoRegexp.add, '')}やんね！』`);
  });

  robot.hear(memoRegexp.edit, res => {
    const { user, plainText } = res.message.message;
    if (user.bot) return;
    const [num, txt] = plainText.replace(memoRegexp.edit, '').split(/\s+/);
    res.send(`@BOT_kashiwade edit ${num}『${txt}やんね！』`);
  });

  robot.hear(memoRegexp.finish, res => {
    const { user, plainText } = res.message.message;
    if (user.bot) return;
    res.send(`@BOT_kashiwade finish ${plainText.replace(memoRegexp.finish, '')}`);
  });

  robot.hear(memoRegexp.show, res => {
    if (res.message.message.user.bot) return;
    res.send('@BOT_kashiwade show');
  });
};
