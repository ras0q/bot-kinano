import { IDs } from '../config/id'
import { apiPostDM } from '../src/traqapi'
import { RobotHearResponse } from '../src/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const postErrMsg = (err: any, res: RobotHearResponse) => {
  console.error(err)
  apiPostDM(IDs['@Ras'], err, res)
}
