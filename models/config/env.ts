const getEnv = (envName: string) => {
  const res = process.env[envName]
  if (!res) {
    throw new Error(`env ${envName} is not set`)
  }

  return res
}

export const defaultEnvs = {
  gas: {
    baseUrl: getEnv('GAS_BASE_URL')
  },
  hubot: {
    traqName: getEnv('HUBOT_TRAQ_NAME'),
    traqBotId: getEnv('HUBOT_TRAQ_BOT_ID'),
    traqAccessToken: getEnv('HUBOT_TRAQ_ACCESS_TOKEN')
  },
  ical: {
    baseUrl: getEnv('')
  },
  local: {
    workEnv: getEnv('LOCAL_WORK_ENV')
  },
  mebo: {
    apiKey: getEnv('MEBO_API_KEY'),
    agentId: getEnv('MEBO_AGENT_ID'),
    baseUrl: getEnv('MEBO_BASE_URL')
  },
  showcase: {
    clientId: getEnv('SHOWCASE_CLIENT_ID'),
    baseUrl: getEnv('SHOWCASE_BASE_URL')
  }
}
