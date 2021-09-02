import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { apiJoin, apiLeave, apiPostDM } from '../src/traqapi'
import { RobotHearResponse } from '../src/types'
import { postErrMsg } from '../utils/error'

const { baseUrl } = defaultEnvs.traq

const joinMsg = ':oisu-1::oisu-2::oisu-3::oisu-4yoko:'
const helpMsg = 'きなのの機能を見るにはこのメッセージに:Do_it:を押すやんね！'
const leaveMsg = 'ばいばいやんね～、また遊んでやんね～'

export const join = async (res: RobotHearResponse): Promise<void> => {
  const { channelId, id } = res.message.message
  apiPostDM(IDs['@Ras'], `## join\n ${baseUrl}/${id}`)
  try {
    await apiJoin(channelId)
    setTimeout(() => {
      res.reply(joinMsg)
    }, 500)
    setTimeout(() => {
      res.reply(helpMsg)
    }, 1000)
  } catch (err) {
    postErrMsg(err, res)
  }
}

export const leave = async (res: RobotHearResponse): Promise<void> => {
  const { channelId, id } = res.message.message
  apiPostDM(IDs['@Ras'], `## leave\n ${baseUrl}/${id}`)
  try {
    await apiLeave(channelId)
    setTimeout(() => {
      res.reply(leaveMsg)
    }, 500)
  } catch (err) {
    postErrMsg(err, res)
  }
}
