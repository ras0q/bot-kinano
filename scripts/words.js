const fs = require('fs');
const readme = fs.readFileSync("./README.md", 'utf8');

const natterus = [
    ":yaya::koreni_natteru.large:",
    ":koreni_natteru.ex-large.rotate:",
    "なるな！",
    "なるな！",
    "なるな！",
    "なるな！",
    "なるな！",
    "なるな！",
]

const sleeps = [
    "おやすみやんね～えへへ",
    "寝るな！",
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    },
    {
        type: "stamp",
        name: "oyasumi"
    }
]

const is_mentioned = [
    {
        msg: /.*hoge.*/i,
        ans: "huga"
    },
    {
        msg: /(できること|help)$/i,
        ans: readme,
    },
    {
        msg: /.*もちもち.*/,
        ans: "きなこもち～～～～～！"
    }
];

const is_not_mentioned = [
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
        msg: /(きなこ|kinako)/,
        ans: ":kinako.ex-large:"
    },
    {
        msg: /きなの/,
        ans: "えへえへ"
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
        msg: /うまうま/,
        ans: "むしゃむしゃ"
    },
    {
        msg: /[い言云]ってい?る/,
        ans: "いうな！"
    },
    {
        msg: /(死|:si.*:)/,
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
        msg: /いい？/,
        ans: "いいよ"
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

exports.natterus = natterus;
exports.sleeps = sleeps;
exports.is_mentioned = is_mentioned;
exports.is_not_mentioned = is_not_mentioned;

