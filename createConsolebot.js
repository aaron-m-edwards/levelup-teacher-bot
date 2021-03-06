const Botkit = require('botkit');

module.exports = () => {
  const controller = Botkit.consolebot();
  controller.middleware.categorize.use(function(bot, message, next) {
    if (message.type == 'message_received') {
      message.type = 'direct_message';
    }
    next();
  })
  const bot = controller.spawn();
  bot.api = {
    users: {
      info: ({user}, cb) => { cb({user: { name: "User" }})}, 
    }
  }
  return controller;
}
