// BotMessageStampsUpdated
module.exports = robot => {
    robot.catchAll(res => {
        const { type } = res.message;
        if(type == "BotMessageStampsUpdated"){
            robot.send({userID: "0fa5d740-0841-4b88-b7c8-34a68774c784"},JSON.stringify(res.message));
        }
    })
}
// Math.random()