// module.exports = robot => {
//     const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/times/Ras/Bot

//     robot.catchAll(res => {
//         const { type, stamps, messageId } = res.message;
//         const { stampId } = stamps[0];
//         if(type == "BotMessageStampsUpdated"){
//             robot.send({channelID: gtRB_ID},`**${stampId}** was pushed or deleted\nhttps://q.trap.jp/messages/${messageId}`)
//         }
//     })
// }