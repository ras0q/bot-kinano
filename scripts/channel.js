const api = require("../src/api");

module.exports = robot => {

    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/time/Ras/BotのID

//監視対象に追加
    robot.respond(/(いらっしゃい|join)$/i, res => {
        const MessageID = res.message.message.id;
        const channelID = res.message.message.channelId;
        robot.send(
            {channelID: gtRB_ID},
            "## join\n https://q.trap.jp/messages/" + MessageID
        )
        try {
            api.join(channelID);
            setTimeout(() => {
                res.send(":oisu-1::oisu-2::oisu-3::oisu-4yoko:")
            },500);
        }
        catch(error) {
            robot.send(
                {channelID: gtRB_ID},
                "## join error\n" + error + "\nhttps://q.trap.jp/messages/" + MessageID
            )
        }
    });

    //監視対象から解除
    robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
        const MessageID = res.message.message.id;
        robot.send(
            {channelID: gtRB_ID},
            "## leave\n https://q.trap.jp/messages/" + MessageID
        )
        const channelID = res.message.message.channelId;
        try {
            api.leave(channelID);
            setTimeout(() => {
                res.reply("ばいばいやんね～、また遊んでやんね～")
            },500);
        }
        catch(error) {
            robot.send(
                {channelID: gtRB_ID},
                "## leave error\n" + error + "\nhttps://q.trap.jp/messages/" + MessageID
            )
        }
    });

}