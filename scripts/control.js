const {
    natterus,
    sleeps,
    is_mentioned,
    is_not_mentioned,
} = require("./words");

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
    return Math.floor(Math.random() * (end - start)) + start;
}

//もふもふ
const getMofu = () => {
    let r = "";
    for(let i = 0; i < 2; i++){
        const generated = String.fromCodePoint(getRandom("ぁ".codePointAt(0), "ん".codePointAt(0)+1));
        r += generated;
    }
    return r + r;
}


module.exports = robot => {

    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot


    //起動時メッセージ
    robot.send(
        {channelID: gtRB_ID},
        "デプロイ完了 " + getMofu()
    );

    //メンション付きメッセージ
    for(let i = 0; i < is_mentioned.length; i++){
        const { msg, ans } = is_mentioned[i];
        robot.respond(msg, res => {
            const { bot } = res.message.message.user;
            if(!bot){
                setTimeout(() => {
                    res.reply(ans);
                },500);
            }
        });
    }

    //メンション無しメッセージ
    for(let i = 0; i < is_not_mentioned.length; i++){
        const { msg, ans } = is_not_mentioned[i];
        robot.hear(msg, res => {
            const { bot } = res.message.message.user;
            if(!bot){
                setTimeout(() => {
                    res.send(ans);
                },500);
            }
        });
    }

    //``ABCやるか``を受け取るとランダムで問題を返す
    robot.hear(/ABCや/i, res => {
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

    //大岡山
    const oisuregexp = /(お|o|O|オ|:oisu-1(.large|.ex-large|.small|.rotate|.wiggle|.parrot|.zoom|.inversion|.turn|.turn-v|.happa|.pyon|.flashy|.pull|.atsumori|.stretch|.stretch-v|.conga|.rainbow|.ascension|.shake|.party|.attract){0,5}:){3}/;
    robot.hear(oisuregexp, res => {
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

    //もふもふ
    robot.hear(/もふもふ/, res => {
        const { bot } = res.message.message.user;
        if(!bot){
            setTimeout(() => {
                res.send(getMofu());
            },500);
        }
        res.send(getMofu());
    })

    //なってる
    robot.hear(/なってる/, res => {
        const { bot } = res.message.message.user;
        if(!bot){
            setTimeout(() => {
                res.reply(natterus[getRandom(0, natterus.length)]);
            },500);
        }
    })

    //おやすみ
    robot.hear(/(寝|おやすみ|oyasumi|osumiya|oyasta|poyasimi)/, res => {
        const { bot } = res.message.message.user;
        if(!bot){
            setTimeout(() => {
                res.send(sleeps[getRandom(0, sleeps.length)]);
            },500);
        }
    })

    //メッセージの時間を返す
    robot.hear(/^\/.*/, res => {
        const { message } = res.message;
        const { id, createdAt, user } = message;
        const { bot } = user;
        if(!bot){
            const time2 = createdAt.slice(0,-1);
            const JPNhour = (Number(time2.substr(11,2)) + 9) % 24; //日本時間に変換
            const JPNhourStr = ("0" + JPNhour).slice(-2);
            const JPNtime = time2.replace(/T../, " " + JPNhourStr);
            res.send(JPNtime + "\n https://q.trap.jp/messages/" + id );
        }
    })

};