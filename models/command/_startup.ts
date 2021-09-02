//Description:
//  StartUp

import cron from 'node-cron'
import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { Robots } from '../src/types'
import { setTodayBlogs } from '../utils/blog'
import { convertToCronTimePerDate } from '../utils/crontime'
import { setSampleMessage } from '../utils/develop'
import { setTodayEvents } from '../utils/event'
import { getMofu } from '../utils/mofu'

const { workEnv } = defaultEnvs.local

module.exports = (robot: Robots) => {
  //開発環境
  if (workEnv === 'develop') {
    console.log(`
\u001b[35mDEVELOPMENT ENVIRONMENT
My name is ${workEnv}\u001b[0m
`)
    robot.hear(/./, (res) => {
      setSampleMessage(res.message)
    })
  }

  //デプロイ時実行
  robot.send(
    { channelID: IDs['#g/t/R/B/log'] },
    `デプロイ完了${getMofu()} (${new Date().toLocaleString()})`
  )

  //cronセット
  const updateTime = new Date()
  updateTime.setMinutes(updateTime.getMinutes() + 1)
  cron.schedule(convertToCronTimePerDate(updateTime), () => {
    setTodayBlogs(robot)
    setTodayEvents(robot)
  })
}
