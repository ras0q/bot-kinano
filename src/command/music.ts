//Description:
//  control traQplaylist.

import { getRandom } from '../utils/random';
import { IDs } from '../src/words';
import { Robots } from '../src/types';
import { makeParseValidUrlFunc, newMusics } from '../utils/music';

/**
 * 音楽リストに関するクロージャ
 */
const musics = newMusics();

/**
 * 重複がないかを調べ、ないならば少し整形する
 * @param urlString URL を表わす文字列
 * @returns 重複がないなら string で、あるなら重複を与える要素で返す
 */
const parseValidUrl = makeParseValidUrlFunc(musics);

const extractValues = (text: string) => {
  if (text.includes('|') || text.includes('\n')) {
    return {
      title: '',
      url: '',
    };
  }

  const title_element = text.match(/\[([^[\]]*)\]\((.*)\)/);
  if (title_element !== null) {
    return {
      title: title_element[1],
      url: title_element[2],
    };
  } else {
    return {
      title: text.replace(/^%add\s+/i, ''),
      url: '',
    };
  }
};

module.exports = (robot: Robots) => {
  robot.hear(/^%add\s+.*/i, async (res) => {
    const { id, plainText, user } = res.message.message;
    const { bot, name } = user;
    if (bot) {
      return;
    }
    const { title, url } = extractValues(plainText);
    const parsedUrl = parseValidUrl(url);
    if (typeof parsedUrl !== 'string') {
      // 重複がある場合
      const { idx } = parsedUrl;
      const { user, title, url } = parsedUrl.val;
      res.reply(
        `重複してるやんね！\n|No.|User|Title|URL|\n|${idx}|${user}|${title}|${url}|`
      );
      return;
    }
    try {
      await musics.add({ user: name, url: parsedUrl, title });
      const addTable = `|User|Title|URL|\n|-|-|-|\n|:@${name}.large:${name}|${title}|${parsedUrl}|\n`;
      res.reply(`『${title}』を追加したやんね！`);
      robot.send(
        { channelID: IDs.gtRB_log },
        '## 曲が追加されたやんね！\n' + addTable
      );
    } catch (err) {
      console.log(err);
      robot.send(
        { userID: IDs.at_Ras },
        `${err}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  robot.hear(/^%remove\s+[0-9]+/i, async (res) => {
    const { id, plainText, user } = res.message.message;
    const { name, bot } = user;
    if (bot) {
      return;
    }
    const idx = parseInt(plainText.replace(/^%remove\s+/i, ''));
    try {
      await musics.remove({ idx, user: name });
      res.send(`曲${idx}を削除したやんね！`);
    } catch (err: unknown) {
      if (
        // typeof err === ... を if の条件として使いたいが、TypeScript が { message: string } とみなしてくれないので、
        // err is { message: string } を返り値に持つ関数を即時実行して、教えてあげてる
        ((err): err is { message: string } =>
          typeof err === 'object' &&
          err !== null &&
          typeof (err as { message: unknown }).message === 'string')(err)
      ) {
        if (err.message.endsWith('out of range')) {
          res.send('index out of range!');
        } else if (err.message.endsWith('cannot remove this song')) {
          res.send(`${name}には曲${idx}の削除権限がないやんね！`);
        }
      }
      console.log(err);
      robot.send(
        { userID: IDs.at_Ras },
        `${err}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  robot.hear(/^%watch$/i, (res) => {
    const { user } = res.message.message;
    if (user.bot) {
      return;
    }
    const table =
      [
        '|No.|User|Title|',
        '|-:|:-:|-|',
        '|例|:kinano:|きなこもちもちのうた|',
        ...musics
          .val()
          .map(
            ({ user, title }, idx: number) => `|${idx}|:@${user}:|${title}|`
          ),
      ].join('\n') + '\n';
    res.send(
      `## プレイリストやんね～\n${table}\n[](https://www.youtube.com/playlist?list=PLziwNdkdhnxiwuSjNF2k_-bvV1XojtWva)`
    );
  });

  //URLつき、番号指定
  robot.hear(/^%watch\s+[0-9]+/i, (res) => {
    const { plainText, user } = res.message.message;
    if (user.bot) {
      return;
    }
    const i = plainText.replace(/^%watch\s+/i, '');
    const { user: username, title, url } = musics.val()[parseInt(i)];
    const table = [
      '|No.|User|Title|URL|',
      '|--:|----|-----|---|',
      `|${i}|:@${username}:${username}|${title}|${url}|`,
    ].join('\n');
    res.send(`## 曲${i}はこれ！\n${table}`);
  });

  //URLつき、番号random
  robot.hear(/^%watch\s+(-r|--random)$/i, (res) => {
    const { user } = res.message.message;
    if (user.bot) {
      return;
    }
    const i = getRandom(0, musics.val().length);
    const { user: username, title, url } = musics.val()[i];
    const table = [
      '|No.|User|Title|URL|',
      '|--:|----|-----|---|',
      `|${i}|:@${username}:${user}|${title}|${url}|`,
    ].join('\n');
    res.send(`## きなののオススメソングはこれ！\n${table}`);
  });

  //URLつき、全部
  robot.hear(/^%watch\s+(-a|--all)$/i, (res) => {
    const { user } = res.message.message;
    if (user.bot) {
      return;
    }
    const table =
      [
        '|No.|User|Title|URL|',
        '|--:|----|-----|---|',
        ...musics
          .val()
          .map(
            (
              {
                user,
                title,
                url,
              }: { user: string; title: string; url: string },
              idx: number
            ) => `|${idx}|:@${user}:${user}|${title}|${url}|`
          ),
      ].join('\n') + '\n';
    res.send(`## プレイリストやんね～\n${table}`);
  });
};
