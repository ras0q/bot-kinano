import { Apis } from '@traptitech/traq'
import { defaultEnvs } from '../config/env'

const { traqBotId, traqAccessToken } = defaultEnvs.hubot

export const api = new Apis({
  accessToken: traqAccessToken,
  isJsonMime: (s: string) => s === 'application/json'
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const join = (channelId: string) => {
  return api.letBotJoinChannel(traqBotId, { channelId })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const leave = (channelId: string) => {
  return api.letBotLeaveChannel(traqBotId, { channelId })
}
