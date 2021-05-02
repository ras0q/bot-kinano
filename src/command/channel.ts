//Description:
//  Let BOT_kinano join to or leave from a channel.

import { join, leave } from '../src/traqapi';
import { Robots } from '../src/types';
import { IDs } from '../src/words';

module.exports = (robot: Robots) => {
  //監視対象に追加
  robot.respond(/(いらっしゃい|join)$/i, res => {
    const { channelId, id } = res.message.message;
    robot.send({userID: IDs.at_Ras}, `## join\n https://q.trap.jp/messages/${id}`);
    try {
      join(channelId);
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
        { userID: IDs.at_Ras },
        `${err}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  //監視対象から解除
  robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
    const { channelId, id } = res.message.message;
    robot.send(
      { userID: IDs.at_Ras },
      `## leave\n https://q.trap.jp/messages/${id}`
    );
    try {
      leave(channelId);
      setTimeout(() => {
        res.reply('ばいばいやんね～、また遊んでやんね～');
      }, 500);
    } catch (err) {
      robot.send(
        { userID: IDs.at_Ras },
        `${err}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });
};
