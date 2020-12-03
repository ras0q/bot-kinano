require('dotenv').config();
const Twitter = require('twitter');

module.exports = robot => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SEC,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SEC
  });

  const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe";

  robot.hear(/^trend$/, res => {
    const { bot, id } = res.message.message.user;
    if(!bot){
      const params = {id: 23424856};
      let list = "|rank|name|count|\n|-|-|-|\n";
      client.get('trends/place.json', params, function(error, tweets, response) {
        if (!error) {
          for(let i = 0; i < Object.keys(tweets[0].trends).length; i++){
            list += "|" + (i+1);
            switch (i) {
              case 0:
                list += ":first_place:";
                break;
              case 1:
                list += ":second_place:";
                break;
              case 2:
                list += ":third_place:";
                break;
            }
            if(!tweets[0].trends[i].tweet_volume) tweets[0].trends[i].tweet_volume = ":NOTNull:";
            list += `|[${tweets[0].trends[i].name}](${tweets[0].trends[i].url})|${tweets[0].trends[i].tweet_volume}|\n`;
          }
          res.send("今のTwitterトレンドは\n" + list + "\nやんね！");
        }
        else robot.send({channelID: gtRB_ID}, `@Ras\n## error at trends.js\nhttps://q.trap.jp/messages/${id}`)
      });
    }
  })
}