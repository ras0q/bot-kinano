module.exports = robot => {
    robot.catchALL(/kinano/, res => {
        if(res.message.type = "BotMessageStampsUpdated"){
            res.send("押すな！");
        }
    })
}