const README = require("../src/readme").README;

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
    robot.hear(/.*もふもふ.*$/i, res => {
        if(res.message.message.channelId == "f58c72a4-14f0-423c-9259-dbb4a90ca35f"){
            res.send("もちもち～:blobenjoy:");
        }
    });
    robot.respond(/できること$/i, res => {
        res.send(README);
    });

};
