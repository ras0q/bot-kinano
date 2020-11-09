module.exports = robot => {
    robot.catchAll(res => {
        const { type, messageId, stamps } = res.message;
        if(type == "BotMessageStampsUpdated"){
            robot.send({userID: "0fa5d740-0841-4b88-b7c8-34a68774c784"},JSON.stringify(stamps));
            if(stamps[0].stampId == "4a7315c0-c8d8-4a65-b6f4-5866a29bd113") {
                robot.send({channelID: "2a5616d5-5d69-4716-8377-1e1fb33278fe"}, "よくないけどね")
            }
        }
    })
}
