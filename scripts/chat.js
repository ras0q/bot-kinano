//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

require('dotenv').config();
const request = require('request');
const APIkey = process.env.CHAPLUS_API_KEY;

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
    return Math.floor(Math.random() * (end - start)) + start;
}


module.exports = robot => {

    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

    robot.hear(/((?<!BOT_)kinano|きなの)/i, res => {
        const { message } = res.message;
        const { plainText, user, id } = message;
        const { displayName, bot } = user;
        // const plainText = "きなのおはよう"
        // const displayName = "らす"
        // const bot = false;
        let uttr = plainText;
        if(plainText.indexOf("きなの") == 0) uttr = plainText.slice(3);
        if(plainText.indexOf("kinano") == 0) uttr = plainText.slice(6);
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
                "utterance": uttr,
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
                    body.status + "\n" + body.message + "\n" + id
                )
            }
            const i = getRandom(0,(body.responses).length);
            res.reply(body.responses[i].utterance + "(score: " + body.responses[i].score + ")")
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
                res.send("```\n" + JSON.stringify(body, undefined, 4) + "\n```")
            });
        }
    })
}