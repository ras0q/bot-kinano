module.exports = robot => {
    // "@botName hoge"を受け取ったら"@senderName fuga"を送り返す
    robot.respond(/hoge$/i, res => {
        res.reply("huga");
    });
};
robot.respond(/もちもち$/i, reply => {
    let https = require('https');
    const URL = 'https://gentle-beach-41247.herokuapp.com/fukuokadam';
    https.get(URL, (res) => {
        res.on('data', (d) => {
            console.log(d);
            reply.reply((new TextDecoder).decode(d));
    });
    }).on('error', (e) => {
    reply.reply(e);
});
});