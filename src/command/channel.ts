//Description:
//  Let BOT_kinano join to or leave from a channel.

import { join, leave } from '../src/traqapi';
import { Robots } from '../src/types';
import { IDs } from '../src/words';

module.exports = (robot: Robots) => {
  //監視対象に追加
  robot.respond(/(いらっしゃい|join)$/i, async (res) => {
    const { channelId, id } = res.message.message;
    robot.send(
      { userID: IDs['@Ras'] },
      `## join\n https://q.trap.jp/messages/${id}`
    );
    try {
      await join(channelId);
      setTimeout(() => {
        res.reply(':oisu-1::oisu-2::oisu-3::oisu-4yoko:');
      }, 500);
      setTimeout(() => {
        res.reply(
          'きなのの機能を見るにはこのメッセージに:Do_it:スタンプを押すやんね！'
        );
      }, 2000);
    } catch (err) {
      robot.send(
        { userID: IDs['@Ras'] },
        `${err}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  //監視対象から解除
  robot.respond(/(ばいばい|バイバイ|bye)$/i, async (res) => {
    const { channelId, id } = res.message.message;
    robot.send(
      { userID: IDs['@Ras'] },
      `## leave\n https://q.trap.jp/messages/${id}`
    );
    try {
      await leave(channelId);
      setTimeout(() => {
        res.reply('ばいばいやんね～、また遊んでやんね～');
      }, 500);
    } catch (err) {
      robot.send(
        { userID: IDs['@Ras'] },
        `${err}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });
};
