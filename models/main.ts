//Description:
//  All commands will be run here.

import path from 'path'
import { Robots } from './src/types'
import { readdirRecursively } from './utils/readdir'

const fileNames = readdirRecursively(path.join(__dirname, './command'))

// eslint-disable-next-line no-unused-vars
const commands: { [key: string]: (robot: Robots) => void } = {}
fileNames.forEach((name) => (commands[name] = require(name)))

module.exports = (robot: Robots) => {
  Object.values(commands).forEach((func) => func(robot))
}
