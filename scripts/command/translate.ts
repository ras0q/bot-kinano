//Description:
//  translate words.

import rp from 'request-promise';
import { IDs } from '../src/words';

const op = (txt: string, src: string, tar: string) => ({
  uri: 'https://script.google.com/macros/s/AKfycby3sNNJlWubQB4q_K4xHjZnpCxaCtYzbcuPmT-r9PJGTs4ZMb0/exec',
  headers: {'Content-type': 'application/json'},
  qs: {
    'text': txt,
    'source': src,
    'target': tar
  },
  json: true
});

module.exports = (robot: any) => {
  //翻訳(デフォルトは日=>英)
  robot.hear(/^tra\s+/i, (res: any) => {
    const { message } = res.message;
    const { id, plainText, user } = message;
    if(!user.bot){
      const txt = plainText.replace(/^tra\s+/i, '');
      const langs = plainText.match(/[([]\s*(..)\s*([=-]>|→)\s*(..)\s*[)\]]/);
      const [src, tar] = langs !== null
        ? [langs[1], langs[3]]
        : ['ja', 'en'];
      rp(op(txt, src, tar))
        .then((body) => {
          if(body.text) res.reply(body.text);
          else res.reply('きなのその言葉知らない！');
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  //逆翻訳
  robot.hear(/^tratra\s+/i, (res: any) => {
    const { message } = res.message;
    const { id, plainText, user } = message;
    if(!user.bot){
      const txt = plainText.replace(/^tratra\s+/, '');
      rp(op(txt, '', 'en'))
        .then((body) => {
          return rp(op(body.text, '', 'ja'));
        })
        .then((body2) => {
          res.reply(body2.text);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });
};