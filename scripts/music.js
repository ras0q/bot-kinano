const cron = require('node-cron'); //定期投稿
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
  const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot
  const log_ID = "82b9f8ad-17d9-4597-88f1-0375247a2487" //#gps/times/Ras/Bot/log
  const DM_ID = "37612932-7437-4d99-ba61-f8c69cb85c41"; //Ras-BOT_kinanoのDM

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
          const addtable = `|追加した人|追加した曲|曲のURL|\n|-|-|-|\n|${name}|${music}|${url}|\n`
          res.send(`ぷれいりすとに追加したやんね！\n${addtable}`)
          robot.send({channelID: gtRB_ID},"**Add to PLAYLIST**\n"+ addtable); //RasへのDMに通知
        }
      })
    }
  })

  //曲削除
  robot.hear(/^%remove .*/i, res => {
    if(!res.message.message.user.bot){
      res.send(`!{"type":"user","raw":"@Ras","id":"0fa5d740-0841-4b88-b7c8-34a68774c784"}頼んだ！`)
    }
  })

    //曲確認
  robot.hear(/^%watch$/i, res => {
    if(!res.message.message.user.bot){
      let table = "|番号|追加した人|曲名|\n|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|\n"; //表の項目と例
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          for(let i = 0;i < body.length; i++){
            const { user, music } = body[i];
            table += `|${i}|${user}:@${user}:|${music}|\n`;
          }
          res.send(`プレイリストやんね～\n${table}`);
        }
      })
    }
  })

  //曲確認(URLつき)
  robot.hear(/^%watch url$/i, res => {
    if(!res.message.message.user.bot){
      let table = "|番号|追加した人|曲名|URL|\n|-|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|https://wiki.trap.jp/bot/kinano|\n"; //表の項目と例
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          for(let i = 0;i < body.length; i++){
            const { user, music, url } = body[i];
            table = `${table}|${i}|${user}:@${user}:|${music}|${url}|\n`;
          }
          res.send(`プレイリストやんね～\n${table}`);
        }
      })
    }
  })

  //定期投稿(3時間ごと)
  cron.schedule('0 0 */3 * * *', () => {
    request.get(option(), (error, response, body) => {
      if(!error){
        const i = getRandom(0,body.length);
        const { user, music, url } = obj.list[i];
        robot.send({channelID: log_ID}, `きなののオススメソングはこれ！\n[${music}](${url})(added by :@${user}:)`);
      }
    })
  })
}