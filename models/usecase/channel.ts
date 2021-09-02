import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { apiJoin, apiLeave, apiPostDM } from '../src/traqapi'
import { RobotHearResponse } from '../src/types'
import { postErrMsg } from '../utils/error'

const { baseUrl } = defaultEnvs.traq

export const join = async (res: RobotHearResponse): Promise<void> => {
  const { channelId, id } = res.message.message
  apiPostDM(IDs['@Ras'], `## join\n ${baseUrl}/${id}`)
  try {
    await apiJoin(channelId)
    setTimeout(() => { res.reply(':oisu-1::oisu-2::oisu-3::oisu-4yoko:') }, 500)
    setTimeout(() => { res.reply('きなのの機能を見るにはこのメッセージに:Do_it:スタンプを押すやんね！') }, 1000)
  } catch (err) {
    postErrMsg(err, id)
  }
}

export const leave = async (res: RobotHearResponse): Promise<void> => {
  const { channelId, id } = res.message.message
  apiPostDM(IDs['@Ras'], `## leave\n ${baseUrl}/${id}`)
  try {
    await apiLeave(channelId)
    setTimeout(() => { res.reply('ばいばいやんね～、また遊んでやんね～') }, 500)
  } catch (err) {
    postErrMsg(err, id)
  }
}
