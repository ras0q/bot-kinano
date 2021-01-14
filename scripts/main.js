//Description:
//  All commands will be run here.

const fileNames = [
  'channel',
  'chat',
  'format',
  'memo',
  'music',
  'post',
  'reaction',
  'test',
  'translate',
  'treands'
];
const commands = {};
fileNames.forEach(name =>
  commands[name] = require(`./command/${name}`)
);

module.exports = robot => {
  Object.values(commands).forEach(func => func(robot));
};
