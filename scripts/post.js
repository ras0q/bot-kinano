const cron = require("node-cron");
const { getRandom } = require("./control");

module.exports = robot => {

    //毎朝traPの記事を#gps/times/Rasに投げる
    const RaschannelID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f";
    const recent = 1130; //最新回
    cron.schedule('0 * * * * *', () => {
        // robot.send({channelID: RaschannelID}, "[](https://trap.jp/post/" + toString(getRandom(0,recent+1)) + "/)")
        robot.send({channelID: RaschannelID}, getRandom(0,recent+1));
        robot.send({channelID: RaschannelID}, "This is a test" + getRandom(0,recent+1));
    });
}