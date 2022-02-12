import { Robots } from '../src/types'

const taskRegexp = {
  add: /^a{3,}\s+/,
  edit: /^e{3,}\s+/,
  finish: /^(d{3,}|f{3,})\s+/,
  show: /^s{3}\s*/
}

module.exports = (robot: Robots) => {
  robot.hear(taskRegexp.add, (res) => {
    const { user, plainText } = res.message.message
    if (user.bot) return
    res.send(`@BOT_kashiwade task add ${plainText.replace(taskRegexp.add, '')}`)
  })

  robot.hear(taskRegexp.edit, (res) => {
    const { user, plainText } = res.message.message
    if (user.bot) return
    const [num, txt] = plainText.replace(taskRegexp.edit, '').split(/\s+/)
    res.send(`@BOT_kashiwade task edit ${num} ${txt}`)
  })

  robot.hear(taskRegexp.finish, (res) => {
    const { user, plainText } = res.message.message
    if (user.bot) return
    res.send(
      `@BOT_kashiwade task finish ${plainText.replace(taskRegexp.finish, '')}`
    )
  })

  robot.hear(taskRegexp.show, (res) => {
    if (res.message.message.user.bot) return
    res.send('@BOT_kashiwade task show')
  })
}
