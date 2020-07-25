const README = require("./src/readme").README;

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

    robot.hear(/.*(おやすみ|oyasumi|osumiya|oyasuta|poyasimi).*$/i, res => {
        res.send("おやすみやんね～:zzz:");
    });
    
    robot.hear(/.*(おは|ohagoza|ohasta).*$/i, res => {
        res.send("おはようやんね～");
    });

    robot.respond(/できること$/i, res => {
        res.reply(README);
    });

};
