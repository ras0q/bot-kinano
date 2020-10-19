module.exports = robot => {
    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

    robot.catchAll(res => {
        if(res.message.type == "BotMessageStampsUpdated" && res.message.stamps.userId == "0fa5d740-0841-4b88-b7c8-34a68774c784"){
            res.send("押すな！");
        }
    })
}