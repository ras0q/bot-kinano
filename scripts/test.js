// BotMessageStampsUpdated
module.exports = robot => {
    robot.catchAll(res => {
        // const { type, stamps, messageId } = res.message;
        // const { stampName, userId } = stamps[0];
        const type = "BotMessageStampsUpdated",stampName = "eenyade", userId = "0fa5d740-0841-4b88-b7c8-34a68774c784", messageId = "hge";
        const i = Math.random();
        console.log(i);
        if(type == "BotMessageStampsUpdated" && (stampName == "eenyade" || stampName == "eennyade") && i > 0.8){
            robot.send({userID: "0fa5d740-0841-4b88-b7c8-34a68774c784"},
                `!{"type":"user","raw":"いいわけないだろ！！！","id":"${userId}"}\nhttps://q.trap.jp/messages/${messageId}`
            );
        }
    })
}
