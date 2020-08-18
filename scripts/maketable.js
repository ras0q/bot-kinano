let playlist = require("./playlist.json");
const playlistURL = require("./words").playlistURL;
const fs = require('fs');


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
            const addtable = "|追加した人|追加した曲|\n|-|-|\n" + "|" + userName + "|" + musicName + "|\n"
            setTimeout(() => {
                res.send("ぷれいりすとに追加したやんね！\n"+ addtable)
                robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト追加\n"+ addtable)
            }, 500);

            //jsonに追記
            fs.readFile('playlist.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    obj.list.Push({user: userName, music:musicName});
                    json = JSON.stringify(obj);
                    fs.writeFile('playlist.json', json, 'utf8', callback);
            }});
        };
    })

    //曲削除
    robot.respond(/.*%delete.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const deleteIndex = plainText.slice(plainText.search(/[0-9]?/));
        let deletedUser;
        let deletedMusic;

        //jsonから削除
        fs.readFile('playlist.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data);
                deletedUser = obj.list[deleteIndex].user;
                deletedMusic = obj.list[deleteIndex].music;
                delete obj.playlist[deleteIndex];
                json = JSON.stringify(obj);
                fs.writeFile('playlist.json', json, 'utf8', callback);
        }});

        let deleteTable = "|削除した人|追加した人|削除した曲|\n|-|-|-|\n|" + userName + "|" + deletedUser + "|" + deletedMusic + "|\n";
        setTimeout(() => {
            res.send("ぷれいりすとから 曲" + deleteIndex +" を削除したやんね！\n" + deleteTable)
            robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト削除\n" + deleteTable)
        }, 500);

    })

    //曲確認
    robot.respond(/.*%watch$/i, res => {
        let table = "|番号|追加した人|曲名|\n|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|\n";

        fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data);
            for(let i = 0;i < playlist.length; i++){
                const user = obj.list[i].user;
                const music = obj.list[i].music;
                table = table + "|" + i + "|" + user + "|" + music + "|\n";
            }
            table = table + "[](" + playlistURL + ")";
        }});

        setTimeout(() => {
            res.send("ぷれいりすとやんね～\n" + table)
        }, 500);
    })

}
