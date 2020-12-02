require('dotenv').config;
const request = require("request");

const APIkey = process.env.ST_API_KEY;

const option = (message) => {
    return {
        uri: "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk",
        qs: {
            "apikey": APIkey,
            "query": message
        },
        headers: {
            "Content-type": "application/json",
        },
    }
}

module.exports = robot => {
    robot.hear(/^test /, res => {
        const { message } = res.message;
        const { user, plainText } = message;
        if(!user.bot){
            request.post(option(plainText.slice(5)), (err, resp, body) => {
                if(body.status == 0) res.reply(results[body.reply]);
                else res.reply(body.message);
            })
        }
    })
}