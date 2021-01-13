const cron = require("node-cron");
import { getRandom } from "../modules/random"

module.exports = robot => {
  const logID = "82b9f8ad-17d9-4597-88f1-0375247a2487";
  const recent = 1188; //最新回
  //#gps/times/Ras(8,17)
  cron.schedule('0 0 8,23 * * *', () => {
    robot.send({channelID: logID}, `https://trap.jp/post/${getRandom(0,recent+1)}/`)
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