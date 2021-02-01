//Description:
//  Let BOT_kinano join to or leave from a channel.

const api = require('../src/traqapi');
const {
  gtRB_log,
  at_Ras,
  gitea
} = require('../src/words').IDs;

module.exports = robot => {
  //監視対象に追加
  robot.respond(/(いらっしゃい|join)$/i, res => {
    const { id, channelId } = res.message.message;
    robot.send({userID: at_Ras}, `## join\n https://q.trap.jp/messages/${id}`);
    try {
      api.join(channelId);
      setTimeout(() => {
        res.reply(':oisu-1::oisu-2::oisu-3::oisu-4yoko:');
      }, 500);
      setTimeout(() => {
        res.reply('きなのの機能は以下のコマンドで見れるやんね！\n`@BOT_kinano できること`');
      }, 2000);
    }
    catch(error) {
      robot.send(
        {channelID: gtRB_log},
        `@Ras error at ${gitea}/channel.js\n \`\`\`${error}\`\`\`\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  //監視対象から解除
  robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
    const { id, channelId } = res.message.message;
    robot.send(
      {userID: at_Ras},
      `## leave\n https://q.trap.jp/messages/${id}`
    );
    try {
      api.leave(channelId);
      setTimeout(() => {
        res.reply('ばいばいやんね～、また遊んでやんね～');
      }, 500);
    }
    catch(error) {
      robot.send(
        {channelID: gtRB_log},
        `@Ras error at ${gitea}/channel.js\n \`\`\`${error}\`\`\`\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

};