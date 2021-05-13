import path from 'path';
import fs from 'fs';

export const readme = fs.readFileSync(
  path.resolve(__dirname, './help.md'),
  'utf8'
);

export const natterus = [
  ':yaya::koreni_natteru.large:',
  ...(new Array(4)
    .fill(null)
    .map(
      (_, idx) => `:koreni_natteru.ex-large${'.rotate'.repeat(idx + 1)}:`
    ) as string[]),
  ...(new Array(9).fill('なるな！') as string[]),
];

export const isMentioned = [
  {
    msg: /hoge$/i,
    ans: 'huga',
  },
  {
    msg: /(できること|help)$/i,
    ans: `\n${readme}`,
  },
  {
    msg: /もちもち$/,
    ans: 'きなこもち～～～～～！',
  },
];

export const isNotMentioned: {
  msg: RegExp;
  ans:
    | string
    | {
        type: 'stamp';
        name: string;
      };
}[] = [
  {
    msg: /(?<![tとト])(ras|らす|ラス)|(ras|らす|ラス)(?!(ta|た|タ))/i,
    ans: {
      type: 'stamp',
      name: 'rascal',
    },
  },
  {
    msg: /^(おわ|った)$/,
    ans: {
      type: 'stamp',
      name: 'clap',
    },
  },
  {
    msg: /やんね/,
    ans: 'やんね！',
  },
  {
    msg: /(か[あ～]|car|[やす]るぞ)/,
    ans: {
      type: 'stamp',
      name: 'iizo',
    },
  },
  {
    msg: /[い言云]ってる$/,
    ans: 'いうな！',
  },
  {
    msg: /(おなか|お腹)/,
    ans: 'ぽんぽん！',
  },
  {
    msg: /(たすけて|tasukete)/,
    ans: readme,
  },
  {
    msg: /いい？$/,
    ans: {
      type: 'stamp',
      name: 'iiyo',
    },
  },
  {
    msg: /^よ$/,
    ans: 'よっっ！:v:',
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-1',
    },
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-2',
    },
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-3',
    },
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-4yoko',
    },
  },
  {
    msg: /あっち/,
    ans: 'https://twitter.com/Joekun_tech/status/1376354898812366850?s=20',
  },
];

export const loops = [
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))(?!([すスｽ]|(:oisu-3[^:]*:)))/g,
    ans: 'おい',
  },
  {
    msg: /(お|o|O|オ){3}/g,
    ans: 'かやま',
  },
  {
    msg: /うま/g,
    ans: 'むしゃ',
  },
  {
    msg: /わく/g,
    ans: 'わくわく',
  },
  {
    msg: /[もモ][ちチ]/g,
    ans: 'もち',
  },
  {
    msg: /うん/g,
    ans: 'うんうん',
  },
];

export const IDs = {
  gt_Ras: 'f58c72a4-14f0-423c-9259-dbb4a90ca35f',
  gtR_Bot: '2a5616d5-5d69-4716-8377-1e1fb33278fe',
  gtRB_log: '82b9f8ad-17d9-4597-88f1-0375247a2487',
  at_Ras: '0fa5d740-0841-4b88-b7c8-34a68774c784',
  at_kinano: 'f60166fb-c153-409a-811d-272426eda32b',
};

export const scheduling = {
  // hour は [0, 24) の整数の配列
  Z: {
    channelId: '2937b540-2991-44ce-91dd-504dd29f01e7',
    hour: [8],
  },
  Kamijo: {
    channelId: '2fab81dd-a750-4699-a9c5-3fc13ab9bcee',
    hour: [8, 21],
  },
  d_etteiu8383: {
    channelId: '9f452f69-2bc2-40ee-a165-7e7ca251116d',
    hour: [5],
  },
  tqk: {
    channelId: '320656a2-0f43-4f80-a7f0-638baaad4084',
    hour: [8, 22],
  },
};
