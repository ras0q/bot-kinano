import { defaultEnvs } from '../config/env'
import { IDs } from '../config/id'
import { apiPostDM } from '../src/traqapi'

const { baseUrl } = defaultEnvs.traq

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export const postErrMsg = (err: any, msgId: string) => {
  apiPostDM(IDs['@Ras'], `${err}\n${baseUrl}/${msgId}`)
}
