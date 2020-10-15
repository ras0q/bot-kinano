//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

// require('dotenv').config();
const request = require('request');
const APIkey = process.env.CHAPLUS_API_KEY;

module.exports = robot => {

    robot.hear(/((?<!BOT_)kinano|きなの)/i, res => {
        const { message } = res.message;
        const { plainText, user } = message;
        const { displayName, bot } = user;
        if(!bot){
            var options = {
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
                    },
                    "addition": {
                        "utterancePairs": {
                            "utterance": "おいす～",
                            "response": "おいおいす～"
                        }
                    }
                }
            };
            request.post(options, function(error, response, body){
                res.reply(body.bestResponse.utterance + "(score: " + body.bestResponse.score + ")")
            });
        }
    })

    robot.hear(/^chattest/, res => {
        const { message } = res.message;
        const { plainText, user } = message;
        const { displayName, bot } = user;
        if(!bot){
            var options = {
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
                    },
                    "addition": {
                        "utterancePairs": {
                            "utterance": "おいす～",
                            "response": "おいおいす～"
                        }
                    }
                }
            };
            request.post(options, function(error, response, body){
                res.reply(body)
                console.log(body)
            });
        }
    })
}