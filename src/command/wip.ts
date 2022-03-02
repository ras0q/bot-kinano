//Description:
// work in progress.

import { Robots } from '../src/types'
import { getMofu } from '../utils/mofu'
import { getRandom } from '../utils/random'

module.exports = (robot: Robots) => {
  robot.respond(/info/, (res) => {
    res.send(`\`\`\`\n${JSON.stringify(res.message, null, '  ')}\n\`\`\``)
  })

  robot.hear(/.+[食た]べたい$/, (res) => {
    const { user, plainText } = res.message.message
    if (!user.bot) {
      const query = plainText.match(/.+(?=[食た]べたい)/)
      res.reply(`https://www.kurashiru.com/search?query=${query}`)
    }
  })

  robot.hear(/kinanogacha/i, (res) => {
    if (!res.message.message.user.bot) {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          res.send(getMofu())
        }, i * 100)
      }
    }
  })

  robot.hear(/catgacha/i, (res) => {
    if (!res.message.message.user.bot) {
      const n = getRandom(0, 200)
      const cat = ':longcat_1:\n' + ':longcat_2:\n'.repeat(n) + ':longcat_3:\n'
      res.send(cat)
    }
  })

  const idan = 'いきぎしじちぢにひびぴみりゐイキギシジチヂニヒビピミリ'
  const adan = 'あかがさざただなはばぱまやらわアカガサザタダナハバパマヤラワ'
  const odan = 'おこごそぞとどのほぼぽもよろをオコゴソゾトドノホボポモヨロヲ'
  const kinanoLike = new RegExp(`[${idan}][${adan}][${odan}]`, 'g')
  robot.hear(kinanoLike, (res) => {
    if (!res.message.message.user.bot) {
      const found = res.message.message.text.match(kinanoLike)
      res.send(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        found!.map((v) => `「${v}」`).join('と') +
          'と「きなの」で韻が踏めるやんね:sunglasses:'
      )
    }
  })
}
