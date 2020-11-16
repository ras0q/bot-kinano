// BotMessageStampsUpdated
module.exports = robot => {
    robot.catchAll(res => {
        const { type, stamps, messageId } = res.message;
        const { stampName, userId } = stamps[0];
        if(type == "BotMessageStampsUpdated" && (stampName == "eenyade" || stampName == "eennyade") && Math.random() > 0.9){
            robot.send({channelID: "2a5616d5-5d69-4716-8377-1e1fb33278fe"},
                `!{"type":"user","raw":"いいわけないだろ！！！","id":"${userId}"}\nhttps://q.trap.jp/messages/${messageId}`
            );
        }
    })
}
