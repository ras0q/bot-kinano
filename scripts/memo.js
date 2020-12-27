require('dotenv').config();
const request = require('request');
const cron = require('node-cron');

//requestのoptionをつくる
const option = (Q) => {
  let op = {
    uri: process.env.MEMO_SS, //SS
    headers: {'Content-type': 'application/json'},
    qs: Q,
    json: true
  };
  return op;
}

module.exports = robot => {
  const gtR_ID ="f58c72a4-14f0-423c-9259-dbb4a90ca35f";
  // robot.hear(/^(me|め|メ)(mo|も|モ)$/i, res => {
  //   const { bot, name } = res.message.message.user;
  //   if(!bot){
  //     const qs = {user: name};
  //     request.get(option(qs), (error,respond,body) => {
  //       if(!error){
  //         let { user, memo } = body;
  //         if(memo == "") memo = "\n:404_notfound.ex-large:|";
  //         const formatedMemo = memo.replace(/\n/gi, "\n|");
  //         res.send(`|memo\n|-${formatedMemo}|`);
  //         res.send(
  //           {
  //             type: "stamp",
  //             name: "writing_hand"
  //           }
  //         );
  //       }
  //       else {
  //         res.send("@Ras Error at memo.js");
  //       }
  //     })
  //   }
  // })

  robot.hear(/^(me|め|メ)(mo|も|モ)(\=|＝)/i, res => {
    const { plainText, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const i = plainText.search(/(\=|＝)/);
      let memo = plainText.slice(i + 1);
      const qs = {user: name, memo: memo};
      request.post(option(qs), (error,respond,body) => {
        if(!error){
          if(memo == "") memo = "\n:404_notfound.ex-large:";
          const formatedMemo = memo.replace(/\n/gi, "\n|");
          res.send(`|memo\n|-${formatedMemo}|`);
          res.send(
            {
              type: "stamp",
              name: "writing_hand"
            }
          );
        }
        else{
          res.send("@Ras Error at memo.js");
        }
      })
    }
  })

  robot.hear(/^(me|め|メ)(mo|も|モ)(\+|＋)?(?!(=|＝))/i, res => {
    const { plainText, user } = res.message.message;
    const { bot, name } = user;
    if(!bot){
      const i = plainText.search(/\n/);
      if (i == -1) i = 4;
      const qs = {user: name};
      request.get(option(qs), (error,respond,body) => {
        if(!error){
          const { memo } = body;
          const updatedMemo = memo + plainText.slice(i-1);
          const formatedMemo = updatedMemo.replace(/\n/gi, "\n|");
          const qs2 = {user: name, memo: updatedMemo};
          request.post(option(qs2), (error2,respond2,body2) => {
            if(!error2){
              res.send(`|memo\n|-${formatedMemo}|`);
              res.send(
                {
                  type: "stamp",
                  name: "writing_hand"
                }
              );
            }
            else{
              res.send("@Ras Error at memo.js");
            }
          })
        }
        else{
          res.send("@Ras Error at memo.js");
        }
      })
    }
  })

  //cron(8,16時)
  cron.schedule('0 0 7,23 * * *', () => {
    const qs = {user: "Ras"};
    request.get(option(qs), (error,respond,body) => {
      if(!error){
        let { user, memo } = body;
        if(memo == "") memo = "\n:404_notfound.ex-large:";
        const formatedMemo = memo.replace(/\n/gi, "\n|");
        robot.send({channelID: gtR_ID}, `|memo\n|-${formatedMemo}|`);
      }
    })
  })
}