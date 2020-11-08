const request = require('request');
const cron = require('node-cron');

//requestのoptionをつくる
const option = (Q) => {
  let op = {
    uri: "https://script.google.com/macros/s/AKfycbyULsWt54OcPDgjk_rSWK1rh6xCPeNW7-z7X__nu3CVidMeKOQ/exec", //GAS
    headers: {'Content-type': 'application/json'},
    qs: Q,
    json: true
  }
  return op;
}

module.exports = robot => {
  const gtR_ID ="f58c72a4-14f0-423c-9259-dbb4a90ca35f";
  robot.hear(/^(me|め|メ)(mo|も|モ)$/i, res => {
    const { bot, name } = res.message.message.user;
    if(!bot){
      const qs = {user: name};
      request.get(option(qs), (error,respond,body) => {
        if(!error){
          const { user, memo } = body;
          if(memo == "") memo = "#NULL"
          res.send(`***${user}'s memo is ...***\n${memo}`);
        }
      })
    }
  })

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)(?!(\+|＋))/i, res => {
    const { plainText, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const i = plainText.search(/(\+|＋)/);
      const memo = plainText.slice(i + 1);
      const qs = {user: name, memo: memo};
      request.post(option(qs), (error,respond,body) => {
        if(!error){
          res.send(`***${name}'s memo was updated!***\n${memo}`);
        }
      })
    }
  })

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋){2}/i, res => {
    const { plainText, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const i = plainText.search(/(\+|＋){2}/);
      const qs = {user: name};
      request.get(option(qs), (error,respond,body) => {
        if(!error){
          const { memo } = body;
          const memo2 = memo + plainText.slice(i + 2)
          const qs2 = {user: name, memo: memo2};
          request.post(option(qs2), (error2,respond2,body2) => {
            if(!error2){
              res.send(`***${name}'s memo was updated!***\n${memo2}`);
            }
          })
        }
      })
    }
  })

  //cron(8,16時)
  cron.schedule('0 0 7,23 * * *', () => {
    const qs = {user: "Ras"};
    request.get(option(qs), (error,respond,body) => {
      if(!error){
        const { user, memo } = body;
        if(memo == "") memo = "#NULL"
        robot.send({channelID: gtR_ID}, `***${user}'s memo is ...***\n${memo}`);
      }
    })
  })
}