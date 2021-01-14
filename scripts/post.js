//Description:
//  post articles to specific channels.

const cron = require('node-cron');
const { getRandom } = require('../modules/random');

module.exports = robot => {
  const logID = '82b9f8ad-17d9-4597-88f1-0375247a2487';
  const recent = 1188; //最新回
  const scheduling = { // time は [0, 24) の整数の配列
    Ras: {
      channelId: logID,
      time: [8, 17]
    },
    Z: {
      channelId: '2937b540-2991-44ce-91dd-504dd29f01e7',
      time: [8]
    },
    Kamijo: {
      channelId: '2fab81dd-a750-4699-a9c5-3fc13ab9bcee',
      time: [8, 21]
    },
    d_etteiu8383: {
      channelId: '9f452f69-2bc2-40ee-a165-7e7ca251116d',
      time: [5]
    }
  };
  Object.values(scheduling).forEach(({channelId, time}) => {
    cron.schedule(`0 ${time.map(h => h.toString()).join(',')} * * * `, () => {
      robot.send({ channelID: channelId }, `https://trap.jp/post/${getRandom(1, recent+1)}`);
    }, { timezone: 'Asia/Tokyo' });
  });
};
