module.exports = robot => {
    let timerflag = false;
    robot.hear(/^start$/, res1 => {
        if(!timerflag){
            const time1 = Date.now();
            timerflag = true;
            robot.hear(/^stop$/, res2 => {
                if(timerflag){
                    const time2 = Date.now()
                    timerflag = false;
                    const time = (time2 - time1) / 1000;
                    res1.send("経過時間は" + time + "秒やんね！");
                }
                else {
                    res1.send("まだ何も測ってないやんね、身長でも測るやんね？");
                }
            })
        }
        else {
            res1.send("まだ計測中やんね！邪魔しないでほしいやんね！");
        }
    })
}