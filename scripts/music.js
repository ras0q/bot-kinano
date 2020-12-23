const request = require('request');

/*function----------------------------------------------------------------*/

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start;
}

//requestのoptionをつくる
const option = (Q) => {
  let op = {
    uri: "https://script.google.com/macros/s/AKfycbwi70WcQuyozUl08tuQFrjiT7znHusgOURUXGigwFidHFFZrvkm/exec", //GAS
    headers: {'Content-type': 'application/json'},
    qs: Q,
    json: true
  }
  return op;
}

//textからmusicとurlを抽出
const extractValues = (text) => {
  let values = {
    music: "",
    url: "",
  }
  const verticalIndex = text.indexOf("|"); //位置指定(!=-1のときエラー)
  const newlineIndex = text.indexOf("\n"); //位置指定(!=-1のときエラー)
  if(verticalIndex != -1 || newlineIndex != -1){
    return values;
  }
  const kagikakko = text.indexOf("["); //URLがあれば読み取る
  const kakko = text.indexOf("](");
  const kakkotoji = text.indexOf(")");
  if(kakko != -1 && kakkotoji != -1 && kagikakko != -1){
    values.music = text.slice(kagikakko + 1, kakko); //曲名切り取り
    values.url = text.slice(kakko + 2, kakkotoji);
  }
  else {
    values.music = text.slice(5); //曲名切り取り
  }
  return values;
}

/*module------------------------------------------------------------------*/

module.exports = robot => {
  const logID = "82b9f8ad-17d9-4597-88f1-0375247a2487";

  //曲追加
  robot.hear(/^%add .*/i, res => {
    const { message } = res.message;
    const { user, plainText } = message;
    const { name, bot } = user;
    if(!bot){
      const { music, url } = extractValues(plainText);
      const qs = {
        "user": name,
        "music": music,
        "url": url
      };
      request.post(option(qs), (error, response, body) => {
        if(!error){
          const addtable = `|User|Music|URL|\n|-|-|-|\n|:@${name}:${name}|${music}|${url}|\n`
          res.send(`『${music}』を追加したやんね！\n${addtable}`)
          robot.send({channelID: logID},"## 曲が追加されたやんね！\n"+ addtable);
        }
      })
    }
  })

  //曲削除
  robot.hear(/^%remove .*/i, res => {
    if(!res.message.message.user.bot){
      res.send(`@Ras 頼んだ！`)
    }
  })

    //曲確認
  robot.hear(/^%watch$/i, res => {
    if(!res.message.message.user.bot){
      let table = "|No.|User|Music|\n|-:|:-:|-|\n|例|:kinano:|きなこもちもちのうた|\n"; //表の項目と例
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          for(let i = 0;i < body.length; i++){
            const { user, music } = body[i];
            table += `|${i}|:@${user}:|${music}|\n`;
          }
          res.send(`## プレイリストやんね～\n${table}\n[](https://www.youtube.com/playlist?list=PLziwNdkdhnxiwuSjNF2k_-bvV1XojtWva)`);
        }
      })
    }
  })

  //曲確認(URLつき、番号指定)
  robot.hear(/^%watch [0-9]+/i, res => {
    if(!res.message.message.user.bot){
      let table = "|No.|User|Music|URL|\n|-:|-|-|-|\n"; //表の項目と例
      const { plainText } = res.message.message;
      const i = plainText.slice(7);
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          const { user, music, url } = body[i];
          table = `${table}|${i}|:@${user}:${user}|${music}|${url}|\n`;
          res.send(`## 曲${i}はこれ！\n${table}`);
        }
      })
    }
  })

  //曲確認(URLつき、番号random)
  robot.hear(/^%watch r/i, res => {
    if(!res.message.message.user.bot){
      let table = "|No.|User|Music|URL|\n|-:|-|-|-|\n"; //表の項目と例
      const { plainText } = res.message.message;
      const i = plainText.slice(7);
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          const i = getRandom(0,body.length);
          const { user, music, url } = body[i];
          table = `${table}|${i}|:@${user}:${user}|${music}|${url}|\n`;
          res.send(`## きなののオススメソングはこれ！\n${table}`);
        }
      })
    }
  })

  //曲確認(URLつき、全部)
  robot.hear(/^%watch all$/i, res => {
    if(!res.message.message.user.bot){
      let table = "|No.|User|Music|URL|\n|-:|-|-|-|\n||:kinano:BOT_kinano|きなこもちもちのうた|https://wiki.trap.jp/bot/kinano|\n"; //表の項目と例
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          for(let i = 0;i < body.length; i++){
            const { user, music, url } = body[i];
            table = `${table}|${i}|:@${user}:${user}|${music}|${url}|\n`;
          }
          res.send(`## プレイリストやんね～\n${table}`);
        }
      })
    }
  })
}