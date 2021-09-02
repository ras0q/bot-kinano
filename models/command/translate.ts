//Description:
//  translate words.

import fetch from 'node-fetch'
import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { Robots } from '../src/types'

const { baseUrl } = defaultEnvs.gas

const apiUrl = (txt: string, src: string, tar: string) =>
  new URL(`${baseUrl}?text="${txt}"&source=${src}&target=${tar}`)

module.exports = (robot: Robots) => {
  //翻訳(デフォルトは日=>英)
  robot.hear(/^tra\s+/i, async (res) => {
    const { id, plainText, user } = res.message.message
    if (!user.bot) {
      const txt = plainText.replace(/^tra\s+/i, '')
      const langs = plainText.match(/[([]\s*(..)\s*([=-]>|→)\s*(..)\s*[)\]]/)
      const [src, tar] = langs !== null ? [langs[1], langs[3]] : ['ja', 'en']

      try {
        const body = await fetch(apiUrl(txt, src, tar))
        if (body.status !== 200) throw new Error(body.statusText)
        const { text } = await body.json()
        if (text !== '') res.reply(text)
        else res.reply('きなのその言葉知らない！')
      } catch (err) {
        console.log(err)
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        )
      }
    }
  })

  //逆翻訳
  robot.hear(/^tratra\s+/i, async (res) => {
    const { id, plainText, user } = res.message.message
    if (!user.bot) {
      const txt = plainText.replace(/^tratra\s+/, '')

      try {
        const body = await fetch(apiUrl(txt, 'ja', 'en'))
        if (body.status !== 200) throw new Error(body.statusText)
        const { text } = await body.json()
        const body2 = await fetch(apiUrl(text, 'en', 'ja'))
        if (body2.status !== 200) throw new Error(body.statusText)
        const { text: text2 } = await body2.json()
        if (text2 !== '') res.reply(text2)
        else res.reply('きなのその言葉知らない！')
      } catch (err) {
        console.log(err)
        robot.send(
          { userID: IDs['@Ras'] },
          `${err}\nhttps://q.trap.jp/messages/${id}`
        )
      }
    }
  })
}
