//Description:
//  Let BOT_kinano join to or leave from a channel.

const api = require('../lib/traqapi');

module.exports = robot => {

  const gtRB_ID = '2a5616d5-5d69-4716-8377-1e1fb33278fe';
  const RasID = '82b9f8ad-17d9-4597-88f1-0375247a2487';

  //監視対象に追加
  robot.respond(/(いらっしゃい|join)$/i, res => {
    const { id, channelId } = res.message.message;
    robot.send(
      {userID: RasID},
      `## join\n https://q.trap.jp/messages/${id}`
    );
    try {
      api.join(channelId);
      setTimeout(() => {
        res.reply(':oisu-1::oisu-2::oisu-3::oisu-4yoko:');
      },500);
      setTimeout(() => {
        res.reply('きなのの機能を表示するには以下のコマンドを打つやんね！\n`@BOT_kinano できること`');
      },1000);
    }
    catch(error) {
      robot.send(
        {channelID: gtRB_ID},
        `@Ras\n## error at channel.js\n${error}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  //監視対象から解除
  robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
    const { id, channelId } = res.message.message;
    robot.send(
      {userID: RasID},
      `## leave\n https://q.trap.jp/messages/${id}`
    );
    try {
      api.leave(channelId);
      setTimeout(() => {
        res.reply('ばいばいやんね～、また遊んでやんね～');
      },500);
    }
    catch(error) {
      robot.send(
        {channelID: gtRB_ID},
        `@Ras\n## error at channel.js\n${error}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

};