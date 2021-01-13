const { Apis } = require('@traptitech/traq');

const BOT_ID = process.env.HUBOT_TRAQ_BOT_ID;
const TOKEN = process.env.HUBOT_TRAQ_ACCESS_TOKEN;

const api = new Apis({
  accessToken: TOKEN
});

exports.join = channelId => {
  return api.letBotJoinChannel(BOT_ID, { channelId });
};

exports.leave = channelId => {
  return api.letBotLeaveChannel(BOT_ID, { channelId });
};
