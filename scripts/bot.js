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
    robot.respond(/きなこもち$/i, res => {
        res.send(":kinako.ex-large:");
    });
    robot.respond(/できること$/i, res => {
        res.send(":gao-:コマンド:gao-:\n
        - ``@BOT_kinano やんね！``で``@username やんね！``をかえすやんね！:yannne:やんねは正義やんね！:yannne:\n
        - ``@BOT_kinano もちもち``で``@username きなこもち～～～～～！``をかえすやんね！:yannne:おもちをたべるやんね！:yannne:\n
        - ``@BOT_kinano きなこもち``でスタンプをかえすやんね！:yannne:~~黄名子~~きなのは可愛いやんね！:yannne:");
    });

};
