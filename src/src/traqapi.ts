import { Apis } from '@traptitech/traq';

const BOT_ID = process.env.HUBOT_TRAQ_BOT_ID;
const TOKEN = process.env.HUBOT_TRAQ_ACCESS_TOKEN;

if (!BOT_ID) {
  throw new Error('HUBOT_TRAQ_BOT_ID should not be empty.');
}
if (!TOKEN) {
  throw new Error('HUBOT_TRAQ_ACCESS_TOKEN should not be empty.');
}

export const api = new Apis({
  accessToken: TOKEN,
  isJsonMime: (s: string) => s === 'application/json', //TODO
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const join = (channelId: string) => {
  return api.letBotJoinChannel(BOT_ID, { channelId });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const leave = (channelId: string) => {
  return api.letBotLeaveChannel(BOT_ID, { channelId });
};
