module.exports = robot => {
    let timerflag = false;
    let time1 = 0;
    let time2 = 0;
    robot.hear(/^start$/, res1 => {
        if(!timerflag){
            time1 = Date.now();
            timerflag = true;
            res1.send(
                {
                    type: "stamp",
                    name: "on"
                }
            )
        }
        else {
            res1.send("まだ計測中やんね！邪魔しないでほしいやんね！");
        }
    })

    robot.hear(/^stop$/, res2 => {
        if(timerflag){
            time2 = Date.now()
            timerflag = false;
            const time = (time2 - time1) / 1000;
            time1 = 0;
            time2 = 0;
            res2.send("経過時間は" + time + "秒やんね！");
            res2.send(
                {
                    type: "stamp",
                    name: "kan"
                }
            )
        }
        else {
            res2.send("まだ何も測ってないやんね、身長でも測るやんね？");
        }
    })
}