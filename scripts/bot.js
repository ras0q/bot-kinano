module.exports = robot => {
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
    robot.respond(/もちもち$/i, res => {
        res.reply("きなこもち～～～～！！！！！");
    });
};