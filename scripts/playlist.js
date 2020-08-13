const { User } = require("hubot");

let playlist =[];

module.exports = robot => {
    robot.respond(/.*%add.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        if(plainText == "error"){
            setTimeout(() => {
                res.send("えらー")
            }, 500);
        }
        else{
            const persentIndex = plainText.indexOf("%add");
            let musicname = plainText.slice(persentIndex + 4);
            let headline = "| 追加した人 | 曲名 |\n|-|-|\n"
            let addtolist = "|" + userName + "|" + musicname + "|\n";
            playlist.push(addtolist);
            setTimeout(() => {
                res.send("ぷれいりすとに追加したやんね！\n"+ headline + addtolist)
            }, 500);
        }
    })

    robot.respond(/.*%delete.*/i, res => {
        const plainText = res.message.message.plainText;
        if(plainText == "error"){
            setTimeout(() => {
                res.send("えらー")
            }, 500);
        }
        else{
            const persentIndex = plainText.indexOf("%delete");
            const deletefromlist = plainText.slice(persentIndex + 7);
            setTimeout(() => {
                res.send("ぷれいりすとから" + playlist[deletefromlist] + "を削除したやんね！")
                }, 500);
            playlist = playlist.splice(deletefromlist,1);
        }
    })

    robot.respond(/.*%watch.*/i, res => {
        let table = "| 追加した人 | 曲名 |\n|-|-|\n";
        for(let i = 0;i < playlist.length; i++){
            table = table + "|" + i + "|" + playlist[i];
        }
        setTimeout(() => {
            res.send("ぷれいりすとやんね～\n" + table)
        }, 500);
    })
}