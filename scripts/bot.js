const { User } = require("hubot");

let responds = [
    /.*hoge.*$/i,
    /.*いらっしゃい.*$/i,
    /.*もちもち.*$/i,
    /できること$/i
];
let replys = [
    "huga",
    "おいす～(まだできないので``@Ras いらっしゃい``してね)",
    "きなこもち～～～～～！",
    "[きなのはなんでもできるやんね！](https://wiki.trap.jp/bot/kinano)"
];
let hears = [
    /.*(もふもち|もちもふ).*/i,
    /.*(らす|Ras).*/i,
    /.*(おは|ohagoza|ohasta).*/i,
    /.*(おやすみ|oyasumi|osumiya|oyasuta|poyasimi).*/i,
    /.*もちもち.*/i,
    /.*きなこ.*/i,
    /.*やんね.*/i,
    /.*おい.*/i,
    /.*(かあ|か～).*/i,
    /.*うまうま.*/i,
    /.*(言ってる|いってる)$/i,
    /.*(死ぬ|:si).*/i
];
let sends = [
    "言いすぎやんね！！！:gao-.ex-large::anger.small.wiggle.wiggle:",
    "えへへ",
    "おはようやんね～",
    "おやすみやんね～:zzz:",
    "もちもち～:blobenjoy:",
    ":kinako.ex-large:",
    "やんね！",
    "おい！",
    "いいぞいいぞ",
    "むしゃむしゃ",
    "いうな！",
    "死ぬな！"
];
let mohus = [
    "なにそれ",
    "なにそれ",
    "なにそれ",
    "もふもふ～",
    "課題やって",
    "もふもふ～:blob_pyon:",
    "きなこもち！！！:kinako.ex-large:",
    {type: "stamp",name: "hi"},
    {type: "stamp",name: "hi_UD"}
];
let natterus = [
    ":yaya::koreni_natteru.large:",
    ":koreni_natteru.ex-large:",
    "なるな！"
]
let STAMPhears = [
    /.*(やんね|きなこ|きなの|黄名子|yannne).*/i,
    /.*(黄|yellow).*/i,
    /.*(らす|Ras).*/i
];
let STAMPsends = [
    "yannne",
    "yellow",
    "rascal"
];
sleeps = [
    "oyasumi",
    "osumiya",
    "poyasimi",
    "oyasuta",
    "suya",
    "guaaa",
    "ha",
    "ha-kireta",
    "amae"
];

module.exports = robot => {

    //メンション付きでresponds[i]を受け取ったらメンション付きでreplys[i]を返す
    for(let i = 0;i < responds.length;i++){
        robot.respond(responds[i], res => {
            const {message} = res.message;
            const {user} = message;
            // const channelId = res.message.message.channelId;
            if(user.bot) return;
            else res.reply(replys[i]);
        });
    }

    //監視対象チャンネルでhears[i]を受け取ったらsends[i]を返す
    for(let i = 0;i < hears.length;i++){
        robot.hear(hears[i], res => {
            const {message} = res.message;
            const {user} = message;
            // const channelId = res.message.message.channelId;
            if(user.bot) return;
            else res.send(sends[i]);
        });
    }

    //監視対象チャンネルで"もふもふ"を受け取ったらmohusからランダムで返す
    robot.hear(/.*もふもふ.*/i, res => {
        let i = Math.floor( Math.random() * mohus.length );
        const {message} = res.message;
        const {user} = message;
        // const channelId = res.message.message.channelId;
        if(user.bot) return;
        else res.reply(mohus[i]);
    });
    
    //監視対象チャンネルで"なってる"を受け取ったらnatterusからランダムで返す
    robot.hear(/.*なってる$/i, res => {
        let i = Math.floor( Math.random() * natterus.length );
        res.reply(natterus[i]);
    });

    // // 監視対象チャンネルでSTAMPhears[i]を受け取ったらSTAMPsends[i]のスタンプを押す
    for(let i = 0;i < hears.length;i++){
        robot.hear(STAMPhears[i], res => {
            res.send(
                {
                    types: "stamp",
                    name: STAMPsends[i]
                }
            );
        });
    }

    //監視対象チャンネルで"寝"を受け取ったらsleepsからランダムで返す
    robot.hear(/.*寝.*/i, res => {
        let i = Math.floor( Math.random() * sleeps.length );
        res.send(
            {
                type: "stamp",
                name: sleeps[i]
            }
        );
    });

};