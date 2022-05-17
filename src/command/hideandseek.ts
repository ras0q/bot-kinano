//Description:
// hide and seek

import {
  getChannel,
  getLastMessage,
  getTimes,
  pushKinanoStamp,
  removeKinanoStamp
} from '../src/traqapi'
import { Robots } from '../src/types'
import shuffle from '../utils/random'

module.exports = (robot: Robots) => {
  let hideandseekChannelId = ''
  let hideandseekMessageId = ''

  robot.respond(/かくれんぼしよう/, async (res) => {
    if (res.message.message.user.bot) return
    if (hideandseekChannelId) {
      res.reply('かくれんぼが進行中やんね！一緒に探すやんね！')
      return
    }

    const _times = await getTimes()
    const times = shuffle(_times)
    for (const channelId of times) {
      const ch = await getChannel(channelId)
      if (ch.archived) continue

      const lastMessage = await getLastMessage(channelId)
      hideandseekChannelId = lastMessage.channelId
      hideandseekMessageId = lastMessage.id
      pushKinanoStamp(lastMessage.id)

      res.send(
        'たいむずのどこかに:kinano:スタンプを押してきたやんね！\n' +
          '見つけたら`@BOT_kinano みつけた {{チャンネル名}}`と送ってほしいやんね！'
      )

      return
    }
  })

  robot.respond(/みつけた.*#gps\/times\/.+/, (res) => {
    const { user, embedded } = res.message.message
    if (user.bot) return

    if (hideandseekChannelId === '') {
      res.reply('今はかくれんぼしてないやんね！')
      return
    }

    const channelEmbedded = embedded.filter((v) => v.type === 'channel')
    if (channelEmbedded.length !== 1) {
      res.reply('チャンネル名は1個だけ指定してほしいやんね～')
      return
    }

    if (channelEmbedded[0].id === hideandseekChannelId) {
      res.reply(
        '正解やんね:tada.ex-large.zoom.zoom: ぴんぽんぴんぽ～ん\n' +
          'スタンプは10秒後にきなのが消しておくやんね！\n' +
          'もう1回かくれんぼをするには`@BOT_kinano かくれんぼしよう`と送ってほしいやんね！\n'
      )
      setTimeout(() => {
        removeKinanoStamp(hideandseekMessageId)
        hideandseekChannelId = ''
        hideandseekMessageId = ''
      }, 10000)
    } else {
      res.reply(
        '残念！まだまだ探すやんね！\n' +
          '諦める場合は`@BOT_kinano 負けました`と送るやんね'
      )
    }
  })

  robot.respond(/負けました/, async (res) => {
    if (res.message.message.user.bot) return
    if (hideandseekChannelId === '') {
      res.reply('今はかくれんぼしてないやんね！')
      return
    }

    const ch = await getChannel(hideandseekChannelId)
    res.reply(
      'きなのの勝ちやんね！\n' +
        `正解は#gps/times/${ch.name}でした！やんね！\n` +
        'スタンプは10秒後にきなのが消しておくやんね！'
    )
    setTimeout(() => {
      removeKinanoStamp(hideandseekMessageId)
      hideandseekChannelId = ''
      hideandseekMessageId = ''
    }, 10000)
  })
}
