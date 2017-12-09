const Botmock = require('botkit-mock');
const NOOP = () => {};

function sendMessage(bot, text, user="test user", channel="D") {
  return bot.usersInput([{
    user,
    channel,
    messages: [{ text, isAssertion: true }]
  }]);
}

function getUserState(controller, state, user="test user") {
  return new Promise((resolve, reject) => {
    controller.storage.users.get(user, (err, data) => {
      if(err) { reject(err); }
      resolve(data);
    })
  })
}

function setUserState(controller, state) {
  controller.storage.users.save({...state }, NOOP);
}

function createController() {
  return Botmock({
    disable_startup_messages: true,
    logger: { log: NOOP },
  });
}

function spawnBot(controller) {
  return controller.spawn({
    type: 'slack',
    beforeProcessingUserMessageTimeout: 5,
    afterProcessingUserMessageTimeout: 5,
  })
}

function shutdown(bot) {
  bot.botkit.tickInterval && clearInterval(bot.botkit.tickInterval);
}

module.exports = {
  sendMessage,
  createController,
  spawnBot,
  shutdown,
  setUserState,
  getUserState,
}
