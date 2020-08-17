let fs = require("fs");
let playlist = require("./playlist").playlist;
let playlistURL = require("./playlist").playlistURL;


module.exports = robot => {

    //曲追加
    robot.respond(/.*%add.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const persentIndex = plainText.indexOf("%add");
        const verticalIndex = plainText.indexOf("|");
        const newlineIndex = plainText.indexOf("\n")
        if(verticalIndex != -1 || newlineIndex != -1){
            setTimeout(() => {
                res.send("えらー")
            }, 500);
        }
        else{
            const musicName = plainText.slice(persentIndex + 5);
            const headline = "|追加した人|追加した曲|\n|-|-|\n"
            const addtolist = "|" + userName + "|" + musicName + "|";
            playlist.push(addtolist);
            setTimeout(() => {
                res.send("ぷれいりすとに追加したやんね！\n"+ headline + addtolist)
                robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト追加\n" + headline + addtolist)
            }, 500);
        }
    })

    //曲削除
    robot.respond(/.*%delete.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        if(plainText == "error"){
            setTimeout(() => {
                res.send("えらー")
            }, 500);
        }
        else{
            const gotNumber = plainText.slice(plainText.search(/[0-9]?[0-9]/));
            let deleteTable = "|削除した人|追加した人|削除した曲|\n|-|-|-|\n|" + userName + playlist[gotNumber];
            playlist.splice(gotNumber,1);
            if(deleteTable == undefined){
                setTimeout(() => {
                    res.send("えらー")
                }, 500);
            }
            else{
                setTimeout(() => {
                    res.send("ぷれいりすとから 曲" + gotNumber +" を削除したやんね！\n" + deleteTable)
                    robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト削除\n" + deleteTable)
                }, 500);
            }
        }
    })

    //曲確認
    robot.respond(/.*%watch$/i, res => {
        let table = "|番号|追加した人|曲名|\n|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|\n";
        for(let i = 0;i < playlist.length; i++){
            table = table + "|" + i + playlist[i] + "\n";
        }
        table = table + "[](" + playlistURL + ")";
        setTimeout(() => {
            res.send("ぷれいりすとやんね～\n" + table)
        }, 500);
    })


    robot.respond(/test/, res => {
        let text = plainText;
        try {
            fs.writeFileSync("playlist.js", text);
            res.send("end")
        }catch(e){
            res.send("error")
        }
    })
}