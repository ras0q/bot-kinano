const { User } = require("hubot");

let playlist =[];

module.exports = robot => {
    robot.respond(/.*%add.*/i, res => {
        const userName = res.message.message.user.name;
        const plainText = res.message.message.plainText;
        if(playlst == "error"){
            setTimeout(() => {
                res.send("えらー")
            }, 500);
        }
        else{
            const persentIndex = plainText.indexOf("%");
            let musicname = plainText.slice(persentIndex + 4, plainText.end());
            let headline = "| 追加した人 | 曲名 |"
            let addtolist = "|" + userName + "|" + musicname + "|\n";
            playlist.push(addtolist);
            setTimeout(() => {
                res.send("ぷれいりすとに追加したやんね！\n"+ headline + "\n"+ addtolist)
            }, 500);
        }
    })

    robot.respond(/.*%delete.*/i, res => {
        const plainText = res.message.message.plainText;
        if(playlist == "error"){
            setTimeout(() => {
                res.send("えらー")
            }, 500);
        }
        else{
            const persentIndex = plainText.indexOf("%");
            const deletefromlist =plainText.slice(persentIndex + 7, plainText.end());
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