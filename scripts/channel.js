const api = require("../src/api");

module.exports = robot => {

//監視対象に追加
    robot.respond(/(いらっしゃい|join)$/i, res => {
        const traqID = res.message.message.user.name;
        const userID = res.message.message.user.id;
        const channelID = res.message.message.channelId;
        const time = res.message.message.createdAt;
        robot.send(
            {channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},
            "**join** request"
            + "\n user : " + '!{"type":"user","raw":"@' + traqID + '","id":"' + userID + '"}'
            + "\nchannel : " + channelID
            + "\ntime : " + time
            )
        const channelID2 = res.message.channel.Id;
        try {
            api.join(channelID2);
            setTimeout(() => {
                res.send(":oisu-1::oisu-2::oisu-3::oisu-4yoko:")
            },500);
        }
        catch(e) {
            setTimeout(() => {
                res.send("追加えらー:eyes:")
            },500);
        }
    });

    //監視対象から解除
    robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
        const traqID = res.message.message.user.name;
        const userID = res.message.message.user.id;
        const channelID = res.message.message.channelId;
        const time = res.message.message.createdAt;
        robot.send(
            {channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},
            "**leave** request"
            + "\n user : " + '!{"type":"user","raw":"@' + traqID + '","id":"' + userID + '"}'
            + "\nchannel : " + channelID
            + "\ntime : " + time
            )
            const channelID2 = res.message.channel.Id;
        try {
            api.leave(channelID2);
            setTimeout(() => {
                res.reply("ばいばいやんね～、また遊んでやんね～")
            },500);
        }
        catch(e) {
            setTimeout(() => {
                res.send("削除えらー:eyes:")
            },500);
        }
    });

}