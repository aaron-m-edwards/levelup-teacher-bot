module.exports = function(controller) {
  controller.hears(/call me (.*)/i, 'direct_message', function(bot, message){
    const name = message.match[1];
    controller.storage.users.save({id: message.user, name }, console.log);
    bot.reply(message, `Ok I will call you ${name} from now on`);
  });
}
