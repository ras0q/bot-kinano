//Description:
//  show a now trend of twitter.

require('dotenv').config();
const Twitter = require('twitter');

module.exports = robot => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SEC,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SEC
  });

  const gtRB_ID = '2a5616d5-5d69-4716-8377-1e1fb33278fe';

  robot.hear(/^trend$/, res => {
    const { bot, id } = res.message.message.user;
    if(!bot){
      const params = {id: 23424856};
      client.get('trends/place.json', params, function(error, tweets, response) {
        if (!error) {
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
        else robot.send({channelID: gtRB_ID}, `@Ras\n## error at trends.js\nhttps://q.trap.jp/messages/${id}`);
      });
    }
  });
};