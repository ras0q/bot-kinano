import { Apis, Channel, Message } from '@traptitech/traq'

const BOT_ID = process.env.HUBOT_TRAQ_BOT_ID
const TOKEN = process.env.HUBOT_TRAQ_ACCESS_TOKEN

if (!BOT_ID) {
  throw new Error('HUBOT_TRAQ_BOT_ID should not be empty.')
}
if (!TOKEN) {
  throw new Error('HUBOT_TRAQ_ACCESS_TOKEN should not be empty.')
}

export const api = new Apis({
  accessToken: TOKEN,
  isJsonMime: (s: string) => s === 'application/json' //TODO
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const join = (channelId: string) => {
  return api.letBotJoinChannel(BOT_ID, { channelId })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const leave = (channelId: string) => {
  return api.letBotLeaveChannel(BOT_ID, { channelId })
}

export const getChannel = async (channelId: string): Promise<Channel> => {
  const channel = await api.getChannel(channelId)
  return channel.data
}

export const getChannels = async (parentID?: string): Promise<string[]> => {
  if (parentID) {
    const parent = await getChannel(parentID)
    return parent.children
  } else {
    const channels = await api.getChannels()
    return channels.data.public.map((v) => v.id)
  }
}

export const getChannelPath = async (channelId: string): Promise<string> => {
  const _channels = await api.getChannels()
  const channels = _channels.data.public
  const channel = channels.find((v) => v.id === channelId)

  const getPathRecursive = (ch: Channel): string => {
    if (ch.parentId) {
      const parent = channels.find((v) => v.id === ch.parentId)
      return parent ? getPathRecursive(parent) + '/' + ch.name : ''
    } else {
      return '#' + ch.name
    }
  }

  return channel ? getPathRecursive(channel) : ''
}

export const getLastMessage = async (channelId: string): Promise<Message[]> => {
  const messages = await api.getMessages(channelId, 1)
  return messages.data
}

export const pushKinanoStamp = (messageId: string): void => {
  api.addMessageStamp(messageId, '9fecbaa1-64b6-4d15-be5b-9521736cd0f0')
}

export const removeKinanoStamp = (messageId: string): void => {
  api.removeMessageStamp(messageId, '9fecbaa1-64b6-4d15-be5b-9521736cd0f0')
}
