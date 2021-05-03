//Description:
// work in progress.

import { Robots } from '../src/types';
import { getMofu } from '../utils/mofu';
import { IDs } from '../src/words';
import { getRandom } from '../utils/random';

module.exports = (robot: Robots) => {
  robot.respond(/info/, (res) => {
    if (res.message.message.channelId === IDs.gtR_Bot) {
      res.send(`\`\`\`\n${JSON.stringify(res.message, null, '\t')}\n\`\`\``);
    }
  });

  robot.hear(/.+[食た]べたい$/, res => {
    const { user, plainText } = res.message.message;
    if (!user.bot) {
      const query = plainText.match(/.+(?=[食た]べたい)/);
      res.reply(`https://www.kurashiru.com/search?query=${query}`);
    }
  });

  robot.hear(/kinanogacha/i, (res) => {
    if (!res.message.message.user.bot) {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          res.send(getMofu());
        }, i * 100);
      }
    }
  });

  robot.hear(/catgacha/i, (res) => {
    if (!res.message.message.user.bot) {
      const n = getRandom(0, 200);
      const cat = ':longcat_1:\n' + ':longcat_2:\n'.repeat(n) + ':longcat_3:\n';
      res.send(cat);
    }
  });
};
