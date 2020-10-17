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
                    if(i == 0) list += ":first_place:";
                    if(i == 1) list += ":second_place:";
                    if(i == 2) list += ":third_place:";
                    list += "|[" + tweets[0].trends[i].name + "](" + tweets[0].trends[i].url + ")|"+ tweets[0].trends[i].tweet_volume +"\n";
                }
                robot.send({channelID: gtR_ID}, "今のTwitterトレンドは\n" + list + "\nやんね！");
            }
        });
    })

    robot.hear(/^trend/, res => {
        const { bot } = res.message.message.user;
        if(!bot){
            const params = {id: 23424856};
            let list = "|rank|name|count|\n|-|-|-|\n";
            client.get('trends/place.json', params, function(error, tweets, response) {
                if (!error) {
                    for(let i = 0; i < 10; i++){
                        list += "|" + (i+1);
                        if(i == 0) list += ":first_place:";
                        if(i == 1) list += ":second_place:";
                        if(i == 2) list += ":third_place:";
                        list += "|[" + tweets[0].trends[i].name + "](" + tweets[0].trends[i].url + ")|"+ tweets[0].trends[i].tweet_volume +"\n";
                    }
                    res.send({channelID: gtR_ID}, "今のTwitterトレンドは\n" + list + "\nやんね！");
                }
            });
        }
    })
}