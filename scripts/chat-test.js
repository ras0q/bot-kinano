require('dotenv').config();
const request = require("request");

const APIkey = process.env.ST_API_KEY;

const option = (message) => {
    return {
        uri: "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk",
        form: {
            "apikey": APIkey,
            "query": message
        }
    }
}

module.exports = robot => {
    robot.hear(/^test /, res => {
        const { message } = res.message;
        const { user, plainText } = message;
        if(!user.bot){
            request.post(option(plainText.slice(5)), (err, resp, body) => {
                const { message } = body;
                if(message = "ok") res.reply(body.results[reply]);
                else res.reply(JSON.stringify(body));
            })
        }
    })
}