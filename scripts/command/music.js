//Description:
//  control traQplaylist.

const request = require('request');
const { getRandom } = require('../modules/random');

const url = `${process.env.SHOWCASE_URL}/song?client_id=${process.env.SHOWCASE_CLIENT_ID}`;

//requestのoptionをつくる
const option = Q => ({
  uri: url,
  headers: {'Content-type': 'application/json'},
  qs: Q,
  json: true
});

//textからtitleとurlを抽出
const extractValues = text => {
  const values = {
    title: '',
    url: ''
  };

  if (text.includes('|') || text.includes('\n')) {
    return values;
  }

  const title_element = text.match(/\[([^[\]]*)\]\((.*)\)/);
  if (title_element !== null){
    values.title = title_element[1];
    values.url = title_element[2];
  } else {
    values.title = text.replace(/^%add\s+/i, ''); // 曲名切り取り
  }
  return values;
};

module.exports = robot => {
  const logID = '82b9f8ad-17d9-4597-88f1-0375247a2487';

  //曲追加
  robot.hear(/^%add\s+.*/i, res => {
    const { message } = res.message;
    const { user, plainText } = message;
    const { name, bot } = user;
    if(!bot){
      const { title, url } = extractValues(plainText);
      const qs = {
        user: name,
        title,
        url
      };
      request.post(option(qs), (error, _response, _body) => {
        if(!error){
          const addtable = `|User|Title|URL|\n|-|-|-|\n|:@${name}:${name}|${title}|${url}|\n`;
          res.send(`『${title}』を追加したやんね！\n${addtable}`);
          robot.send({channelID: logID},'## 曲が追加されたやんね！\n'+ addtable);
        }
      });
    }
  });

  //曲削除
  robot.hear(/^%remove\s+[0-9]+/i, res => {
    const { message } = res.message;
    const { user, plainText } = message;
    const { name, bot } = user;
    if(!bot){
      const i = plainText.replace(/^%remove\s+/i, '');
      const idx = parseInt(i);
      request.get(option(), (error, response, body) => {
        if (idx >= body.length) {
          res.send('index out of range!');
          return;
        }
        if (body[idx].user !== name) {
          res.send(`${name}には曲${idx}の削除権限がないやんね！:gahaha:`);
          return;
        }
        const req = {
          uri: `${url}&id=${body[idx].id}&user=${name}`,
          headers: {'Content-type': 'application/json'},
          json: true
        };
        request.delete(req, (error, _response, body) => {
          console.log(JSON.stringify(body));
          if (error !== null) {
            res.send(`faild to remove id ${idx} song`);
          } else {
            res.send(`曲${idx}を削除したやんね！`);
          }
        });
      });
    }
  });

  //曲確認
  robot.hear(/^%watch$/i, res => {
    if(!res.message.message.user.bot){
      request.get(option(), (error, response, body) => {
        if(error === null){
          //表作成
          const table = [
            '|No.|User|Title|',
            '|-:|:-:|-|',
            '|例|:kinano:|きなこもちもちのうた|',
            ...body.map(({ user, title }, idx) => `|${idx}|:@${user}:|${title}|`)
          ]
            .join('\n') + '\n';
          res.send(`## プレイリストやんね～\n${table}\n[](https://www.youtube.com/playlist?list=PLziwNdkdhnxiwuSjNF2k_-bvV1XojtWva)`);
        }
      });
    }
  });

  //曲確認(URLつき、番号指定)
  robot.hear(/^%watch\s+[0-9]+/i, res => {
    if(!res.message.message.user.bot){
      const tableExample = '|No.|User|Title|URL|\n|-:|-|-|-|'; //表の項目と例
      const { plainText } = res.message.message;
      const i = plainText.replace(/^%watch\s+/i, '');
      request.get(option(), (error, response, body) => {
        if(error === null){
          const { user, title, url } = body[parseInt(i)];
          const table = `${tableExample}\n|${i}|:@${user}:${user}|${title}|${url}|\n`;
          res.send(`## 曲${i}はこれ！\n${table}`);
        }
      });
    }
  });

  //曲確認(URLつき、番号random)
  robot.hear(/^%watch\s+r$/i, res => {
    if(!res.message.message.user.bot){
      const tableExample = '|No.|User|Title|URL|\n|-:|-|-|-|'; //表の項目と例
      request.get(option(), (error, response, body) => {
        if(error === null){
          //表作成
          const i = getRandom(0, body.length);
          const { user, title, url } = body[i];
          const table = `${tableExample}\n|${i}|:@${user}:${user}|${title}|${url}|\n`;
          res.send(`## きなののオススメソングはこれ！\n${table}`);
        }
      });
    }
  });

  //曲確認(URLつき、全部)
  robot.hear(/^%watch\s+all$/i, res => {
    if(!res.message.message.user.bot){
      request.get(option(), (error, response, body) => {
        if(error === null){
          //表作成
          const table = [
            '|No.|User|Title|URL|',
            '|-:|-|-|-|',
            '||:kinano:BOT_kinano|きなこもちもちのうた|https://wiki.trap.jp/bot/kinano|', //表の項目と例
            ...body.map(({ user, title, url }, idx) => `|${idx}|:@${user}:${user}|${title}|${url}|`)
          ].join('\n') + '\n';
          res.send(`## プレイリストやんね～\n${table}`);
        }
      });
    }
  });
};
