//Description:
// work in progress.

module.exports = robot => {
  // sample
  robot.hear(/fuga/, res => {
    res.send('fugafuga');
  });

  robot.hear(/.+[食た]べたい$/, res => {
    const query = res.message.message.plainText
      .match(/.+(?=[食た]べたい)/);
    res.reply(`https://cookpad.com/search/${query}`);
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
