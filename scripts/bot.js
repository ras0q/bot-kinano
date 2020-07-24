module.exports = robot => {
    robot.hear(/.+/, res => {
        const { message } = res.message;
        const { user, plainText } = message;
        // if (user.bot && user.name.slice(0, 3) == "BOT") return;
    });
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
    robot.respond(/.*hoge.*$/i, res => {
        res.reply("huga");
    });

    robot.respond(/.*やんね！.*$/i, res => {
        res.reply("やんね！");
    });

    robot.respond(/.*もちもち.*$/i, res => {
        res.reply("きなこもち～～～～～！");
    });
    robot.respond(/.*きなこもち.*$/i, res => {
        res.reply(":kinako.ex-large:");
    });
    robot.respond(/.*できること.*$/i, res => {
        res.reply(":null:");
    });

};
