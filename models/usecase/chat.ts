import fetch, { RequestInit } from 'node-fetch'
import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { apiPost } from '../src/traqapi'
import { RobotHearResponse } from '../src/types'
import { postErrMsg } from '../utils/error'

const { apiKey, agentId, baseUrl } = defaultEnvs.mebo
const updateChatChannelMsg = '`Chat Channel` moved here!!'
const botName = '(kinano|きなの)'
const calledRegexp = new RegExp(botName, 'i')
const replaceRegexp = new RegExp(`${botName}\\s|\\s${botName}`, 'i')
let chatChannelId = IDs['#g/t/R/Bot']

const option = (content: string): RequestInit => ({
  method: 'POST',
  body: JSON.stringify({
    api_key: apiKey,
    agent_id: agentId,
    utterance: content
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})

export const postChatReply = async (res: RobotHearResponse): Promise<void> => {
  const { channelId, plainText, user } = res.message.message

  if (user.bot) return

  const called = plainText.match(calledRegexp)
  const replacedText = plainText.replace(replaceRegexp, '')

  if (called || chatChannelId === channelId) {
    try {
      const body = await fetch(baseUrl, option(replacedText))
      const { bestResponse: br } = await body.json()
      if (br === undefined) {
        new Error(body.status.toString())
      }
      const { utterance, score } = br
      const sc = score.toString().slice(0, 6)
      res.reply(`${utterance} (score: ${sc})`)
    } catch (err) {
      postErrMsg(err, res)
    }
  }
}

export const updateChatChannel = (res: RobotHearResponse): void => {
  const { channelId, user } = res.message.message
  if (!user.bot) {
    chatChannelId = channelId
    res.send({ type: 'stamp', name: 'haakusita' })
    apiPost(IDs['#g/t/R/B/log'], updateChatChannelMsg, res)
  }
}
