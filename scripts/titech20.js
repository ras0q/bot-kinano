require('dotenv').config();
const Twitter = require('twitter');
const cron = require('node-cron');

module.exports = robot => {
  const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SEC,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SEC
  });

  const logID = "82b9f8ad-17d9-4597-88f1-0375247a2487";

  cron.schedule('0 30 * * * * ', () => {
  const params = {list_id: "1236878351165321216", count: 200, include_rts: false};
  client.get('lists/statuses', params, function(error, body, response) {
    let m = 5;
    let index = -1
    for(let i = 0; i < body.length; i++){
      if(body[i].retweet_count > m) index = i;
    }
    if(index != -1) robot.send({channelID: logID}`今話題のツイートやんね！[](https://twitter.com/${ screen_name}/status/${obj[index].in_reply_to_status_id_str})`);
    else robot.send({channelID: logID}, "今は何も話題になってないやんね、、、")
  })
  })
}