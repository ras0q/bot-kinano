const cron = require("node-cron");

//start以上end未満の乱数を返す
const getRandom　= (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start;
}

module.exports = robot => {
  //毎日8時,13時,17時にtraPの記事を#gps/times/Ras/Bot/gtRに投げる
  const gtRID = "f58c72a4-14f0-423c-9259-dbb4a90ca35f";
  const recent = 1134; //最新回
  //#gps/times/Ras(8,13,17)
  cron.schedule('0 0 4,8,23 * * *', () => {
    robot.send({channelID: gtRID}, `https://trap.jp/post/${getRandom(0,recent+1)}/`)
  });
  //#gps/times/Z(8)
  cron.schedule('0 0 23 * * *', () => {
    robot.send({channelID: "2937b540-2991-44ce-91dd-504dd29f01e7"}, `https://trap.jp/post/${getRandom(0,recent+1)}/`)
  });
  //#gps/times/Kamijo(8)
  cron.schedule('0 0 12,23 * * *', () => {
    robot.send({channelID: "2fab81dd-a750-4699-a9c5-3fc13ab9bcee"}, `https://trap.jp/post/${getRandom(0,recent+1)}/`)
  });
  //#gps/times/d_etteiu8383(5)
  cron.schedule('0 0 20 * * *', () => {
    robot.send({channelID: "9f452f69-2bc2-40ee-a165-7e7ca251116d"}, `https://trap.jp/post/${getRandom(0,recent+1)}/`)
  });
}