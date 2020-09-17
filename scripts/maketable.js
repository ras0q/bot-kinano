const playlistURL = require("./words").playlistURL;
const fs = require('fs'); //ファイルの読み込み、書き込み

module.exports = robot => {

    const RaschannelID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f"; //#gps/times/Ras
    const R_KchannelID = "37612932-7437-4d99-ba61-f8c69cb85c41"; //Ras-BOT_kinanoのDM
    const RasuserID = "0fa5d740-0841-4b88-b7c8-34a68774c784"; //RasのuserID

    //playlist.json確認
    robot.hear(/json watch/, res => {
        const channelID = res.message.message.channelId;
        const userID = res.message.message.user.id;
        if(channelID == R_KchannelID && userID == RasuserID){
            fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
                if(err){
                    res.send("よみこみえらー:eyes:"); //読み込み失敗時メッセージ
                }
                else {
                    res.send(data);
                }
            })
        }
    })

    robot.hear(/json update.*/, res => {
        const channelID = res.message.message.channelId;
        const userID = res.message.message.user.id;
        if(channelID == R_KchannelID && userID == RasuserID){
            const plainText = res.message.message.plainText;
            const index = plainText.indexOf("{")
            const json = plainText.slice(index);
            fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                if (err) {
                    res.send("かきこみえらー:eyes:") //書き込み失敗時メッセージ
                }
                else {
                    setTimeout(() => {
                        res.send("書き込み成功")
                    }, 500);
                }
            });
        }
    })

    //曲追加
    robot.respond(/\/add.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const kagikakko = plainText.indexOf("["); //URLがあれば読み取る
        const kakko = plainText.indexOf("](");
        const kakkotoji = plainText.indexOf(")");
        const URL = "";
        const musicIndex = plainText.indexOf("/add"); //位置指定
        const musicName = "";
        if(kakko != -1 && kakkotoji != -1 && kagikakko != -1){
            musicName = plainText.slice(kagikakko + 1, kakko); //曲名切り取り
            URL = plainText.slice(kakko + 2, kakkotoji);
        }
        else {
            musicName = plainText.slice(musicIndex + 5); //曲名切り取り
        }
        const verticalIndex = plainText.indexOf("|"); //位置指定(!=-1のときエラー)
        const newlineIndex = plainText.indexOf("\n"); //位置指定(!=-1のときエラー)
        if(verticalIndex != -1 || newlineIndex != -1 || musicName == ""){
            setTimeout(() => {
                res.send("こーぶんえらー:eyes:") //"|"や改行があると表がバグるのではじく
            }, 500); //メッセージ順逆転防止
        }
        else{
            //playlist.jsonを読み込む
            fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
                if (err){
                    res.send("よみこみえらー:eyes:"); //読み込み失敗時メッセージ
                }
                else {
                    let obj = JSON.parse(data); //json文字列をオブジェクトに
                    obj.list.push({user: userName, music: musicName, url: URL}); //実行者と曲をリストに追加
                    let json = JSON.stringify(obj, undefined, 4); //オブジェクトをjson文字列に
                    //playlist.jsonに書き込む
                    fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                        if (err) {
                            res.send("かきこみえらー:eyes:") //書き込み失敗時メッセージ
                        }
                        else {
                            const addtable = "|追加した人|追加した曲|\n|-|-|\n" + "|" + userName + "|" + musicName + "|\n" //追加曲の表を作成
                            robot.send({channelID: R_KchannelID},"プレイリスト追加\n"+ addtable) //RasへのDMに通知
                            robot.send({channelID: R_KchannelID},json)
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
    robot.respond(/\/remove.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        const removeIndex = plainText.slice(plainText.search(/[0-9]?[0-9]/)); //削除する曲のIndex
        let removedUser; //削除する曲の追加実行者
        let removedMusic; //削除する曲の名前
        //playlist.jsonを読み込む
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー:eyes:"); //読み込み失敗時メッセージ
            }
            else {
                let obj = JSON.parse(data); //json文字列をオブジェクトに
                if(obj == undefined || obj.list[removeIndex] == ""){
                    res.send("えらー:eyes:") //Indexが存在しないときメッセージ
                }
                else {
                    removedUser = obj.list[removeIndex].user; //オブジェクトから追加実行者を取り出す
                    removedMusic = obj.list[removeIndex].music; //オブジェクトから曲名を取り出す
                    obj.list.splice(removeIndex, 1); //オブジェクトから曲を削除
                    let json = JSON.stringify(obj, undefined, 4); //オブジェクトをjson文字列に
                    //playlist.jsonに書き込む
                    fs.writeFile('./scripts/playlist.json', json, 'utf8', (err) => {
                        if (err) {
                            res.send("かきこみえらー:eyes:") //書き込み失敗時メッセージ
                        }
                        else {
                            const removeTable = "|削除した人|追加した人|削除した曲|\n|-|-|-|\n|" + userName + "|" + removedUser + "|" + removedMusic + "|\n"; //削除曲の表作成
                            robot.send({channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},"プレイリスト削除\n" + removeTable) //RasへのDMに通知
                            robot.send({channelID: R_KchannelID},json)
                            setTimeout(() => {
                                res.send("ぷれいりすとから 曲" + removeIndex +" を削除したやんね！\n" + removeTable) //削除成功時メッセージ
                            }, 500); //メッセージ順逆転防止
                        }
                    });
                }
            }}
        )
    })


    //曲確認
    robot.respond(/.*\/watch$/i, res => {
        let table = "|番号|追加した人|曲名|\n|-|-|-|\n|例|BOT_kinano|きなこもちもちのうた|\n"; //表の項目と例
        //playlist.jsonを読み込む
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー:eyes:"); //読み込み失敗時メッセージ
            }
            else {
                obj = JSON.parse(data); //json文字列をオブジェクトに
                //表作成
                for(let i = 0;i < obj.list.length; i++){
                    const user = obj.list[i].user;
                    const music = obj.list[i].music;
                    table = table + "|" + i + "|" + user + "|" + music + "|\n";
                }
                setTimeout(() => {
                    res.send("ぷれいりすとやんね～\n" + table) //表作成成功時メッセージ
                }, 500); //メッセージ順逆転防止
            }
        });
    })

    //URL確認
    robot.respond(/.*\/url$/i, res => {
        const plainText = res.message.message.plainText;
        const urlIndex = plainText.slice(plainText.search(/[0-9]?[0-9]/)); //確認する曲のIndex
        //playlist.jsonを読み込む
        fs.readFile('./scripts/playlist.json', 'utf8', (err, data) => {
            if (err){
                res.send("よみこみえらー:eyes:"); //読み込み失敗時メッセージ
            }
            else {
                obj = JSON.parse(data); //json文字列をオブジェクトに
                const URL = obj.list[urlIndex];
                if(obj == undefined || obj.list[urlIndex].url == ""){
                    res.send("えらー:eyes:") //Indexが存在しないときメッセージ
                }
                else {
                    res.send(obj.list[urlIndex].music + "のURLは\n\n" + obj.list[urlIndex].url + "\n\nやんね！")
                }
            }
        });
    })

}
