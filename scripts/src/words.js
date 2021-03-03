const path = require('path');
const fs = require('fs');
const readme = fs.readFileSync(path.resolve(__dirname, './README.md'), 'utf8');

const natterus = [
  ':yaya::koreni_natteru.large:',
  ...new Array(4).fill(null).map((_, idx) =>
    `:koreni_natteru.ex-large${'.rotate'.repeat(idx + 1)}:`
  ),
  ...new Array(9).fill('なるな！')
];
exports.natterus = natterus;

const is_mentioned = [
  {
    msg: /hoge$/i,
    ans: 'huga'
  },
  {
    msg: /(できること|help)$/i,
    ans: `\n${readme}`,
  },
  {
    msg: /もちもち$/,
    ans: 'きなこもち～～～～～！'
  },
];
exports.is_mentioned = is_mentioned;

const is_not_mentioned = [
  {
    msg: /(?<![tとト])(ras|らす|ラス)|(ras|らす|ラス)(?!(ta|た|タ))/i,
    ans: {
      type: 'stamp',
      name: 'rascal'
    }
  },
  {
    msg: /^(おわ|った)$/,
    ans: {
      type: 'stamp',
      name: 'clap'
    }
  },
  {
    msg: /やんね/,
    ans: 'やんね！'
  },
  {
    msg: /(か[あ～]|car|[やす]るぞ)/,
    ans: {
      type: 'stamp',
      name: 'iizo'
    }
  },
  {
    msg: /[い言云]ってる$/,
    ans: 'いうな！'
  },
  {
    msg: /(おなか|お腹)/,
    ans: 'ぽんぽん！'
  },
  {
    msg: /(たすけて|tasukete)/,
    ans: readme
  },
  {
    msg: /いい？$/,
    ans: {
      type: 'stamp',
      name: 'iiyo'
    }
  },
  {
    msg: /^よ$/,
    ans: 'よっっ！:v:'
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-1'
    }
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-2'
    }
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-3'
    }
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))([すスｽ]|(:oisu-3[^:]*:))/i,
    ans: {
      type: 'stamp',
      name: 'oisu-4yoko'
    }
  }
];
exports.is_not_mentioned = is_not_mentioned;

const loops = [
  {
    msg: /([おぉオォｵｫ]|(:oisu-1[^:]*:))([いぃイィｲｨｨ]|(:oisu-2[^:]*:))(?!([すスｽ]|(:oisu-3[^:]*:)))/g,
    ans: 'おい'
  },
  {
    msg: /(お|o|O|オ){3}/g,
    ans: 'かやま'
  },
  {
    msg: /うま/g,
    ans: 'むしゃ'
  },
  {
    msg: /わく/g,
    ans: 'わくわく'
  },
  {
    msg: /[もモ][ちチ]/g,
    ans: 'もち'
  },
  {
    msg: /うん/g,
    ans: 'うんうん'
  }
];
exports.loops = loops;

const IDs = {
  gt_Ras: 'f58c72a4-14f0-423c-9259-dbb4a90ca35f',
  gtR_Bot: '2a5616d5-5d69-4716-8377-1e1fb33278fe',
  gtRB_log: '82b9f8ad-17d9-4597-88f1-0375247a2487',
  at_Ras: '82b9f8ad-17d9-4597-88f1-0375247a2487',
  at_kinano: 'f60166fb-c153-409a-811d-272426eda32b',
};
exports.IDs = IDs;