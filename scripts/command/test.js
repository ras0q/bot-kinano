//Description:
// work in progress.

const gtRB_ID = '2a5616d5-5d69-4716-8377-1e1fb33278fe';

module.exports = robot => {
  // sample
  robot.hear(/fuga/, res => {
    res.send('fugafuga');
  });

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

  // BotMessageStampsUpdated
  robot.catchAll(res => {
    const { type, stamps, messageId } = res.message;
    const { stampName, userId } = stamps[0];
    if(type === 'BotMessageStampsUpdated' && (stampName === 'eenyade' || stampName === 'eennyade') && Math.random() > 0.9){
      robot.send({channelID: 'f58c72a4-14f0-423c-9259-dbb4a90ca35f'},
        `!{"type":"user","raw":"いいわけないだろ！！！","id":"${userId}"}\nhttps://q.trap.jp/messages/${messageId}`
      );
    }
  });
};
