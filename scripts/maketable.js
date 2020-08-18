const playlistURL = require("./words").playlistURL;
const fs = require('fs'); //ファイルの読み込み、書き込み

module.exports = robot => {

    //曲追加
    robot.respond(/.*%add.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const persentIndex = plainText.indexOf("%add"); //位置指定
        const verticalIndex = plainText.indexOf("|"); //位置指定
        const newlineIndex = plainText.indexOf("\n"); //位置指定
        const musicName = plainText.slice(persentIndex + 5); //曲名切り取り
        if(verticalIndex != -1 || newlineIndex != -1){
            setTimeout(() => {
                res.send("こーぶんえらー") //"|"や改行があると表がバグるのではじく
            }, 500); //メッセージ順逆転防止
        }
        else{
            //playlist.jsonを読み込む
            fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
                if (err){
                    res.send("よみこみえらー"); //読み込み失敗時メッセージ
                }
                else {
                    obj = JSON.parse(data); //json文字列をオブジェクトに
                    obj.list.push({user: userName, music: musicName}); //実行者と曲をリストに追加
                    json = JSON.stringify(obj, undefined, 4); //オブジェクトをjson文字列に
                    //playlist.jsonに書き込む
                    fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                        if (err) {
                            res.send("かきこみえらー") //書き込み失敗時メッセージ
                        }
                        else {
                            robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト追加\n"+ addtable) //RasへのDMに通知
                            const addtable = "|追加した人|追加した曲|\n|-|-|\n" + "|" + userName + "|" + musicName + "|\n" //追加曲の表を作成
                            setTimeout(() => {
                                res.send("ぷれいりすとに追加したやんね！\n"+ addtable) //追加成功時メッセージ
                            }, 500); //メッセージ順逆転防止
                        }
                    });
                }
            })
        }
    })


    //曲削除
    robot.respond(/.*%delete.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const deleteIndex = plainText.slice(plainText.search(/[0-9]?[0-9]/)); //削除する曲のIndex
        let deletedUser; //削除する曲の追加実行者
        let deletedMusic; //削除する曲の名前
        //playlist.jsonを読み込む
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー"); //読み込み失敗時メッセージ
            }
            else {
                obj = JSON.parse(data); //json文字列をオブジェクトに
                if(obj == undefined || obj.list[deleteIndex] == undefined){
                    res.send("えらー") //Indexが存在しないときメッセージ
                }
                else {
                    deletedUser = obj.list[deleteIndex].user; //オブジェクトから追加実行者を取り出す
                    deletedMusic = obj.list[deleteIndex].music; //オブジェクトから曲名を取り出す
                    obj.list.splice(deleteIndex, 1); //オブジェクトから曲を削除
                    json = JSON.stringify(obj, undefined, 4); //オブジェクトをjson文字列に
                    //playlist.jsonに書き込む
                    fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                        if (err) {
                            res.send("かきこみえらー") //書き込み失敗時メッセージ
                        }
                        else {
                            robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト削除\n" + deleteTable) //RasへのDMに通知
                            let deleteTable = "|削除した人|追加した人|削除した曲|\n|-|-|-|\n|" + userName + "|" + deletedUser + "|" + deletedMusic + "|\n"; //削除曲の表作成
                            setTimeout(() => {
                                res.send("ぷれいりすとから 曲" + deleteIndex +" を削除したやんね！\n" + deleteTable) //削除成功時メッセージ
                            }, 500); //メッセージ順逆転防止
                        }
                    });
                }
            }}
        )
    })

    
    //曲確認
    robot.respond(/.*%watch$/i, res => {
        let table = "|番号|追加した人|曲名|\n|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|\n"; //表の項目と例
        //playlist.jsonを読み込む
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー"); //読み込み失敗時メッセージ
            }
            else {
                obj = JSON.parse(data); //json文字列をオブジェクトに
                //表作成
                for(let i = 0;i < obj.list.length; i++){
                    const user = obj.list[i].user;
                    const music = obj.list[i].music;
                    table = table + "|" + i + "|" + user + "|" + music + "|\n";
                }
                table = table + "[](" + playlistURL + ")";
                setTimeout(() => {
                    res.send("ぷれいりすとやんね～\n" + table) //表作成成功時メッセージ
                }, 500); //メッセージ順逆転防止
            }
        });
    })

}
