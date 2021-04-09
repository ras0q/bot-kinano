//Description:
//  control traQplaylist.

import requestPromise from 'request-promise';
import { getRandom } from '../utils/random';
import { IDs } from '../src/words';

const url = `${process.env.SHOWCASE_URL}/song?client_id=${process.env.SHOWCASE_CLIENT_ID}`;

const op = (method: any, qs?: any) => ({
  method,
  uri: url,
  qs,
  headers: {'Content-type': 'application/json'},
  json: true
});

const extractValues = (text: string) => {
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

module.exports = (robot: any) =>{
  robot.hear(/^%add\s+.*/i, (res: any) => {
    const { message } = res.message;
    const { id, plainText, user } = message;
    const { bot, name } = user;
    if(!bot){
      const { title, url } = extractValues(plainText);
      const qs = {
        user: name,
        title,
        url
      };
      requestPromise(op('post', qs))
        .then(() => {
          const addTable = `|User|Title|URL|\n|-|-|-|\n|:@${name}.large:${name}|${title}|${url}|\n`;
          res.reply(`『${title}』を追加したやんね！`);
          robot.send({channelID: IDs.gtRB_log}, '## 曲が追加されたやんね！\n'+ addTable);
        })
        .catch((err) =>{
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  robot.hear(/^%remove\s+[0-9]+/i, (res: any) => {
    const { message } = res.message;
    const { id, plainText, user } = message;
    const { name, bot } = user;
    if(!bot){
      const i = plainText.replace(/^%remove\s+/i, '');
      const idx = parseInt(i);
      requestPromise(op('get'))
        .then((body) => {
          if (idx >= body.length) {
            res.send('index out of range!');
            throw new Error('Index out of range');
          }
          if (body[idx].user !== name) {
            res.send(`${name}には曲${idx}の削除権限がないやんね！`);
            throw new Error(`${name} cannot remove this song.`);
          }
          const req = {
            method: 'delete',
            uri: `${url}&id=${body[idx].id}&user=${name}`,
            headers: {'Content-type': 'application/json'},
            json: true
          };
          return req;
        })
        .then((req) => {
          return requestPromise(req);
        })
        .then(() => {
          res.send(`曲${idx}を削除したやんね！`);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  robot.hear(/^%watch$/i, (res: any) => {
    const { message }  = res.message;
    const { id, user } = message;
    if(!user.bot){
      requestPromise(op('get'))
        .then((body) => {
          const table = [
            '|No.|User|Title|',
            '|-:|:-:|-|',
            '|例|:kinano:|きなこもちもちのうた|',
            ...body.map(({ user, title }:  { user: string, title: string }, idx: number) => (
              `|${idx}|:@${user}:|${title}|`)
            )
          ].join('\n') + '\n';
          res.send(`## プレイリストやんね～\n${table}\n[](https://www.youtube.com/playlist?list=PLziwNdkdhnxiwuSjNF2k_-bvV1XojtWva)`);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  //URLつき、番号指定
  robot.hear(/^%watch\s+[0-9]+/i, (res: any) => {
    const { message } = res.message;
    const { id, plainText, user } = message;
    if(!user.bot){
      const i = plainText.replace(/^%watch\s+/i, '');
      requestPromise(op('get'))
        .then((body) => {
          const { user, title, url } = body[parseInt(i)];
          const table = [
            '|No.|User|Title|URL|',
            '|--:|----|-----|---|',
            `|${i}|:@${user}:${user}|${title}|${url}|`
          ].join('\n');
          res.send(`## 曲${i}はこれ！\n${table}`);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  //URLつき、番号random
  robot.hear(/^%watch\s+r$/i, (res: any) => {
    const { message } = res.message;
    const { id, user } = message;
    if(!user.bot){
      requestPromise(op('get'))
        .then((body) => {
          const i = getRandom(0, body.length);
          const { user, title, url } = body[i];
          const table = [
            '|No.|User|Title|URL|',
            '|--:|----|-----|---|',
            `|${i}|:@${user}:${user}|${title}|${url}|`
          ].join('\n');
          res.send(`## きなののオススメソングはこれ！\n${table}`);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });

  //URLつき、全部
  robot.hear(/^%watch\s+all$/i, (res: any) => {
    const { message } = res.message;
    const { id, user } = message;
    if(!user.bot){
      requestPromise(op('get'))
        .then((body) => {
          const table = [
            '|No.|User|Title|URL|',
            '|--:|----|-----|---|',
            ...body.map(({ user, title, url }: { user: string, title: string, url: string }, idx: number) => (
              `|${idx}|:@${user}:${user}|${title}|${url}|`)
            )
          ].join('\n') + '\n';
          res.send(`## プレイリストやんね～\n${table}`);
        })
        .catch((err) => {
          console.log(err);
          robot.send({userID: IDs.at_Ras}, `${err}\nhttps://q.trap.jp/messages/${id}`);
        });
    }
  });
};
