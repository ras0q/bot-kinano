const fs = require('fs');
const readme = fs.readFileSync("./README.md", 'utf8');

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
    return Math.floor(Math.random() * (end - start)) + start;
}

const getMofu = () => {
    let r = "";
    for(let i = 0; i < 2; i++){
        const generated = String.fromCodePoint(getMofu("ぁ".codePointAt(0), "ん".codePointAt(0)+1));
        r += generated;
    }
    return r + r;
}

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
        msg: /^.*Ras.*/i,
        ans:{
                type: "stamp",
                name: "Rascal"
            }
    },
    {
        msg: /^.*もちもち.*/,
        ans: "もちもち～:blobenjoy:"
    },
    {
        msg: /^.*(きなこ|kinako).*/,
        ans: ":kinako.ex-large:"
    },
    {
        msg: /^.*(きなの|kinano).*/,
        ans: "えへえへ"
    },
    {
        msg: /^.*やんね.*/,
        ans: "やんね！"
    },
    {
        msg: /^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))(?!([すスｽ]|(:oisu\-3.*:))).*/,
        ans: "おい！"
    },
    {
        msg: /^.*(か[あ～]|car|[っう]かな|[やす]るぞ).*/,
        ans: "いいぞいいぞ"
    },
    {
        msg: /^.*うまうま.*/,
        ans: "むしゃむしゃ"
    },
    {
        msg: /^.*[い言云]ってい?る.*/,
        ans: "いうな！"
    },
    {
        msg: /^.*(死|:si.*:).*/,
        ans: "死ぬな！"
    },
    {
        msg: /^.*(おなか|お腹).*/,
        ans: "ぽんぽん！"
    },
    {
        msg: /^.*(助けて|たすけて|tasukete).*]/,
        ans: readme
    },
    {
        msg: /^.*もふもふ.*/,
        ans: getMofu("ぁ".codePointAt(0), "ん".codePointAt(0)+1)
    },
    {
        msg: /^.*なってる$/,
        ans: natterus[getRandom(0, natterus.length)]
    },
    {
        msg: /^.*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*/,
        ans: sleeps[getRandom(0, sleeps.length)]
    },
    {
        msg: /^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:)).*/i,
        ans: {
            type: "stamp",
            name: "oisu-1"
        }
    },
    {
        msg: /^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:)).*/i,
        ans: {
            type: "stamp",
            name: "oisu-2"
        }
    },
    {
        msg: /^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:)).*/i,
        ans: {
            type: "stamp",
            name: "oisu-3"
        }
    },
    {
        msg: /^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:)).*/i,
        ans: {
            type: "stamp",
            name: "oisu-4yoko"
        }
    }
];

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

exports.getRandom = getRandom;
exports.getMofu = getMofu;
exports.is_mentioned = is_mentioned;
exports.is_not_mentioned = is_not_mentioned;
exports.natterus = natterus;

