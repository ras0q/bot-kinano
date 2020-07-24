module.exports = robot => {
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
    robot.respond(/hoge$/i, res => {
        res.reply("huga");
    });

    robot.respond(/やんね！$/i, res => {
        res.reply("やんね！");
    });

    robot.respond(/もちもち$/i, res => {
        res.reply("きなこもち～～～～～！");
    });
};