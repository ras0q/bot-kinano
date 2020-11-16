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
    ans: readme,
  },
  {
    msg: /もちもち$/,
    ans: "きなこもち～～～～～！"
  }
];
exports.is_mentioned = is_mentioned;

const is_not_mentioned = [
  {
    msg: /^code$/,
    ans: "https://git.trap.jp/Ras/KNKbot"
  },
  {
    msg: /(Ras|らす|ラス)/i,
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
    msg: /もちもち/,
    ans: "もちもち～:blobenjoy:"
  },
  {
    msg: /やんね/,
    ans: "やんね！"
  },
  {
    msg: /([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))(?!([すスｽ]|(:oisu\-3.*:)))/,
    ans: "おい！"
  },
  {
    msg: /(か[あ～]|car|[っう]かな|[やす]るぞ)/,
    ans: "いいぞいいぞ"
  },
  {
    msg: /うま(?!(うま))/,
    ans: "むしゃ"
  },
  {
    msg: /うまうま/,
    ans: "むしゃむしゃ"
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
  }
];
exports.is_not_mentioned = is_not_mentioned;

