const request = require('request');
// const { APIkey } = require('./env');
const APIkey = process.env.CHAPLUS_API_KEY;

module.exports = robot => {

    robot.hear(/^hey kinano/i, res => {
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
                    "utterance": plainText.slice(10),
                    "username": displayName,
                    "agentState": {
                        "agentName": "きなの",
                        "age": "14"
                    }
                }
            };
            request.post(options, function(error, response, body){
                res.reply(body.bestResponse.utterance)
            });
        }
    })
}