//Description:
//  reply or send messages when BOT_kinano receives specific words.

import { MessageStamp } from '@traptitech/traq'
import { api } from '../src/traqapi'
import { Robots } from '../src/types'
import * as words from '../src/words'
import { getMofu } from '../utils/mofu'
import { getRandom } from '../utils/random'
import { IDs } from '../config/id'

const isExecuted = (stamps: MessageStamp[]) =>
  stamps.some((stamp) => stamp.userId === IDs['@BOT_kinano'])

module.exports = (robot: Robots) => {
  //メンション付きメッセージ
  words.isMentioned.forEach(({ msg, ans }) => {
    robot.respond(msg, (res) => {
      if (!res.message.message.user.bot) {
        setTimeout(() => {
          res.reply(ans)
        }, 500)
      }
    })
  })

  // メンション無しメッセージ
  words.isNotMentioned.forEach(({ msg, ans }) => {
    robot.hear(msg, (res) => {
      if (!res.message.message.user.bot) {
        setTimeout(() => {
          res.send(ans)
        }, 500)
      }
    })
  })

  //loops
  words.loops.forEach(({ msg, ans }) => {
    robot.hear(msg, (res) => {
      const { plainText, user } = res.message.message
      if (!user.bot) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const times = plainText.match(msg)!.length
        const text = ans.repeat(times)
        const ex = '！'.repeat(times)
        setTimeout(() => {
          res.send(text + ex)
        }, 500)
      }
    })
  })

  //もふもふ
  robot.hear(/もふもふ/, (res) => {
    if (!res.message.message.user.bot) {
      setTimeout(() => {
        res.send(getMofu())
      }, 500)
    }
  })

  //なってる
  robot.hear(/なってる$/, (res) => {
    if (!res.message.message.user.bot) {
      setTimeout(() => {
        res.reply(words.natterus[getRandom(0, words.natterus.length)])
      }, 500)
    }
  })

  // BotMessageStampsUpdated
  robot.catchAll((res) => {
    if (res.message.type === 'BotMessageStampsUpdated') {
      const { stamps, messageId } = res.message
      if (!stamps) return
      const { stampName, userId } = stamps.slice(-1)[0]
      switch (stampName) {
        case 'eenyade':
        case 'eennyade':
        case 'eenyadesu':
          if (Math.random() > 0.9) {
            api
              .getMessage(messageId)
              .then((body) => {
                const { channelId } = body.data
                robot.send(
                  { channelID: channelId },
                  `# !{"type":"user","raw":"いいわけないだろ！！！","id":"${userId}"}\nhttps://q.trap.jp/messages/${messageId}`
                )
              })
              .catch((err) => {
                console.log(err)
                robot.send(
                  { userID: IDs['@Ras'] },
                  `${err}\nhttps://q.trap.jp/messages/${messageId}`
                )
              })
          }
          break
        case 'Do_it':
          api
            .getMessage(messageId)
            .then((body) => {
              const { channelId, content, stamps } = body.data
              const regexp = new RegExp(
                'きなのの機能を見るにはこのメッセージに:Do_it:スタンプを押すやんね！'
              )
              if (regexp.test(content) && !isExecuted(stamps)) {
                api
                  .addMessageStamp(
                    messageId,
                    '68c4cc50-487d-44a1-ade3-0808023037b8',
                    { count: 100 }
                  )
                  .then(() => {
                    robot.send({ channelID: channelId }, words.readme)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
              robot.send(
                { userID: IDs['@Ras'] },
                `${err}\nhttps://q.trap.jp/messages/${messageId}`
              )
            })
          break
      }
    }
  })
}
