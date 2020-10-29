const { Robot } = require('hubot');
const request = require('request');

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
  robot.hear(/^memo$/i, res => {
    const { bot, name } = res.message.message.user;
    if(!bot){
      const qs = {user: name};
      request.get(option(qs), (error,respond,body) => {
        if(!error){
          const { user, memo } = body;
          res.send(`*${user}'s memo is ...*\n${memo}`);
        }
      })
    }
  })

  robot.hear(/^memo\+ /i, res => {
    const { plainText, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const qs = {user: name, memo: plainText.slice(6)};
      request.post(option(qs), (error,respond,body) => {
        if(!error){
          res.send(`*${name}'s memo was updated!*`);
        }
      })
    }
  })
}