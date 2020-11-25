const {
  natterus,
  is_mentioned,
  is_not_mentioned,
  loop
} = require("../src/words");

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start;
}

//もふもふ
const getMofu = () => {
  let r = "";
  for(let i = 0; i < 2; i++){
    const generated = String.fromCodePoint(getRandom("ぁ".codePointAt(0), "ん".codePointAt(0)+1));
    r += generated;
  }
  return r + r;
}

module.exports = robot => {
  const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

  //起動時メッセージ
  robot.send(
    {channelID: gtRB_ID},
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})`
  );

  //メンション付きメッセージ
  for(let i = 0; i < is_mentioned.length; i++){
    const { msg, ans } = is_mentioned[i];
    robot.respond(msg, res => {
      const { bot } = res.message.message.user;
      if(!bot){
        setTimeout(() => {
          res.reply(ans); //replyでメンション付きメッセージ
        },500);
      }
    });
  }

  //メンション無しメッセージ
  for(let i = 0; i < is_not_mentioned.length; i++){
    const { msg, ans } = is_not_mentioned[i];
    robot.hear(msg, res => {
      const { bot } = res.message.message.user;
      if(!bot){
        setTimeout(() => {
          res.send(ans); //sendでメンション無しメッセージ
        },500);
      }
    });
  }

  //loop
  for(let i = 0; i < loop.length; i++){
    const { msg, ans } = loop[i];
    robot.hear(msg, res => {

      let { user, plainText } = res.message.message;
      if(!user.bot){
        let r = "",ex = "";
        while(plainText.search(msg) != -1){
          plainText = plainText.substr(plainText.search(msg)+plainText.match(msg)[0].length);
          r += ans;
          ex += "！"
        }
        r += ex;
        setTimeout(() => {
          res.send(r);
        },500);
      }
    })
  }

  //もふもふ
  robot.hear(/もふもふ/, res => {
    const { bot } = res.message.message.user;
    if(!bot){
      setTimeout(() => {
        res.send(getMofu());
      },500);
    }
  })

  //なってる
  robot.hear(/なってる$/, res => {
    const { bot } = res.message.message.user;
    if(!bot){
      setTimeout(() => {
        res.reply(natterus[getRandom(0, natterus.length)]);
      },500);
    }
  })

  //メッセージの時間を返す
  robot.hear(/^\/.*/, res => {
    const { message } = res.message;
    const { id, createdAt, user } = message;
    const { bot } = user;
    if(!bot){
      const time2 = createdAt.slice(0,-1);
      const JPNhour = (Number(time2.substr(11,2)) + 9) % 24; //日本時間に変換
      const JPNhourStr = `0${JPNhour}`.slice(-2);
      const JPNtime = time2.replace(/T../, " " + JPNhourStr);
      res.send(`${JPNtime}\nhttps://q.trap.jp/messages/${id}`);
    }
  })
};