const {
    getRandom,
    getMofu,
    is_mentioned,
    is_not_mentioned,
} = require("./words");

module.exports = robot => {

    const RaschannelID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f"; //#gps/times/Ras
    const R_KchannelID = "37612932-7437-4d99-ba61-f8c69cb85c41"; //Ras-BOT_kinanoのDM
    const RasuserID = "0fa5d740-0841-4b88-b7c8-34a68774c784"; //RasのuserID

    //起動時メッセージ
    robot.send(
        {channelID: RaschannelID},
        "デプロイ完了やんね～ " + getMofu()
    );

    //メンション付きメッセージ
    for(let i = 0; i < is_mentioned.length; i++){
        robot.respond(is_mentioned[i][msg], res => {
            const { bot } = res.message.message.user;
            if(!bot){
                setTimeout(() => {
                    res.reply(is_mentioned[i][ans]);
                },500);
            }
        });
    }

    //メンション無しメッセージ
    for(let i = 0; i < is_not_mentioned.length; i++){
        robot.hear(is_not_mentioned[i][msg], res => {
            const { bot } = res.message.message.user;
            if(!bot){
                setTimeout(() => {
                    res.send(is_not_mentioned[i][ans]);
                },500);
            }
        });
    }

    //``ABCやるか``を受け取るとランダムで問題を返す
    robot.hear(/^.*ABCや.*/i, res => {
        const { message } = res.message;
        const { bot, plainText } = message;
        if(!bot){
            let slashindex = plainText.indexOf("/");
            let recent = 179; //最新回
            let min = 126;
            let index = ("00" + (Math.floor(getRandom(min, recent+1)).slice(-3)));
            let diff = "";
            if(slashindex != -1 && plainText[slashindex + 1].match(/[a-f]/i)) diff = plainText[slashindex + 1];
            else diff = String.fromCodePoint(getRandom("a".codePointAt(0), "f".codePointAt(0)));
            setTimeout(() => {
                res.reply("今日の問題はこれやんね！\nhttps://atcoder.jp/contests/abc" + index + "/tasks/abc" + index + "_" + diff)
            })
        }
    })

    const oisuregexp = /(お|o|O|オ|:oisu-1(.large|.ex-large|.small|.rotate|.wiggle|.parrot|.zoom|.inversion|.turn|.turn-v|.happa|.pyon|.flashy|.pull|.atsumori|.stretch|.stretch-v|.conga|.rainbow|.ascension|.shake|.party|.attract){0,5}:){3}/g;
    robot.hear(/^.*(お|o|O|オ|:oisu-1(.large|.ex-large|.small|.rotate|.wiggle|.parrot|.zoom|.inversion|.turn|.turn-v|.happa|.pyon|.flashy|.pull|.atsumori|.stretch|.stretch-v|.conga|.rainbow|.ascension|.shake|.party|.attract){0,5}:){3}.*/, res => {
        const { bot } = res.message.message.user.bot;
        let plainText = res.message.message.plainText;
        if(!bot){
            let r = "";
            while(plainText.search(oisuregexp) != -1){
                plainText = plainText.substr(plainText.search(oisuregexp)+3)
                r += "かやま";
            }
            r += "！";
            res.send(r);
        }
    })

    //メッセージの時間を返す
    robot.hear(/^\/.*/, res => {
        const { message } = res.message;
        const { id, createdAt } = message;
        const time2 = createdAt.slice(0,-1);
        const JPNhour = (Number(time2.substr(11,2)) + 9) % 24; //日本時間に変換
        const JPNhourStr = ("0" + JPNhour).slice(-2);
        const JPNtime = time2.replace(/T../, " " + JPNhourStr);
        res.send(JPNtime + "\n https://q.trap.jp/messages/" + id );
    })

};