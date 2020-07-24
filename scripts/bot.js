module.exports = robot => {
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
    robot.respond(/hoge$/i, res => {
        res.reply("huga");
    });
};

module.exports = yanne => {
    yanne.respond(/やんね！$/i, res => {
        res.reply("やんね！");
    });
};

module.exports = mochi => {
    mochi.respond(/もちもち$/i, res => {
        res.reply("きなこもち～～～～～！");
    });
};