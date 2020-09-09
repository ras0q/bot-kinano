const weather = [
    "今日は晴れやんね！ぴかぴか～",
    "今日は雨やんね！ざーざー",
    "今日は雷やんね！ぴっしゃ～ん！！",
    "今日は雪やんね！さらさら～",
    "今日は飴やんね！がはは！"
]

module.exports = robot => {
    robot.hear(/.*天気教えて.*$/i, res => {
        const botflag = res.message.message.user.bot;
        if(!botflag)
            setTimeout(() => {
                let i = Math.floor(Math.random() * weather.length());
                res.send(weather[i]);
            },500);
    });
}