//Description:
// work in progress.

import { Robots } from '../src/types';
import { IDs } from '../src/words';

module.exports = (robot: Robots) =>{
  robot.respond(/info/, res => {
    if(res.message.message.channelId === IDs.gtR_Bot) {
      res.send(`\`\`\`\n${JSON.stringify(res.message, null, '\t')}\n\`\`\``);
    }
  });

  robot.hear(/.+[食た]べたい$/, res => {
    const query = res.message.message.plainText
      .match(/.+(?=[食た]べたい)/);
    res.reply(`https://www.kurashiru.com/search?query=${query}`);
  });
};
