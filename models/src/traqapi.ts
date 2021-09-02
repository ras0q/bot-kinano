/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

import { Apis } from '@traptitech/traq'
import { defaultEnvs } from '../config/env'

const { traqBotId, traqAccessToken } = defaultEnvs.hubot

export const api = new Apis({
  accessToken: traqAccessToken,
  isJsonMime: (s: string) => s === 'application/json'
})

export const apiJoin = (channelId: string) => {
  return api.letBotJoinChannel(traqBotId, { channelId })
}

export const apiLeave = (channelId: string) => {
  return api.letBotLeaveChannel(traqBotId, { channelId })
}

export const apiPost = (channelId: string, content: string) => {
  return api.postMessage(channelId, { content, embed: true })
}

export const apiPostDM = (userId: string, content: string) => {
  return api.postDirectMessage(userId, { content, embed: true })
}

