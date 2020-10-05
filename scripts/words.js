//コマンド一覧

//helpメッセージ
const fs = require('fs');
const readme = fs.readFileSync("./README.md", 'utf8');

//``@BOT_kinano responds[i]``を受け取ると``@username replys[i]``を返す
const responds = [
    /.*hoge.*/i,
    /.*もちもち.*/,
];
const replys = [
    "huga",
    "きなこもち～～～～～！",
];


//``@BOT_kinano hears[i]``(監視対象チャンネルではメンション不要)を受け取ると``sends[i]``を返す
const hears = [
    /^.*Ras.*/i,
    /^.*もちもち.*/,
    /^.*(きなこ|kinako).*/,
    /^.*(きなの|kinano).*/,
    /^.*やんね.*/,
    /^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))(?!([すスｽ]|(:oisu\-3.*:))).*/,
    /^.*(か[あ～]|car|[っう]かな|[やす]るぞ).*/, //後方一致どうしよう
    /^.*うまうま.*/,
    /^.*[い言云]ってい?る.*/,
    /^.*(死|:si.*:).*/,
    /^.*(おなか|お腹).*/,
    /^.*(もふもち|もちもふ).*/,
    /^.*(助けて|たすけて|tasukete).*/
];
const sends = [
    "えへへ",
    "もちもち～:blobenjoy:",
    ":kinako.ex-large:",
    "えへえへ",
    "やんね！",
    "おい！",
    "いいぞいいぞ",
    "むしゃむしゃ",
    "いうな！",
    "死ぬな！",
    "ぽんぽん！",
    "言いすぎやんね！！！:gao-.ex-large::anger.small.wiggle.wiggle:",
    readme
];


//unicodeからひらがなを取得(``@BOT_kinano もふもふ``を受け取った時にランダム文字列を返すのに使用)
const start = "ぁ".codePointAt(0);
const end = "ん".codePointAt(0);


//``@BOT_kinano .*なってる``(監視対象チャンネルではメンション不要)(後方一致)を受け取るとnatterusからランダムで返す
const natterus = [
    ":yaya::koreni_natteru.large:",
    ":koreni_natteru.ex-large:",
    "なるな！",
    "なるな！",
    "なるな！",
    "なるな！",
    "なるな！",
    "なるな！",
]


//``@BOT_kinano STAMPhears[i]``(監視対象チャンネルではメンション不要)を受け取るとSTAMPsends[i]のスタンプを押す
const STAMPhears = [
    /^.*Ras.*/i,
    /^.*(おは|ohagoza|ohasta).*/i,
];
const STAMPsends = [
    "rascal",
    "ohagoza",
];

exports.readme = readme;
exports.responds = responds;
exports.replys = replys;
exports.hears = hears;
exports.sends = sends;
exports.start = start;
exports.end = end;
exports.natterus = natterus;
exports.STAMPhears = STAMPhears;
exports.STAMPsends = STAMPsends;

