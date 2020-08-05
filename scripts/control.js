const { User } = require("hubot");

module.exports = robot => {

    //起動時メッセージ
    deplymessage = ":kinano.ex-large.pyon:";
    robot.send({channelID: "f58c72a4-14f0-423c-9259-dbb4a90ca35f"},deplymessage);

    //``@BOT_kinano responds[i]``を受け取ると``@username replys[i]``を返す
    for(let i = 0;i < responds.length;i++){
        robot.respond(responds[i], res => {
            const {message} = res.message;
            const {user} = message;
            if(user.bot)
                return;
            else 
                setTimeout(() => {
                    res.reply(replys[i]);
                },500);
                if(i == 0 || i == 1){
                    setTimeout(() => {
                        res.send(
                            {
                                type: "stamp",
                                name: "one"
                            },
                            {
                                type: "stamp",
                                name: "two"
                            },
                            '!{"type":"user","raw":"@Ras","id":"0fa5d740-0841-4b88-b7c8-34a68774c784"}'
                            );
                    },1500);
                }
        });
    }

    //``@BOT_kinano hears[i]``(監視対象チャンネルではメンション不要)を受け取ると``sends[i]``を返す
    for(let i = 0;i < hears.length;i++){
        robot.hear(hears[i], res => {
            const {message} = res.message;
            const {user} = message;
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

    //``@BOT_kinano もふもふ``(監視対象チャンネルではメンション不要)を受け取るとランダム文字列を返す
    //正規表現使って簡潔に書きたい
    robot.hear(/.*もふもふ.*/, res => {
        const {message} = res.message;
        const {user} = message;
        if(user.bot)
            return;
        else {
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
        if(user.bot)
            return;
        else {
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