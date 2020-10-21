const cron = require("node-cron");

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start;
}

module.exports = robot => {
  //毎日8時,13時,17時にtraPの記事を#gps/times/Ras/Bot/logに投げる
  const logID = "82b9f8ad-17d9-4597-88f1-0375247a2487";
  const recent = 1134; //最新回
  cron.schedule('0 0 4,8,23 * * *', () => {
    robot.send({channelID: logID}, `https://trap.jp/post/${getRandom(0,recent+1)}/`)
  });
}