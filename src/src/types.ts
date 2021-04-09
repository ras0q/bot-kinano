/* eslint-disable no-unused-vars */
type UUID = string
type Time = string
import { MessageStamp } from '@traptitech/traq';
import Hubot from 'hubot';

// 参考: https://bot-console.trap.jp/docs/bot/events
export type TraqUser = {
  id: UUID
  name: string
  displayName: string
  iconId: UUID
  bot: boolean
}
export type TraqChannel = {
  id: UUID
  name: string
  path: string
  parentId: UUID
  creator: TraqUser
  createdAt: Time
  updatedAt: Time
}

export type MessageCreated = {
  eventTime: Time
  message: {
    id: UUID
    user: TraqUser
    channelId: UUID
    text: string
    plainText: string
    embedded: {
      raw: string
      type: string
      id: UUID
    }[]
    createdAt: Time
    updatedAt: Time
  }
}
export type MessageDeleted = {
  eventTime: Time
  message: {
    id: UUID
    channelId: UUID
  }
}
export type MessageUpdated = MessageCreated
export type BotMessageStampsUpdated = {
  eventTime: Time
  messageId: UUID
  stamps: (MessageStamp & {
    stampName: string
  })[]
}

export type ChannelCreated = {
  eventTime: Time
  channel: TraqChannel
  createdAt: Time
  updatedAt: Time
}
export type ChannelTopicChanged = {
  eventTime: Time
  channel: TraqChannel
  topic: string
  updater: TraqUser
}

export type UserCreated = {
  eventTime: Time
  user: TraqUser
}

export type StampCreated = {
  eventTime: Time
  id: UUID
  name: string
  fileId: UUID
  creator: TraqUser
}

export type TagAdded = {
  eventTime: Time
  tagId: UUID
  tag: string
}
export type TagRemoved = TagAdded

export type Joined = {
  eventTime: Time
  channel: TraqChannel
}
export type Left = Joined

// 参考: https://github.com/sapphi-red/hubot-traq/wiki
export declare class RobotEvents {
  ChannelCreated: {
    type: 'ChannelCreated'
  } & Pick<ChannelCreated, 'eventTime' | 'channel'>
  UserCreated: {
    type: 'UserCreated'
    eventTime: UserCreated['eventTime']
    userData: UserCreated['user']
  }
  StampCreated: {
    type: 'StampCreated'
  } & StampCreated
  TagAdded: {
    type: 'TagAdded'
  } & TagAdded
  TagRemoved: {
    type: 'TagRemoved'
  } & TagRemoved
  Joined: {
    type: 'Joined'
  } & Joined
  Left: {
    type: 'Left'
  } & Left
  BotMessageStampsUpdated: {
    type: 'BotMessageStampsUpdated'
  } & Pick<BotMessageStampsUpdated, 'messageId' | 'stamps'>
}

export type RobotSendMessage = string | {
  type: 'stamp'
  name: string
}
export type RobotCallbackData = {
  channelID: UUID
  userId?: never
} | {
  channelID?: never
  userID: UUID
}

export type RobotResponseActions = {
  send(...message: RobotSendMessage[]): void
  reply(...message: string[]): void
  topic(...message: string[]): void
}

export type RobotHearResponse = {
  message: MessageCreated & Pick<MessageCreated['message'], 'embedded' | 'createdAt' | 'updatedAt'> & Hubot.TextMessage
} & RobotResponseActions
export type RobotRespondResponse = RobotHearResponse
export type RobotTopicResponse = {
  message: ChannelTopicChanged & Hubot.TopicMessage
} & RobotResponseActions
export type RobotCatchAllResponse = {
  message: RobotEvents[keyof RobotEvents] & Hubot.CatchAllMessage
}

export declare class Robots {
  hear(regexp: RegExp, callback: (res: RobotHearResponse) => void): void
  respond(regexp: RegExp, callback: (res: RobotRespondResponse) => void): void
  topic(callback: (res: RobotTopicResponse) => void): void
  catchAll(callback: (res: RobotCatchAllResponse) => void): void
  send(data: RobotCallbackData, ...message: RobotSendMessage[]): void
  reply(data: RobotCallbackData, ...message: string[]): void
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  topic(data: RobotCallbackData, ...message: string[]): void
}
