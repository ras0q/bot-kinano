const { User } = require("hubot");
const responds = require("./words").responds;
const replys =rewuire("./words").replys;
const hears =rewuire("./words").hears;
const sends =rewuire("./words").sends;
const start =rewuire("./words").start;
const end =rewuire("./words").end;
const natterus =rewuire("./words").natterus;
const STAMPhears =rewuire("./words").STAMPhears;
const STAMPsends =rewuire("./words").STAMPsends;
const sleeps =rewuire("./words").sleeps;

module.exports = robot => {

    //起動時メッセージ
    let deplymessage = "# デプロイ完了";
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
                },500);
        });
    }

    //``@BOT_kinano hears[i]``(監視対象チャンネルではメンション不要)を受け取ると``sends[i]``を返す
    for(let i = 0;i < hears.length;i++){
        robot.hear(hears[i], res => {
            const {message} = res.message;
            const {user} = message;
            if(!user.bot){
                if(i == 0)
                    setTimeout(() => {
                        res.send(sends[i]);
                    },1000);
                else
                    setTimeout(() => {
                        res.send(sends[i]);
                    },500);
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
    robot.hear(/.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:)).*/i, res => {
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