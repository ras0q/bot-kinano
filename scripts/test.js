// BotMessageStampsUpdated
module.exports = robot => {
    robot.catchAll(res => {
        const { type, stamps, messageId } = res.message;
        const { stampName, userId } = stamps[0];
        if(type == "BotMessageStampsUpdated" && (stampName == "eenyade" || stampName == "eennyade") && Math.random() > 0.9){
            robot.send({channelID: "82b9f8ad-17d9-4597-88f1-0375247a2487"},
                `!{"type":"user","raw":"いいわけないだろ！！！","id":"${userId}"}\nhttps://q.trap.jp/messages/${messageId}`
            );
        }
    })
}
