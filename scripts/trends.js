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

  const gtR_ID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f";

  cron.schedule('0 0 15,21,3,9 * * *', () => {
    const params = {id: 23424856};
    let list = "|rank|name|count|\n|-|-|-|\n";
    client.get('trends/place.json', params, function(error, tweets, response) {
      if (!error) {
        for(let i = 0; i < 10; i++){
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
        robot.send({channelID: gtR_ID}, "今のTwitterトレンドは\n" + list + "\nやんね！");
      }
      else robot.send({channelID: gtR_ID}, "cron error at trends.js")
    });
  })

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
        else robot.send({channelID: gtR_ID}, `error at trends.js\nhttps://q.trap.jp/messages/${id}`)
      });
    }
  })
}