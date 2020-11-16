const request = require("request");

// BotMessageStampsUpdated
module.exports = robot => {
    robot.catchAll(res => {
        const { type, stamps, messageId } = res.message;
        const { stampName, userId } = stamps[0];
        if(type == "BotMessageStampsUpdated" && (stampName == "eenyade" || stampName == "eennyade") && Math.random > 0.8){
            request.get({uri: `https://q.trap.jp/api/v3/users/${userId}`}, (err, res2, body) => {
                robot.send({userID: "0fa5d740-0841-4b88-b7c8-34a68774c784"},
                    `@${body.displayName} いいわけないだろ!\nhttps://q.trap.jp/messages/${messageId}`
                );
            })
        }
    })
}
// Math.random()