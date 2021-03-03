//Description:
// work in progress.

const gtRB_ID = '2a5616d5-5d69-4716-8377-1e1fb33278fe';

module.exports = robot => {
  robot.respond(/info/, res => {
    if(res.message.message.channelId === gtRB_ID) {
      res.send(`\`\`\`\n${JSON.stringify(res.message, null, '\t')}\n\`\`\``);
    }
  });

  robot.hear(/.+[食た]べたい$/, res => {
    const query = res.message.message.plainText
      .match(/.+(?=[食た]べたい)/);
    res.reply(`https://www.kurashiru.com/search?query=${query}`);
  });
};
