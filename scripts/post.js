const cron = require("node-cron");

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
    return Math.floor(Math.random() * (end - start)) + start;
}

module.exports = robot => {

    //毎朝traPの記事を#gps/times/Rasに投げる
    const RaschannelID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f";
    const recent = 1130; //最新回
    cron.schedule('0 0 8 * * *', () => {
        robot.send({channelID: RaschannelID}, "[](https://trap.jp/post/" + getRandom(0,recent+1) + "/)")
    });
}