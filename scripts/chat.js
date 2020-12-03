//https://www.chaplus.jp/
//https://k-masashi.github.io/chaplus-api-doc/ChatAPI.html

require('dotenv').config();
const request = require('request');
const APIkey = process.env.CHAPLUS_API_KEY;

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start;
}

const option = (message) => {
  return {
    uri: "https://www.chaplus.jp/v1/chat",
      qs: {
        "apikey": APIkey
      },
      headers: {
        "Content-type": "application/json",
      },
      json: {
        "utterance": message.plainText,
        "username": message.user.displayName,
        "agentState": {
          "agentName": "きなの",
          "age": "14",
        }
      }
  }
}

module.exports = robot => {
  const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

  robot.hear(/((?<!BOT_)kinano|きなの)/i, res => {
    const { message } = res.message;
    const { channelId, user, id } = message;
    if(!user.bot && channelId != gtRB_ID){
    request.post(option(message), function(error, response, body){
      const { status, message, responses } = body;
      if(status){
        robot.send({channelID: gtRB_ID},
          `${status}\n${message}\nhttps://q.trap.jp/messages/${id}`
        );
      }
      else res.reply(`${responses[getRandom(0,(responses).length)].utterance}\n`)
    });
    }
  })

  robot.hear(/^chattest/, res => {
    const { message } = res.message;
    const { user } = message;
    if(user.bot){
      request.post(option(message), function(error, response, body){
        res.send(`\`\`\`\n${JSON.stringify(body, undefined, 4)}\n\`\`\``);
      });
    }
  })

  let chatChannelId = ""
  robot.hear(/.+/i, res => {
    const { message } = res.message;
    const { channelId, user, id } = message;
    if(!user.bot && chatChannelId == channelId){
    request.post(option(message), function(error, response, body){
      const { status, message, responses } = body;
      if(status){
        robot.send({channelID: gtRB_ID},
          `@Ras\n${status}\n${message}\n${id}`
        );
      }
      else {
        const i = getRandom(0,(responses).length)
        res.reply(`${responses[i].utterance} (score: ${responses[i].score})`);
      }
    });
    }
  })
  //環境切り替え
  robot.hear(/^:koko:$/, res => {
    const { message } = res.message;
    const { user, channelId } = message;
    if(!user.bot){
      res.reply(`Chat Channel is :koko:\n(channelID: ${channelId})`)
    }
  })
}