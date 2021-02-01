//Description:
//  translate words.

const request = require('request');
const { gitea } = require('../src/words').IDs;

const option = (txt, src, tar) => ({
  uri: 'https://script.google.com/macros/s/AKfycby3sNNJlWubQB4q_K4xHjZnpCxaCtYzbcuPmT-r9PJGTs4ZMb0/exec',
  headers: {'Content-type': 'application/json'},
  qs: {
    'text': txt,
    'source': src,
    'target': tar
  },
  json: true
});

module.exports = robot => {
  //翻訳(デフォルトは日=>英)
  robot.hear(/^tra\s+/i, res => {
    const { user, plainText } = res.message.message;
    if(!user.bot){
      const txt = plainText.replace(/^tra\s+/i, '');
      const langs = plainText.match(/[([]\s*(..)\s*([=-]>|→)\s*(..)\s*[)\]]/);
      const [src, tar] = langs !== null
        ? [langs[1], langs[3]]
        : ['ja', 'en'];
      request.get(option(txt, src, tar), (err, _req, data) => {
        if(err) {
          res.send(`@Ras Error at ${gitea}/translate.js: ${err.toString()}`);
        }
        else {
          if(data.text) res.reply(data.text);
          else res.reply('きなのその言葉知らない！');
        }
      });
    }
  });

  //逆翻訳
  robot.hear(/^tratra\s+/i, res => {
    const { user, plainText } = res.message.message;
    if(!user.bot){
      const txt = plainText.replace(/^tratra\s+/, '');
      request.get(option(txt, '', 'en'), (err, _req, data) => {
        if(err) {
          res.send(`@Ras Error at ${gitea}/translate.js: ${err.toString()}`);
        }
        else {
          request.get(option(data.text, 'en', 'ja'), (err2, _req, data2) => {
            if(err2) {
              res.send(`@Ras Error at ${gitea}/translate.js: ${err2.toString()}`);
            }
            else {
              res.reply(`${data2.text}\n\n(${data.text})`);
            }
          });
        }
      });
    }
  });
};