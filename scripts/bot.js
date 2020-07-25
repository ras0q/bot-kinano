// const README = require("../src/readme").README;

module.exports = robot => {
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
    robot.respond(/.*hoge.*$/i, res => {
        res.reply("huga");
    });

    robot.respond(/.*やんね.*$/i, res => {
        res.reply("やんね！");
    });

    robot.respond(/.*もちもち.*$/i, res => {
        res.reply("きなこもち～～～～～！");
    });

    robot.respond(/.*きなこ.*$/i, res => {
        res.send(":kinako.ex-large:");
    });


    robot.hear(/.*もふもふ.*$/i, res => {
        res.send("もちもち～:blobenjoy:");
    });

    robot.hear(/.*やんね.*$/i, res => {
        res.send(
            {
                type: "stamp",
                name: "yannne"
            }
        );
    });

    robot.hear(/.*(おやすみ|oyasumi|osumiya|oyasuta|poyasimi).*$/i, res => {
        res.send("おやすみやんね～:zzz:");
    });
    
    robot.hear(/.*(おは|ohagoza|ohasta).*$/i, res => {
        res.send("おはようやんね～");
    });

    robot.respond(/できること$/i, res => {
        res.reply("[](https://wiki.trap.jp/bot/kinano)");
    });

    // robot.respond(/できること$/i, res => {
    //     const commands = [
    //         `
    //         # できること:gao-:

    //         きなのはなんでもできるやんね！
    //             - ``@BOT_kinano やんね`` : ``@username やんね！`` をかえすやんね！やんねは正義やんね！:yannne:
    //             - ``@BOT_kinano もちもち`` : ``@username きなこもち～～～～～！`` をかえすやんね！おもちをたべるやんね！:yannne:
    //             - ``@BOT_kinano きなこもち`` : スタンプをかえすやんね！きなのは可愛いやんね！:yannne:"

                
    //             きなのはカンペキだけど不具合・要望があったら[#gps/times/Ras](https://q.trap.jp/channels/gps/times/Ras)でお願いやんね！:yannne:
    //             最終更新日:2020/07/25

    //         `
    //     ]

    //     res.reply(...commands);
    // });
};
