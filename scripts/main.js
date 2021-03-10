//Description:
//  All commands will be run here.

const fileNames = [
  'startup',
  'channel',
  'chat',
  'format',
  'ical',
  'memo',
  'music',
  'reaction',
  'test',
  'translate',
  'trends'
];
const commands = {};
fileNames.forEach(name =>
  commands[name] = require(`./command/${name}`)
);

module.exports = robot => {
  Object.values(commands).forEach(func => func(robot));
};
