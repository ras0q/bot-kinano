const cron = require("node-cron");
const {getRandom} = require("./control");

module.exports = robot => {
    const RaschannelID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f";
    const recent = 1130; //最新回
    cron.schedule('0 0 8 * * *', () => {
        robot.send({channelID: RaschannelID}, "[](https://trap.jp/post/" + getRandom(0,recent+1) + "/)")
    });
}