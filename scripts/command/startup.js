//Description:
//  StartUp

const cron = require('node-cron');
const Sitemapper = require('sitemapper');
const { getRandom } = require('../modules/random');
const { getMofu } = require('../modules/mofu2');
const { scheduling, IDs } = require('../src/words');
const { gtRB_log, at_Ras } = IDs;

module.exports = robot => {
  //dev環境
  if (process.env.NODE_ENV === 'develop'){
    console.log(`\n\u001b[35mDEVELOPMENT ENVIRONMENT\nMy name is ${process.env.HUBOT_TRAQ_NAME}\u001b[0m`);
    robot.hear(/.*/i, res => {
      devInit(res.message);
    });
  }

  //起動時メッセージ
  robot.send(
    {channelID: gtRB_log},
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})`
  );

  //postのcronセット
  const sitemap = new Sitemapper();
  sitemap.fetch('https://trap.jp/sitemap.xml')
    .then(({sites}) => {
      robot.send({channelID: gtRB_log}, 'site crawling was sucseeded');
      Object.values(scheduling).forEach(({channelId, time}) => {
        cron.schedule(`0 ${time.map(h => h.toString()).join(',')} * * * `, () => {
          robot.send({channelID: channelId}, sites[getRandom(0, sites.length())]);
        }, { timezone: 'Asia/Tokyo' });
      });
    })
    .catch((err) => {
      console.log(err);
      robot.send({userID: at_Ras}, `## cron error\n${err}`);
    });
};

const devInit = (message) => {
  message.message = {
    id: '00000000-0000-0000-0000-000000000000',
    user: {
      id: '0fa5d740-0841-4b88-b7c8-34a68774c784',
      name: 'Ras',
      displayName: 'らす',
      iconId: '00000000-0000-0000-0000-000000000000',
      bot: false
    },
    channelId: '00000000-0000-0000-0000-000000000000',
    text: message.text,
    plainText: message.text,
    embedded: [
      {
        raw: '@BOT_kinano',
        type: 'user',
        id: 'f60166fb-c153-409a-811d-272426eda32b'
      }
    ],
    createdAt: '2020-01-01T00:00:00.000000Z',
    updatedAt: '2021-01-01T00:00:00.000000Z'
  };
};
