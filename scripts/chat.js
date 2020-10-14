const request = require('request');
// const { APIkey } = require('./env');
const APIkey = process.env.CHAPLUS_API_KEY;

module.exports = robot => {

    robot.hear(/^hey kinano/i, res => {
        const { plainText } = res.message.message;
        const { displayName } = res.message.message.user;
        var options = {
            uri: "https://www.chaplus.jp/v1/chat",
            qs: {
                "apikey": APIkey
            },
            headers: {
                "Content-type": "application/json",
            },
            json: {
                "utterance": plainText.slice(6),
                "username": displayName,
                "agentState": {
                    "agentName": "きなの",
                    "tone": "kansai",
                    "age": "14"
                }
            }
        };
            request.post(options, function(error, response, body){
                res.reply(body.bestResponse.utterance)
        });
    })
}