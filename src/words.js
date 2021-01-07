const fs = require('fs');
const readme = fs.readFileSync("./README.md", 'utf8');

const natterus = [
  ":yaya::koreni_natteru.large:",
  ":koreni_natteru.ex-large.rotate:",
  ":koreni_natteru.ex-large.rotate.rotate:",
  ":koreni_natteru.ex-large.rotate.rotate.rotate:",
  ":koreni_natteru.ex-large.rotate.rotate.rotate.rotate:",
  "なるな！",
  "なるな！",
  "なるな！",
  "なるな！",
  "なるな！",
  "なるな！",
  "なるな！",
  "なるな！",
  "なるな！",
];
exports.natterus = natterus;

const is_mentioned = [
  {
    msg: /hoge$/i,
    ans: "huga"
  },
  {
    msg: /(できること|help)$/i,
    ans: `\n${readme}`,
  },
  {
    msg: /もちもち$/,
    ans: "きなこもち～～～～～！"
  },
];
exports.is_mentioned = is_mentioned;

const is_not_mentioned = [
  {
    msg: /^code$/,
    ans: "https://git.trap.jp/Ras/KNKbot"
  },
  {
    msg: /(?<![tとト])(Ras|らす|ラス)(?!(ta|た|タ))/i,
    ans: {
      type: "stamp",
      name: "rascal"
    }
  },
  {
    msg: /^(おわ|った)$/,
    ans: {
      type: "stamp",
      name: "clap"
    }
  },
  {
    msg: /やんね/,
    ans: "やんね！"
  },
  {
    msg: /(か[あ～]|car|[っう]かな|[やす]るぞ)/,
    ans: "いいぞいいぞ"
  },
  {
    msg: /[い言云]ってい?る$/,
    ans: "いうな！"
  },
  {
    msg: /(死|:si.*:)$/,
    ans: "死ぬな！"
  },
  {
    msg: /(おなか|お腹)/,
    ans: "ぽんぽん！"
  },
  {
    msg: /(助けて|たすけて|tasukete)/,
    ans: readme
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:))/i,
    ans: {
      type: "stamp",
      name: "oisu-1"
    }
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:))/i,
    ans: {
      type: "stamp",
      name: "oisu-2"
    }
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:))/i,
    ans: {
      type: "stamp",
      name: "oisu-3"
    }
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:))/i,
    ans: {
      type: "stamp",
      name: "oisu-4yoko"
    }
  },
  {
    msg: /いい？$/,
    ans: "いいよ"
  },
  {
    msg: /^.$/,
    ans: "よっっ！:v:"
  },
  {
    msg: /^(ぼぶ[ー～]|たっくぼぶしろしろたいてっくとらっぷ)$/,
    ans: "@takku_bobshiroshiro_titech_trap"
  },
  {
    msg: /@BOT_cellophane join/,
    ans: "せろはんちゃん！よろしくね！"
  }
];
exports.is_not_mentioned = is_not_mentioned;

const loop = [
  {
    msg: /([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))(?!([すスｽ]|(:oisu\-3.*:)))/,
    ans: "おい"
  },
  {
    msg: /(お|o|O|オ){3}/,
    ans: "かやま"
  },
  {
    msg: /うま/,
    ans: "むしゃ"
  },
  {
    msg: /[もモ][ちチ]/,
    ans: "もち"
  }
]
exports.loop = loop;