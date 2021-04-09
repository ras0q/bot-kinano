//Description:
//  All commands will be run here.

const fileNames = [
  '_startup',
  'channel',
  'chat',
  'memo',
  'music',
  'reaction',
  'test',
  'translate',
];
const commands: { [key:string]: any } = {};
fileNames.forEach(name =>
  commands[name] = require(`./command/${name}`)
);

module.exports = (robot: any) =>{
  Object.values(commands).forEach(func => func(robot));
};
