const api = require("../src/traqapi");
const fs = require('fs');
const readme = fs.readFileSync("./README.md", 'utf8');

module.exports = robot => {

  const gtRB_ID = "2a5616d5-5d69-4716-8377-1e1fb33278fe"; //#gps/time/Ras/BotのID

//監視対象に追加
  robot.respond(/(いらっしゃい|join)$/i, res => {
    const { id, channelId } = res.message.message;
    robot.send(
      {channelID: gtRB_ID},
      `## join\n https://q.trap.jp/messages/${id}`
    );
    try {
      api.join(channelId);
      setTimeout(() => {
        res.reply(":oisu-1::oisu-2::oisu-3::oisu-4yoko:");
      },500);
      setTimeout(() => {
        res.send(readme);
      },1000)
    }
    catch(error) {
      robot.send(
        {channelID: gtRB_ID},
        `## join error\n${error}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

  //監視対象から解除
  robot.respond(/(ばいばい|バイバイ|bye)$/i, res => {
    const { id, channelId } = res.message.message;
    robot.send(
      {channelID: gtRB_ID},
      `## leave\n https://q.trap.jp/messages/${id}`
    )
    try {
      api.leave(channelId);
      setTimeout(() => {
        res.reply("ばいばいやんね～、また遊んでやんね～");
      },500);
    }
    catch(error) {
      robot.send(
        {channelID: gtRB_ID},
        `## leave error\n${error}\nhttps://q.trap.jp/messages/${id}`
      );
    }
  });

}