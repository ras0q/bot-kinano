//Description:
// hide and seek

import { Message } from '@traptitech/traq'
import {
  getChannel,
  getChannelPath,
  getChannels,
  getLastMessage,
  pushKinanoStamp,
  removeKinanoStamp
} from '../src/traqapi'
import { Embedded, Robots } from '../src/types'
import shuffle from '../utils/random'

module.exports = (robot: Robots) => {
  let hideandseekChannelId = ''
  let hideandseekMessageId = ''
  let hideandseekAnswerChannelId = ''
  let timerId: NodeJS.Timeout

  const isInProgress = () => hideandseekChannelId !== ''

  const isAnswerChannelId = (channelId: string) =>
    channelId === hideandseekAnswerChannelId

  const embeddedChannelIds = (embedded: Embedded) =>
    embedded.filter((v) => v.type === 'channel').map((v) => v.id)

  const isCorrectAnswer = (channelId: string) =>
    channelId === hideandseekChannelId

  const setStart = (lastMessage: Message, messageChannelId: string) => {
    pushKinanoStamp(lastMessage.id)
    hideandseekChannelId = lastMessage.channelId
    hideandseekMessageId = lastMessage.id
    hideandseekAnswerChannelId = messageChannelId
  }

  const setEnd = () => {
    removeKinanoStamp(hideandseekMessageId)
    hideandseekChannelId = ''
    hideandseekMessageId = ''
    hideandseekAnswerChannelId = ''
  }

  robot.respond(/かくれんぼしよう/, async (res) => {
    const { message } = res.message
    const { user, plainText } = message

    if (user.bot) {
      return
    } else if (isInProgress()) {
      res.reply('かくれんぼが進行中やんね！一緒に探すやんね！')
      return
    }

    const isHardMode = plainText.includes('hard')

    const _channels = isHardMode
      ? await getChannels()
      : await getChannels('8ed62c7d-3f4b-41c8-a446-29edeebc36c3') // get childlen of #gps/times
    const channels = shuffle(_channels)

    for (const channelId of channels) {
      const ch = await getChannel(channelId)
      if (ch.archived) continue

      const lastMessageArr = await getLastMessage(channelId)
      if (lastMessageArr.length === 0) continue

      setStart(lastMessageArr[0], message.channelId)

      const channelStr = isHardMode ? 'チャンネル' : 'たいむず'
      res.send(
        `どこかの${channelStr}に:kinano:スタンプを押してきたやんね！\n` +
          '見つけたら`@BOT_kinano みつけた {{チャンネル名}}`と送ってほしいやんね！\n' +
          '制限時間は10分やんね！よーいすたーと！！！'
      )

      timerId = setTimeout(async () => {
        if (!isInProgress()) return

        const path = await getChannelPath(hideandseekChannelId)
        res.reply(
          '制限時間終了やんね！\n' +
            `正解は${path}でした！やんね！\n` +
            'スタンプは10秒後にきなのが消しておくやんね！'
        )
        setTimeout(setEnd, 1000 * 10)
      }, 1000 * 60 * 10)

      return
    }
  })

  robot.respond(/みつけた.*#/, (res) => {
    const { channelId, user, embedded } = res.message.message
    const channelIds = embeddedChannelIds(embedded)

    if (user.bot) {
      return
    } else if (!isInProgress()) {
      res.reply('今はかくれんぼしてないやんね！')
      return
    } else if (!isAnswerChannelId(channelId)) {
      res.reply('かくれんぼを開始したチャンネルで回答してほしいやんね！')
      return
    } else if (channelIds.length !== 1) {
      res.reply('チャンネル名は1個だけ指定してほしいやんね～')
      return
    }

    if (isCorrectAnswer(channelIds[0])) {
      clearTimeout(timerId)

      res.reply(
        '正解やんね:tada.ex-large.zoom.zoom: ぴんぽんぴんぽ～ん\n' +
          'スタンプは10秒後にきなのが消しておくやんね！\n' +
          'もう1回かくれんぼをするには`@BOT_kinano かくれんぼしよう`と送ってほしいやんね！\n'
      )
      setTimeout(setEnd, 10000)
    } else {
      res.reply(
        '残念！まだまだ探すやんね！\n' +
          '諦める場合は`@BOT_kinano 負けました`と送るやんね～'
      )
    }
  })

  robot.respond(/負けました/, async (res) => {
    const { channelId, user } = res.message.message

    if (user.bot) {
      return
    } else if (!isInProgress()) {
      res.reply('今はかくれんぼしてないやんね！')
      return
    } else if (!isAnswerChannelId(channelId)) {
      res.reply('かくれんぼを開始したチャンネルで降参してほしいやんね！')
      return
    }

    clearTimeout(timerId)

    const path = await getChannelPath(hideandseekChannelId)
    res.reply(
      'きなのの勝ちやんね！\n' +
        `正解は${path}でした！やんね！\n` +
        'スタンプは10秒後にきなのが消しておくやんね！'
    )
    setTimeout(setEnd, 1000 * 10)
  })
}
