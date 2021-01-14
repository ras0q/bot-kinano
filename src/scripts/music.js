//Description:
//  control traQplaylist.

const request = require('request');
const { getRandom } = require('../../modules/random');

//requestのoptionをつくる
const option = (Q) => {
  return {
    uri: 'https://script.google.com/macros/s/AKfycbwi70WcQuyozUl08tuQFrjiT7znHusgOURUXGigwFidHFFZrvkm/exec', //GAS
    headers: {'Content-type': 'application/json'},
    qs: Q,
    json: true
  };
};

//textからmusicとurlを抽出
const extractValues = (text) => {
  const values = {
    music: '',
    url: ''
  };

  if (text.includes('|') || text.includes('\n')) {
    return values;
  }

  const music_element = text.match(/\[([^[\]]*)\]\((.*)\)/);
  if (music_element !== null){
    values.music = music_element[1];
    values.url = music_element[2];
  } else {
    values.music = text.replace(/^%add /i, ''); // 曲名切り取り
  }
  return values;
};

module.exports = robot => {
  const logID = '82b9f8ad-17d9-4597-88f1-0375247a2487';

  //曲追加
  robot.hear(/^%add .*/i, res => {
    const { message } = res.message;
    const { user, plainText } = message;
    const { name, bot } = user;
    if(!bot){
      const { music, url } = extractValues(plainText);
      const qs = {
        user: name,
        music,
        url
      };
      request.post(option(qs), (error, _response, _body) => {
        if(!error){
          const addtable = `|User|Music|URL|\n|-|-|-|\n|:@${name}:${name}|${music}|${url}|\n`;
          res.send(`『${music}』を追加したやんね！\n${addtable}`);
          robot.send({channelID: logID},'## 曲が追加されたやんね！\n'+ addtable);
        }
      });
    }
  });

  //曲削除
  robot.hear(/^%remove .*/i, res => {
    if(!res.message.message.user.bot){
      res.send('@Ras 頼んだ！');
    }
  });

  //曲確認
  robot.hear(/^%watch$/i, res => {
    if(!res.message.message.user.bot){
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          const table = [
            '|No.|User|Music|',
            '|-:|:-:|-|',
            '|例|:kinano:|きなこもちもちのうた|', //表の項目と例
            ...body.map(({ user, music }, idx) => `|${idx}|:@${user}:|${music}|`)
          ]
            .join('\n') + '\n';
          res.send(`## プレイリストやんね～\n${table}\n[](https://www.youtube.com/playlist?list=PLziwNdkdhnxiwuSjNF2k_-bvV1XojtWva)`);
        }
      });
    }
  });

  //曲確認(URLつき、番号指定)
  robot.hear(/^%watch [0-9]+/i, res => {
    if(!res.message.message.user.bot){
      const tableExample = '|No.|User|Music|URL|\n|-:|-|-|-|'; //表の項目と例
      const { plainText } = res.message.message;
      const i = plainText.replace(/^%watch /i, '');
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          const { user, music, url } = body[i];
          const table = `${tableExample}\n|${i}|:@${user}:${user}|${music}|${url}|\n`;
          res.send(`## 曲${i}はこれ！\n${table}`);
        }
      });
    }
  });

  //曲確認(URLつき、番号random)
  robot.hear(/^%watch r$/i, res => {
    if(!res.message.message.user.bot){
      const tableExample = '|No.|User|Music|URL|\n|-:|-|-|-|'; //表の項目と例
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          const i = getRandom(0, body.length);
          const { user, music, url } = body[i];
          const table = `${tableExample}\n|${i}|:@${user}:${user}|${music}|${url}|\n`;
          res.send(`## きなののオススメソングはこれ！\n${table}`);
        }
      });
    }
  });

  //曲確認(URLつき、全部)
  robot.hear(/^%watch all$/i, res => {
    if(!res.message.message.user.bot){
      request.get(option(), (error, response, body) => {
        if(!error){
          //表作成
          const table = [
            '|No.|User|Music|URL|',
            '|-:|-|-|-|',
            '||:kinano:BOT_kinano|きなこもちもちのうた|https://wiki.trap.jp/bot/kinano|', //表の項目と例
            ...body.map(({ user, music, url }, idx) => `|${idx}|:@${user}:${user}|${music}|${url}|`)
          ].join('\n') + '\n';
          res.send(`## プレイリストやんね～\n${table}`);
        }
      });
    }
  });
};
