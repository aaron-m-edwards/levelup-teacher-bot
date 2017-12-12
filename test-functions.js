const Botmock = require('botkit-mock');
const NOOP = () => {};

function sendMessage(bot, text, deep = 0, user="test user", channel="D") {
  return bot.usersInput([{
    user,
    channel,
    messages: [{ text, isAssertion: true, deep }]
  }]);
}

function sendMessages(bot, messages, deep = 0, user="test user", channel="D") {
  return bot.usersInput([{
    user,
    channel,
    messages: [ ...messages.slice(0, -1).map(message => ({text: `${message}`})), { text: `${messages[messages.length-1]}`, isAssertion: true, deep }],
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
    beforeProcessingUserMessageTimeout: 20,
    afterProcessingUserMessageTimeout: 20,
  })
}

function shutdown(bot) {
  bot.botkit.tickInterval && clearInterval(bot.botkit.tickInterval);
}

module.exports = {
  sendMessage,
  sendMessages,
  createController,
  spawnBot,
  shutdown,
  setUserState,
  getUserState,
}
