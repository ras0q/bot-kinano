import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { apiPostDM } from '../src/traqapi'
import { RobotHearResponse } from '../src/types'

const { baseUrl } = defaultEnvs.traq

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const postErrMsg = (err: any, res: RobotHearResponse) => {
  console.error(err)
  apiPostDM(IDs['@Ras'], `${err}\n${baseUrl}/${res.message.message.id}`)
}
