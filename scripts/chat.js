const request = require('request');
// const { APIkey } = require('./env');
const APIkey = process.env.CHAPLUS_API_KEY;

module.exports = robot => {

    robot.hear(/^へいきなの /, res => {
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
                "username": displayName
            }
        };
            request.post(options, function(error, response, body){
                console.log(body.bestResponse.utterance)
        });
    })
}