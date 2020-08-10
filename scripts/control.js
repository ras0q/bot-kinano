const { User } = require("hubot");

//コマンド一覧
//``@BOT_kinano responds[i]``を受け取ると``@username replys[i]``を返す
const responds = [
    /.*hoge.*/i,
    /.*もちもち.*/,
    /(できること|help)/i
];
const replys = [
    "huga",
    "きなこもち～～～～～！",
    "[きなのはなんでもできるやんね！](https://wiki.trap.jp/bot/kinano)"
];

//``@BOT_kinano hears[i]``(監視対象チャンネルではメンション不要)を受け取ると``sends[i]``を返す
const hears = [
    /.*((?![とトﾄ])[らラﾗ][すスｽ]|(?!t)Ras).*/i,
    /.*もちもち.*/,
    /.*きなこ.*/,
    /.*きなの.*/,
    /.*やんね.*/,
    /.*[おぉオォｵｫ(:oisu-1.*:)][いぃイィｲｨ(:oisu-2.*:)](?![すスｽ(:oisu-3.*:)]).*/,
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
    /.*((?![とトﾄ])[らラﾗ][すスｽ]|(?!t)Ras).*/i,
    /.*(おは|ohagoza|ohasta).*/i,
    /.*trasta.*/i
];
const STAMPsends = [
    "yannne",
    "gao-",
    "kinako",
    "mochimochi_kinakomochi",
    "yellow",
    "rascal",
    "ohagoza",
    "trasta"
];

//``@BOT_kinano .*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*``(監視対象チャンネルではメンション不要)(部分一致、()内の言葉ならどれでもよい)を受け取るとsleepsからランダムでスタンプを押す
const sleeps = [
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

    // const channelId = res.message.message.channelId;
    // const userId = res.message.message.id;
    // const displayname = res.message.message.user.displayName;


    //起動時メッセージ
    let deplymessage = ":kinano.ex-large.pyon:";
    robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},deplymessage);

    //ID取得
    robot.respond(/ID$/i, res => {
        res.send("あなたのIDは"+ res.message.message.id + "\nあなたの名前は" + res.message.message.user.displayName + "\nチャンネルIDは" + res.message.message.channelId + "です。")
    });

    //監視対象に追加
    robot.respond(/(いらっしゃい|join)$/i, res => {
        robot.send(
            {channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},
            "**join** request" 
            + "\n user : " + '!{"type":"user","raw":"@' + res.message.message.user.name + '","id":"' + res.message.message.id + '"}'
            + "\nchannel : " + res.message.message.channelId 
            + "\ntime : " + res.message.message.createdAt
            )
        setTimeout(() => {
            res.send(
                ":oisu-1::oisu-2::oisu-3::oisu-4yoko:\n(少し時間がかかります)",
                )
        },500);
        // setTimeout(() => {
        //     res.send(
        //         '!{"type":"user","raw":"@Ras","id":"8ccd1354-cd16-4cda-9681-5b41e5f6ea76"}'
        //         )
        // },1000);
    });

    //監視対象から解除
    robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
        robot.reply(
            {channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},
            "**leave** request" 
            + "\n user : " + '!{"type":"user","raw":"@' + res.message.message.user.name + '","id":"' + res.message.message.id + '"}'
            + "\nchannel : " + res.message.message.channelId 
            + "\ntime : " + res.message.message.createdAt
            )
        setTimeout(() => {
            res.reply(
                "ばいばいやんね～、また遊んでやんね～\n(少し時間がかかります)",
            )
        },500);
        // setTimeout(() => {
        //     res.send(
        //         '!{"type":"user","raw":"@Ras","id":"8ccd1354-cd16-4cda-9681-5b41e5f6ea76"}'
        //         )
        // },1000);
    });

    //``@BOT_kinano responds[i]``を受け取ると``@username replys[i]``を返す
    for(let i = 0;i < responds.length;i++){
        robot.respond(responds[i], res => {
            const {message} = res.message;
            const {user} = message;
            if(!user.bot) 
                setTimeout(() => {
                    res.reply(replys[i]);
                },300 * (i + 1));
        });
    }

    //``@BOT_kinano hears[i]``(監視対象チャンネルではメンション不要)を受け取ると``sends[i]``を返す
    for(let i = 0;i < hears.length;i++){
        robot.hear(hears[i], res => {
            const {message} = res.message;
            const {user} = message;
            if(!user.bot){
                    setTimeout(() => {
                        res.send(sends[i]);
                    },300 * (i + 1));
            }
        });
    }

    //``@BOT_kinano もふもふ``(監視対象チャンネルではメンション不要)を受け取るとランダム文字列を返す
    //正規表現使って簡潔に書きたい
    robot.hear(/.*もふもふ.*/, res => {
        const {message} = res.message;
        const {user} = message;
        if(!user.bot){
            let r = "";
            for(let i = 0; i < 2; i++){
                const generated = String.fromCodePoint(Math.floor(Math.random() * (end - start)) + start);
                r += generated;
            }
            setTimeout(() => {
                res.reply(r + r);
            },500);
        }
    });

    //``@BOT_kinano .*なってる``(監視対象チャンネルではメンション不要)(後方一致)を受け取るとnatterusからランダムで返す
    robot.hear(/.*なってる$/, res => {
        const {message} = res.message;
        const {user} = message;
        if(!user.bot){
            let i = Math.floor( Math.random() * natterus.length );
            setTimeout(() => {
                res.reply(natterus[i]);
            },500);
        }
    });

    //``@BOT_kinano STAMPhears[i]``(監視対象チャンネルではメンション不要)を受け取るとSTAMPsends[i]のスタンプを押す
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

    //``@BOT_kinano .*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*``(監視対象チャンネルではメンション不要)(部分一致、()内の言葉ならどれでもよい)を受け取るとsleepsからランダムでスタンプを押す
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
    robot.hear(/.*[おぉオォｵｫ(:oisu-1.*:)][いぃイィｲｨｨ(:oisu-2.*:)][すスｽ(:oisu-3.*:)].*/i, res => {
        for(let i = 1; i < 5; i++){
            if(i == 4){
                res.send(
                    {
                        type: "stamp",
                        name: "oisu-4yoko" 
                    }
                );
            }
            else{
                res.send(
                    {
                        type: "stamp",
                        name: "oisu-" + i
                    }
                );
            }
        }
    });

};