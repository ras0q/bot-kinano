// const README = require("../src/readme").README;

module.exports = robot => {
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
        res.send(":kinako.ex-large:");
    });


    robot.hear(/.*もふもふ.*$/i, res => {
        const ID = res.message.message.channelId;
        if(ID == "f58c72a4-14f0-423c-9259-dbb4a90ca35f"||ID == "159b8151-3f51-4c2d-857c-032aa4cc78e5"){
            res.send("もちもち～:blobenjoy:");
        }
    });

    robot.hear(/.*おやすみ.*$/i, res => {
        const ID = res.message.message.channelId;
        if(ID == "f58c72a4-14f0-423c-9259-dbb4a90ca35f"||ID == "159b8151-3f51-4c2d-857c-032aa4cc78e5"){
            res.send("おやすみやんね～:zzz:");
        }
    });

    // robot.respond(/できること$/i, res => {
    //     res.send(README);
    // });

};
