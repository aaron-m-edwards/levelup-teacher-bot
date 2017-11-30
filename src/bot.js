module.exports = function(controller) {
  controller.hears(/call me (.*)/i, 'direct_message', function(bot, message){
    const newName = message.match[1];
    controller.storage.users.save({id: message.user, newName }, console.log);
    bot.reply(message, `Ok I will call you ${newName} from now on`);
  })
  controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
    controller.storage.users.get(message.user, function(err, user){
      controller.storage.teams.all(function(err, all_team_data){console.log(all_team_data)});
      if(user && user.name) {
        bot.reply(message, `Hi there ${user.name}`)
      } else {
        bot.startConversation(message, function(err, convo) {
          convo.addQuestion('Hi there, what is your name?', function(response, convo) {
            const name = response.text;
            controller.storage.users.save({id: message.user, name }, console.log);
            convo.say(`Awesome, I will call you ${name}`);
            convo.next();
          });
        });
      }
    });
  });
}
