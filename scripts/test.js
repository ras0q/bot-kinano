module.exports = robot => {
    robot.catchAll(res => {
        const { type } = res.message;
        if(type == "BotMessageStampsUpdated"){
            robot.send({channelID: "2a5616d5-5d69-4716-8377-1e1fb33278fe"},JSON.stringify(res.message));
        }
    })
}
