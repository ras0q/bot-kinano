//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

require('dotenv').config();
const request = require('request');
const APIkey = process.env.CHAPLUS_API_KEY;

module.exports = robot => {

    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

    robot.hear(/((?<!BOT_)kinano|きなの)/i, res => {
        const { message } = res.message;
        const { plainText, user } = message;
        const { displayName, bot } = user;
        if(!bot){
        let options = {
                uri: "https://www.chaplus.jp/v1/chat",
                qs: {
                    "apikey": APIkey
                },
                headers: {
                    "Content-type": "application/json",
                },
                json: {
                    "utterance": plainText,
                    "username": displayName,
                    "agentState": {
                        "agentName": "きなの",
                        "age": "14"
                    }
                }
            };
            request.post(options, function(error, response, body){
                if(body.status != ""){
                    robot.send({channelId: gtRB_ID},
                        body.status + "\n" + body.message
                    )
                }
                else res.reply(body.bestResponse.utterance + "(score: " + body.bestResponse.score + ")")
            });
        }
    })

    robot.hear(/^chattest/, res => {
        const { message } = res.message;
        const { plainText, user } = message;
        const { displayName, bot } = user;
        if(!bot){
            let options = {
                uri: "https://www.chaplus.jp/v1/chat",
                qs: {
                    "apikey": APIkey
                },
                headers: {
                    "Content-type": "application/json",
                },
                json: {
                    "utterance": plainText.slice(8),
                    "username": displayName,
                    "agentState": {
                        "agentName": "きなの",
                        "age": "14"
                    }
                }
            };
            request.post(options, function(error, response, body){
                res.send(JSON.stringify(body, undefined, 4))
            });
        }
    })
}