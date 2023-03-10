//Description:
//  All commands will be run here.

import { Robots } from './src/types'

const fileNames = [
  '_startup',
  'channel',
  'chat',
  'hideandseek',
  'reaction',
  'translate',
  'wip'
]
// eslint-disable-next-line no-unused-vars
const commands: { [key: string]: (robot: Robots) => void } = {}
fileNames.forEach((name) => (commands[name] = require(`./command/${name}`)))

module.exports = (robot: Robots) => {
  Object.values(commands).forEach((func) => func(robot))
}
