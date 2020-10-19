module.exports = robot => {
    const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

    robot.catchAll(res => {
        const { type, stamps } = res.message;
        if(type == "BotMessageStampsUpdated"){
            robot.send({userID: stamps[0].userId},stamps[0].stampId)
        }
    })
}