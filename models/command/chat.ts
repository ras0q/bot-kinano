//Description:
//  talk with BOT_kinano naturally.

//Reference:
// https://www.notion.so/mebo-73b5b5d1ac5648a69ffe17ac0484e33f
// https://www.notion.so/API-9d11040c878e4e1a98dd609bcefb4641

import { Robots } from '../src/types'
import { postChatReply, updateChatChannel } from '../usecase/chat'

module.exports = (robot: Robots) => {
  // mebo apiから返信を取得しtraQに投稿する
  robot.hear(/.+/i, postChatReply)

  // チャットするチャンネルを更新する
  robot.hear(/^:koko:$/, updateChatChannel)
}
