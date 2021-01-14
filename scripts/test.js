//Description:
// work in progress.

// BotMessageStampsUpdated
module.exports = robot => {
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
