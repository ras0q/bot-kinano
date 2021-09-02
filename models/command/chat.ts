//Description:
//  talk with BOT_kinano naturally.

//Reference:
// https://www.notion.so/mebo-73b5b5d1ac5648a69ffe17ac0484e33f
// https://www.notion.so/API-9d11040c878e4e1a98dd609bcefb4641

import fetch, { RequestInit } from 'node-fetch'
import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { Robots } from '../src/types'

const { apiKey, agentId, baseUrl } = defaultEnvs.mebo

module.exports = (robot: Robots) => {
  let chatChannelId = IDs['#g/t/R/Bot']

  robot.hear(/.+/i, async (res) => {
    const { channelId, id, plainText, user } = res.message.message
    const called = plainText.match(/((?<!BOT_)kinano|きなの)(?!gacha)/i)
    const replacedText = plainText.replace(
      /((きなの|kinano)\s|\s(きなの|kinano))/i,
      ''
    ) //前後に空白があれば「きなの」を除く
    if (user.bot) return

    const option: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        api_key: apiKey,
        agent_id: agentId,
        utterance: replacedText,
        uid: user.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (called || chatChannelId === channelId) {
      try {
        const body = await fetch(baseUrl, option)
        const { bestResponse: br } = await body.json()
        if (br === undefined) {
          res.reply(
            'えらーが起きちゃったやんね...\nちょっと休ませてほしいやんね...'
          )
          return
        }
        const { utterance, score, url, imageUrl } = br
        const sc = score.toString().slice(0, 6)
        res.reply(`${utterance} (score: ${sc}) ${url} ${imageUrl}`)
      } catch (err) {
        console.log(err)
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        )
      }
    }
  })

  // Update `chatChannelId`
  robot.hear(/^:koko:$/, (res) => {
    const { channelId, id, user } = res.message.message
    if (!user.bot) {
      chatChannelId = channelId
      res.send({ type: 'stamp', name: 'haakusita' })
      robot.send(
        { channelID: IDs['#g/t/R/B/log'] },
        `\`Chat Channel\` moved here!!\nhttps://q.trap.jp/messages/${id}`
      )
    }
  })
}
