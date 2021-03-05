//Description:
//  post articles to specific channels.

const cron = require('node-cron');
const Sitemapper = require('sitemapper');
const { getRandom } = require('../modules/random');
const { at_Ras } = require('../src/words');

module.exports = robot => {
  const scheduling = { // time は [0, 24) の整数の配列
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

  const sitemap = new Sitemapper();
  sitemap.fetch('https://trap.jp/sitemap.xml')
    .then(({sites}) => {
      Object.values(scheduling).forEach(({channelId, time}) => {
        cron.schedule(`0 ${time.map(h => h.toString()).join(',')} * * * `, () => {
          robot.send({ channelID: channelId }, sites[getRandom(0, sites.length())]);
        }, { timezone: 'Asia/Tokyo' });
      });
    })
    .catch((err) => {
      console.log(err);
      robot.send({userID: at_Ras}, `## cron error\n${err}`);
    });
};
