const { User } = require("hubot");

let responds = [
    /.*hoge.*/i,
    /.*もちもち.*/,
    /(できること|help)/i
];
let replys = [
    "huga",
    "きなこもち～～～～～！",
    "[きなのはなんでもできるやんね！](https://wiki.trap.jp/bot/kinano)"
];
let hears = [
    /.*(もふもち|もちもふ).*/,
    /(いらっしゃい|join)$/i,
    /(ばいばい|バイバイ|bye)$/i,
    /.*(らす|Ras).*/i,
    /.*もちもち.*/,
    /.*きなこ.*/,
    /.*きなの.*/,
    /.*やんね.*/,
    /.*おい(?!す).*/,
    /.*(か[あ～]|[っう]かな|[やす]るぞ)$/,
    /.*うまうま.*/,
    /.*[い言云]ってる$/,
    /.*(死|:si\..*:).*/,
    /.*(おなか).*/
];
let sends = [
    "言いすぎやんね！！！:gao-.ex-large::anger.small.wiggle.wiggle:",
    ':oisu-1::oisu-2::oisu-3::oisu-4yoko: \n!{"type":"user","raw":"@Ras","id":"0fa5d740-0841-4b88-b7c8-34a68774c784"}',
    '本当によろしいですか？よろしい場合は:one:を、やめられる場合は:two:を押してください。やめられる場合は:two.ex-large:を押してください。\n!{"type":"user","raw":"@Ras","id":"0fa5d740-0841-4b88-b7c8-34a68774c784"}'  ,
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
    "ぽんぽん！"
];
let mohus = [
    "なにそれ",
    "なにそれ",
    "もふもふ～",
    "もふもふ",
    "ふがふが",
    "がりがり",
    "ぽたぽた",
    "ほぶほぶ",
    "あわあわ",
    "きなきな",
    "ひばひば"
];
let natterus = [
    ":yaya::koreni_natteru.large:",
    ":koreni_natteru.ex-large:",
    "なるな！"
]
let STAMPhears = [
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(やんね|きな[この]|黄名子|yannne).*/i,
    /.*(黄|yellow).*/i,
    /.*(らす|Ras).*/i,
    /.*(おは|ohagoza|ohasta).*/i,
];
let STAMPsends = [
    "yannne",
    "gao-",
    "kinako",
    "mochimochi_kinakomochi",
    "yellow",
    "rascal",
    "ohagoza"
];
sleeps = [
    "oyasumi",
    "osumiya",
    "poyasimi",
    "oyasta",
    "suya",
    "guaaa",
    "ha",
    "ha-kireta"
];

module.exports = robot => {

    //起動時メッセージ
    deplymessage = ":@BOT_kinano.rotate.rotate::loading::@BOT_kinano.rotate.rotate:";
    robot.send({channelID: "f58c72a4-14f0-423c-9259-dbb4a90ca35f"},deplymessage);

    //メンション付きでresponds[i]を受け取ったらメンション付きでreplys[i]を返す
    for(let i = 0;i < responds.length;i++){
        robot.respond(responds[i], res => {
            const {message} = res.message;
            const {user} = message;
            // const channelId = res.message.message.channelId;
            if(user.bot)
                return;
            else 
                setTimeout(() => {
                    res.reply(replys[i]);
                },500);
        });
    }

    //監視対象チャンネルでhears[i]を受け取ったらsends[i]を返す
    for(let i = 0;i < hears.length;i++){
        robot.hear(hears[i], res => {
            const {message} = res.message;
            const {user} = message;
            // const channelId = res.message.message.channelId;
            if(user.bot)
                return;
            else if(i === 0) 
                setTimeout(() => {
                    res.send(sends[0]);
                },1000);
            else 
                setTimeout(() => {
                    res.send(sends[i]);
                },500);
        });
    }

    //監視対象チャンネルで"もふもふ"を受け取ったらmohusからランダムで返す
    robot.hear(/.*もふもふ.*/, res => {
        let i = Math.floor( Math.random() * mohus.length );
        const {message} = res.message;
        const {user} = message;
        // const channelId = res.message.message.channelId;
        if(user.bot)
            return;
        else 
            setTimeout(() => {
                res.reply(mohus[i]);
            },500);
    });

    //監視対象チャンネルで"なってる"を受け取ったらnatterusからランダムで返す
    robot.hear(/.*なってる$/, res => {
        let i = Math.floor( Math.random() * natterus.length );
        setTimeout(() => {
            res.reply(natterus[i]);
        },500);
    });

    // // 監視対象チャンネルでSTAMPhears[i]を受け取ったらSTAMPsends[i]のスタンプを押す
    for(let i = 0;i < hears.length;i++){
        robot.hear(STAMPhears[i], res => {
            res.send(
                {
                    type: "stamp",
                    name: STAMPsends[i]
                }
            );
        });
    }

    //監視対象チャンネルで"寝"を受け取ったらsleepsからランダムでスタンプを返す
    robot.hear(/.*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*/, res => {
        let i = Math.floor( Math.random() * sleeps.length );
        res.send(
            {
                type: "stamp",
                name: sleeps[i]
            }
        );
    });

        //監視対象チャンネルで"おいすー"を受け取ったら"お""い""す""ー"スタンプをランダム順で返す
    robot.hear(/.*(おいす|:oisu-1::oisu-2::oisu-3::oisu-4yoko:).*/i, res => {
        res.send(
            {
                type: "stamp",
                name: "oisu-1"
            }
        );
        res.send(
            {
                type: "stamp",
                name: "oisu-2"
            }
        );
        res.send(
            {
                type: "stamp",
                name: "oisu-3"
            }
        );
        res.send(
            {
                type: "stamp",
                name: "oisu-4yoko"
            }
        );
    });

};