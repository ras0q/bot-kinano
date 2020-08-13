//コマンド一覧
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
    /.*Ras.*/i,
    /.*もちもち.*/,
    /.*きなこ.*/,
    /.*きなの.*/,
    /.*やんね.*/,
    /.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))(?!([すスｽ]|(:oisu\-3.*:))).*/,
    /.*(か[あ～]|car|[っう]かな|[やす]るぞ).*/, //後方一致どうしよう
    /.*うまうま.*/,
    /.*[い言云]ってい?る$/,
    /.*(死|:si.*:).*/,
    /.*(おなか).*/,
    /.*(もふもち|もちもふ).*/,
];
const sends = [
    "えへへ",
    "もちもち～:blobenjoy:",
    ":kinako.ex-large:",
    ":kinano.ex-large.pyon:",
    "やんね！",
    "おい！",
    "いいぞいいぞ",
    "むしゃむしゃ",
    "いうな！",
    "死ぬな！",
    "ぽんぽん！",
    "言いすぎやんね！！！:gao-.ex-large::anger.small.wiggle.wiggle:",
];


//unicodeからひらがなを取得(``@BOT_kinano もふもふ``を受け取った時にランダム文字列を返すのに使用)
const start = "ぁ".codePointAt(0);
const end = "ん".codePointAt(0);


//``@BOT_kinano .*なってる``(監視対象チャンネルではメンション不要)(後方一致)を受け取るとnatterusからランダムで返す
const natterus = [
    ":yaya::koreni_natteru.large:",
    ":koreni_natteru.ex-large:",
    "なるな！"
]


//``@BOT_kinano STAMPhears[i]``(監視対象チャンネルではメンション不要)を受け取るとSTAMPsends[i]のスタンプを押す
const STAMPhears = [
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(黄|yellow).*/i,
    /.*Ras.*/i,
    /.*(おは|ohagoza|ohasta).*/i,
];
const STAMPsends = [
    "yannne",
    "gao-",
    "kinako",
    "mochimochi_kinakomochi",
    "yellow",
    "rascal",
    "ohagoza",
];


//``@BOT_kinano .*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*``(監視対象チャンネルではメンション不要)(部分一致、()内の言葉ならどれでもよい)を受け取るとsleepsからランダムでスタンプを押す
const sleeps = [
    "oyasumi",
    "osumiya",
    "poyasimi",
    "oyasta",
    "suya",
    "guaaa",
    "ha-kireta"
];

//helpメッセージ
const readme = "# できること:gao-:\nきなのはなんでもできるやんね！\n\n### コミュニケーション :blobdrum:\n- ``@BOT_kinano できること`` : きなのはなんでもできるやんね～\n- ``@BOT_kinano いらっしゃい`` : 監視対象に追加するやんね～\n- ``@BOT_kinano もちもち`` : おもちをたべるやんね！\n- ``@BOT_kinano もふもふ`` : もふもふするやんね～\n- ``@BOT_kinano もちもち`` : もちもちするやんね～\n- ``@BOT_kinano おはよう`` : おはようやんね～\n- ``@BOT_kinano おやすみ`` : おやすみやんね～\n- ほかにもあるやんね～\n\n### プレイリスト:blobguitar:\n- ``@BOT_kinano %add 曲名``: 曲を追加できるやんね！\n- ``@BOT_kinano %watch``: プレイリストが見れるやんね～\n- ``@BOT_kinano %delete 曲番号``プレイリストから削除できるやんね！ほかの人が追加した曲を削除しないように注意するやんね～\n";


exports.responds = responds;
exports.replys = replys;
exports.hears = hears;
exports.sends = sends;
exports.start = start;
exports.end = end;
exports.natterus = natterus;
exports.STAMPhears = STAMPhears;
exports.STAMPsends = STAMPsends;
exports.sleeps = sleeps;
exports.readme = readme;