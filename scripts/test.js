module.exports = robot => {
    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

    robot.catchAll(res => {
        const { type, stamps } = res.message;
        const { stampId } = stamps;
        if(type == "BotMessageStampsUpdated" && stampId == "e43a01b3-48bb-44b6-bca9-733706676641"){
            robot.send({userID: stamps[0].userId},"2人の世界へようこそ、ここでは2人きりで会話ができるやんね...")
        }
    })
}