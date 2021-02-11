//Description:
//  show a now trend of twitter.

const Twitter = require('twitter');
const {
  gtRB_log,
  gitea
} = require('../src/words').IDs;

module.exports = robot => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SEC,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SEC
  });

  robot.hear(/^trend$/, res => {
    const { bot, id } = res.message.message.user;
    if(!bot){
      const params = {id: 23424856};
      client.get('trends/place.json', params, (error, tweets, _response) => {
        if (error) {
          robot.send(
            {channelID: gtRB_log},
            `@Ras\nError at ${gitea}/trends.js\n\`\`\`${error}\`\`\`\nhttps://q.trap.jp/messages/${id}`
          );
        }
        else {
          const trendTableMain = Object.keys(tweets[0].trends).map((_, idx) => {
            const { name, url, tweet_volume } = tweets[0].trends[idx];
            const place_stamp = idx === 0
              ? ':first_place:'
              : idx === 1
                ? ':second_place:'
                : idx === 2
                  ? ':third_place:'
                  : '';
            return `|${idx+1}${place_stamp}|[${name}](${url})|${tweet_volume ? tweet_volume : ':NOTNull:'}|`;
          });
          const trendTable = [
            '|rank|name|count|',
            '|-|-|-|',
            ...trendTableMain
          ].join('\n') + '\n';
          res.send('今のTwitterトレンドは\n' + trendTable + '\nやんね！');
        }
      });
    }
  });
};