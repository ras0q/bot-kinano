const api = require("../src/api");

module.exports = robot => {

//監視対象に追加
    robot.respond(/(いらっしゃい|join)$/i, res => {
        const MessageID = res.message.message.id;
        robot.send(
            {channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},
            "## join\n https://q.trap.jp/messages/" + MessageID
            )
        res.send(
            {
                type: "stamp",
                name: "eyes"
            }
        )
        const channelID = res.message.message.channelId;
        try {
            api.join(channelID);
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
        const MessageID = res.message.message.id;
        robot.send(
            {channelID: "37612932-7437-4d99-ba61-f8c69cb85c41"},
            "## leave\n https://q.trap.jp/messages/" + MessageID
            )
        res.send(
            {
                type: "stamp",
                name: "eyes"
            }
        )
        const channelID = res.message.message.channelId;
        try {
            api.leave(channelID);
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