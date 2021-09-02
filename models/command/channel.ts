//Description:
//  Let BOT_kinano join to or leave from a channel.

import { Robots } from '../src/types'
import { join, leave } from '../usecase/channel'

module.exports = (robot: Robots) => {
  //監視対象に追加
  robot.respond(/(いらっしゃい|join)$/i, join)

  //監視対象から解除
  robot.respond(/(ばいばい|バイバイ|bye)$/i, leave)
}
