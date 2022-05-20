//Description:
// hide and seek

import {
  getChannel,
  getChannels,
  getLastMessage,
  pushKinanoStamp,
  removeKinanoStamp
} from '../src/traqapi'
import { Robots } from '../src/types'
import shuffle from '../utils/random'

module.exports = (robot: Robots) => {
  let hideandseekChannelId = ''
  let hideandseekMessageId = ''

  robot.respond(/かくれんぼしよう/, async (res) => {
    const { message } = res.message
    const { user, plainText } = message

    if (user.bot) return
    if (hideandseekChannelId) {
      res.reply('かくれんぼが進行中やんね！一緒に探すやんね！')
      return
    }

    const _channels = plainText.includes('hard')
      ? await getChannels()
      : await getChannels('8ed62c7d-3f4b-41c8-a446-29edeebc36c3') // get childlen of #gps/times
    const channels = shuffle(_channels)

    for (const channelId of channels) {
      const ch = await getChannel(channelId)
      if (ch.archived) continue

      const lastMessageArr = await getLastMessage(channelId)
      if (lastMessageArr.length === 0) continue

      const lastMessage = lastMessageArr[0]
      hideandseekChannelId = lastMessage.channelId
      hideandseekMessageId = lastMessage.id
      pushKinanoStamp(lastMessage.id)

      res.send(
        'どこかのチャンネルに:kinano:スタンプを押してきたやんね！\n' +
          '見つけたら`@BOT_kinano みつけた {{チャンネル名}}`と送ってほしいやんね！\n' +
          '制限時間は10分やんね！よーいすたーと！！！'
      )

      setTimeout(async () => {
        if (hideandseekChannelId === '') return

        const ch = await getChannel(hideandseekChannelId)
        res.reply(
          '制限時間終了やんね！\n' +
            `正解は#gps/times/${ch.name}でした！やんね！\n` +
            'スタンプは10秒後にきなのが消しておくやんね！'
        )
        setTimeout(() => {
          removeKinanoStamp(hideandseekMessageId)
          hideandseekChannelId = ''
          hideandseekMessageId = ''
        }, 10000)
      }, 1000 * 60 * 10)

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
