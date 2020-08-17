const readme = require("./words").readme;
const responds = require("./words").responds;
const replys =require("./words").replys;
const hears =require("./words").hears;
const sends =require("./words").sends;
const start =require("./words").start;
const end =require("./words").end;
const natterus =require("./words").natterus;
const STAMPhears =require("./words").STAMPhears;
const STAMPsends =require("./words").STAMPsends;

module.exports = robot => {

    //起動時メッセージ
    let deplymessage = "# デプロイ完了";
    robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},deplymessage);

    //ID取得
    robot.respond(/.*ID.*/, res => {
        const MessageID = res.message.message.id;
        const channelID = res.message.message.channelID;
        const userID = res.message.message.id;
        const traqID = res.message.message.user.name;
        const displayName = res.message.message.user.displayName;
        const plainText = res.message.message.plainText;
        res.send("MessageID: "+ MessageID + "\nChannelID: " + channelID + "\nYour ID: " + userID + "\nYour traqID: " + traqID + "\nYour name: " + displayName + "\nPlain text: 「" + plainText + "」")
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
    });

    //help
    robot.respond(/(できること|help)/i, res => {
        const {message} = res.message;
        const {user} = message;
        if(!user.bot)
            setTimeout(() => {
                res.send(readme);
            },500);
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

    //``@BOT_kinano .*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*``(監視対象チャンネルではメンション不要)を受け取るとランダム返信
    robot.hear(/.*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*/, res => {
        let i = Math.random();
        setTimeout(() => {
            if(i > 0.9) res.send("えへへ")
            else if(i > 0.7) res.send("寝るな！")
            else res.send(
                {
                    type: "stamp",
                    name: "oyasumi"
                }
            );
        }, 500);
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