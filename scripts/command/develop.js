module.exports = robot => {
  if (process.env.NODE_ENV === 'develop'){
    console.log(`\n\u001b[35mDEVELOPMENT ENVIRONMENT\nMy name is ${process.env.HUBOT_TRAQ_NAME}\u001b[0m`);

    robot.hear(/.*/i, res => {
      devInit(res.message);
    });
  }
};

const devInit = (message) => {
  message.message = {
    id: '00000000-0000-0000-0000-000000000000',
    user: {
      id: '0fa5d740-0841-4b88-b7c8-34a68774c784',
      name: 'Ras',
      displayName: 'らす',
      iconId: '00000000-0000-0000-0000-000000000000',
      bot: false
    },
    channelId: '00000000-0000-0000-0000-000000000000',
    text: message.text,
    plainText: message.text,
    embedded: [
      {
        raw: '@BOT_kinano',
        type: 'user',
        id: 'f60166fb-c153-409a-811d-272426eda32b'
      }
    ],
    createdAt: '2020-01-01T00:00:00.000000Z',
    updatedAt: '2021-01-01T00:00:00.000000Z'
  };
};
