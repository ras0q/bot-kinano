const request = require('request');

const URL = 'https://script.google.com/macros/s/AKfycby3sNNJlWubQB4q_K4xHjZnpCxaCtYzbcuPmT-r9PJGTs4ZMb0/exec';

module.exports = robot => {

  //翻訳(デフォルトは日=>英)
  robot.hear(/^tra /i, res => {
    const plainText = res.message.message.plainText;
    const bot = res.message.message.user.bot;
    if(!bot){
      const txt = plainText.replace(/^tra /i, '');
      const langs = plainText.match(/[([]\s*(..)\s*([=-]>|→)\s*(..)\s*[)\]]/);
      const [src, tar] = langs !== null
        ? [langs[1], langs[3]]
        : ['ja', 'en'];
      request.get({
        uri: URL,
        headers: {'Content-type': 'application/json'},
        qs: {
          'text': txt,
          'source': src,
          'target': tar
        },
        json: true
      }, function(err, req, data){
        if(data.text) res.reply(data.text);
        else res.reply('きなのその言葉知らない！');
      });
    }
  });

  //逆翻訳
  robot.hear(/^tratra /i, res => {
    const plainText = res.message.message.plainText;
    const bot = res.message.message.user.bot;
    if(!bot){
      request.get({
        uri: URL,
        headers: {'Content-type': 'application/json'},
        qs: {
          'text': plainText.replace(/^tratra /, ''),
          'source': '',
          'target': 'en'
        },
        json: true
      }, function(err, req, data){
        request.get({
          uri: URL,
          headers: {'Content-type': 'application/json'},
          qs: {
            'text': data.text,
            'source': 'en',
            'target': 'ja'
          },
          json: true
        }, function(err, req, data2){
          res.reply(`${data2.text}\n\n(${data.text})`);
        });
      });
    }
  });

};