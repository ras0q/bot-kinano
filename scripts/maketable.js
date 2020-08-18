const playlistURL = require("./words").playlistURL;
const fs = require('fs'); //ファイルの読み込み、書き込み

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
                res.send("こーぶんえらー")
            }, 500);
        }
        else{
            //jsonに追記
            fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
                if (err){
                    res.send("よみこみえらー");
                }
                else {
                    obj = JSON.parse(data);
                    obj.list.push({user: userName, music: musicName});
                    json = JSON.stringify(obj, null, 4);
                    fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                        if (err) {
                            res.send("かきこみえらー")
                        }
                        else {
                            robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト追加\n"+ addtable)
                        }
                    });
                    const musicName = plainText.slice(persentIndex + 5);
                    const addtable = "|追加した人|追加した曲|\n|-|-|\n" + "|" + userName + "|" + musicName + "|\n"
                    setTimeout(() => {
                        res.send("ぷれいりすとに追加したやんね！\n"+ addtable)
                    }, 500);
                }
            })
        }
    })

    //曲削除
    robot.respond(/.*%delete.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const deleteIndex = plainText.slice(plainText.search(/[0-9]?[0-9]/));
        let deletedUser;
        let deletedMusic;

        //jsonから削除
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー");
            }
            else {
                obj = JSON.parse(data);
                deletedUser = obj.list[deleteIndex].user;
                deletedMusic = obj.list[deleteIndex].music;
                delete obj.playlist[deleteIndex];
                json = JSON.stringify(obj, null, 4);
                fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                    if (err) {
                        res.send("かきこみえらー")
                    }
                    else {
                        robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト削除\n" + deleteTable)
                    }
                });
                let deleteTable = "|削除した人|追加した人|削除した曲|\n|-|-|-|\n|" + userName + "|" + deletedUser + "|" + deletedMusic + "|\n";
                setTimeout(() => {
                    res.send("ぷれいりすとから 曲" + deleteIndex +" を削除したやんね！\n" + deleteTable)
                }, 500);
            }}
        )
    })

    //曲確認
    robot.respond(/.*%watch$/i, res => {
        let table = "|番号|追加した人|曲名|\n|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|\n";

        //jsonからデータ取り出し
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー");
            }
            else {
                obj = JSON.parse(data);
                for(let i = 0;i < playlist.length; i++){
                    const user = obj.list[i].user;
                    const music = obj.list[i].music;
                    table = table + "|" + i + "|" + user + "|" + music + "|\n";
                }
                table = table + "[](" + playlistURL + ")";
                setTimeout(() => {
                    res.send("ぷれいりすとやんね～\n" + table)
                }, 500);
            }
        });
    })

}
