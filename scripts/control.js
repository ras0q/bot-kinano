const readme = require("./words").readme;
const responds = require("./words").responds;
const replys = require("./words").replys;
const hears = require("./words").hears;
const sends = require("./words").sends;
const start = require("./words").start;
const end = require("./words").end;
const natterus = require("./words").natterus;
const STAMPhears = require("./words").STAMPhears;
const STAMPsends = require("./words").STAMPsends;

module.exports = robot => {

    const RaschannelID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f"; //#gps/times/Ras
    const R_KchannelID = "37612932-7437-4d99-ba61-f8c69cb85c41"; //Ras-BOT_kinanoのDM
    const RasuserID = "0fa5d740-0841-4b88-b7c8-34a68774c784"; //RasのuserID

    //起動時メッセージ
    let r = "";
    for(let i = 0; i < 2; i++){
        const generated = String.fromCodePoint(Math.floor(Math.random() * (end - start)) + start);
        r += generated;
    }
    robot.send(
        {channelID: RaschannelID},
        "デプロイ完了やんね～ " + r + r
    );

    //help
    robot.respond(/(できること|help)$/i, res => {
        const botflag = res.message.message.user.bot;
        if(!botflag)
            setTimeout(() => {
                res.send(readme);
            },500);
    });

    //``@BOT_kinano responds[i]``を受け取ると``@username replys[i]``を返す
    for(let i = 0; i < responds.length; i++){
        robot.respond(responds[i], res => {
            const botflag = res.message.message.user.bot;
            if(!botflag)
                setTimeout(() => {
                    res.reply(replys[i]);
                },500);
        });
    }

    //``@BOT_kinano hears[i]``(監視対象チャンネルではメンション不要)を受け取ると``sends[i]``を返す
    for(let i = 0; i < hears.length; i++){
        robot.hear(hears[i], res => {
            const botflag = res.message.message.user.bot;
            if(!botflag){
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
    robot.hear(/^.*もふもふ.*/, res => {
        const botflag = res.message.message.user.bot;
        if(!botflag){
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
    robot.hear(/^.*なってる$/, res => {
        const botflag = res.message.message.user.bot;
        if(!botflag){
            let i = Math.floor( Math.random() * natterus.length );
            setTimeout(() => {
                res.reply(natterus[i]);
            },500);
        }
    });

    //``ABCやるか``を受け取るとランダムで問題を返す
    robot.hear(/^.*ABCや.*/, res => {
        const botflag = res.message.message.user.bot;
        const plainText = res.message.message.plainText;
        if(!botflag){
            let slashindex = plainText.indexOf("/");
            let recent = 178; //最新回
            let min = 126;
            let index = ("00" + (Math.floor(Math.random() * (recent + 1 - min)) + min)).slice(-3);
            let diff = "";
            if(slashindex != -1 && plainText[slashindex + 1].match(/[a-f]/i)) diff = plainText[slashindex + 1];
            else diff = String.fromCodePoint(Math.floor(Math.random() * 6) + 97);
            setTimeout(() => {
                res.reply("今日の問題はこれやんね！\nhttps://atcoder.jp/contests/abc" + index + "/tasks/abc" + index + "_" + diff)
            })
        }
    })

    robot.hear(/^.*(お|:oisu-1(.large|.ex-large|.small|.rotate|.wiggle|.parrot|.zoom|.inversion|.turn|.turn-v|.happa|.pyon|.flashy|.pull|.atsumori|.stretch|.stretch-v|.conga|.rainbow|.ascension|.shake|.party|.attract){0,5}:){3}.*/, res => {
        const botflag = res.message.message.user.bot;
        const plainText = res.message.message.plainText;
        if(!botflag){
            let r = "";
            while(plainText.match(/^.*(お|:oisu-1(.large|.ex-large|.small|.rotate|.wiggle|.parrot|.zoom|.inversion|.turn|.turn-v|.happa|.pyon|.flashy|.pull|.atsumori|.stretch|.stretch-v|.conga|.rainbow|.ascension|.shake|.party|.attract){0,5}:){3}.*/) != -1){
                r += "かやま！";
            }
            res.send(r);
        }
    })

    //``@BOT_kinano STAMPhears[i]``(監視対象チャンネルではメンション不要)を受け取るとSTAMPsends[i]のスタンプを押す
    for(let i = 0; i < STAMPhears.length; i++){
        robot.hear(STAMPhears[i], res => {
            const botflag = res.message.message.user.bot;
            if(!botflag){
                res.send(
                    {
                        type: "stamp",
                        name: STAMPsends[i]
                    }
                );
            }
        });
    }

    //``@BOT_kinano .*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*``(監視対象チャンネルではメンション不要)を受け取るとランダム返信
    robot.hear(/^.*(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi).*/, res => {
        const botflag = res.message.message.user.bot;
        if(!botflag){
            let i = Math.random();
            setTimeout(() => {
                if(i > 0.9) res.send("えへへ")
                else if(i > 0.8) res.send("寝るな！")
                else res.send(
                    {
                        type: "stamp",
                        name: "oyasumi"
                    }
                );
            }, 500);
        }
    });

        //監視対象チャンネルで"おいすー"を受け取ったら"お""い""す""ー"スタンプをランダム順で返す
    robot.hear(/^.*([おぉオォｵｫ]|(:oisu\-1.*:))([いぃイィｲｨｨ]|(:oisu\-2.*:))([すスｽ]|(:oisu\-3.*:)).*/i, res => {
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

    //メッセージの時間を返す
    robot.hear(/^\/.*/, res => {
        const MessageID = res.message.message.id;
        const time = res.message.message.createdAt;
        const time2 = time.slice(0,-1);
        const JPNhour = (Number(time2.substr(11,2)) + 9) % 24; //日本時間に変換
        const JPNhourStr = ("0" + JPNhour).slice(-2);
        const JPNtime = time2.replace(/T../, " " + JPNhourStr);
        res.send(JPNtime + "\n https://q.trap.jp/messages/" + MessageID );
    })

};