//Description:
// work in progress.

import { Robots } from '../src/types';
import { getMofu } from '../utils/mofu';
import { IDs } from '../src/words';

module.exports = (robot: Robots) =>{
  robot.respond(/info/, res => {
    if(res.message.message.channelId === IDs.gtR_Bot) {
      res.send(`\`\`\`\n${JSON.stringify(res.message, null, '\t')}\n\`\`\``);
    }
  });

  robot.hear(/.+[食た]べたい$/, res => {
    const { message } = res.message;
    const { user, plainText } = message;
    if (!user.bot) {
      const query = plainText.match(/.+(?=[食た]べたい)/);
      res.reply(`https://www.kurashiru.com/search?query=${query}`);
    }
  });

  robot.hear(/kinanogacha/i, res => {
    if(!res.message.message.user.bot) {
      for(let i = 0; i < 10; i++) {
        setTimeout(() => {
          res.send(getMofu());
        }, i * 100);
      }
    }
  });
};
