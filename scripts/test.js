module.exports = robot => {
    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

    robot.catchAll(res => {
        const { type, messageId, stamps } = res.message;
        if(type == "BotMessageStampsUpdated"){
            res.send(messageId);
            res.send(stamps);
        }
    })
}
