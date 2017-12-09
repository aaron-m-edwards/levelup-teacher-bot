module.exports = function(controller) {
  controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
    controller.storage.users.get(message.user, function(err, userData){
      if(userData && userData.data && userData.data.name) {
        bot.reply(message, `Hello there ${userData.data.name}`)
      } else {
        bot.startConversation(message, function(err, convo) {
          convo.addQuestion('Hello there, what is your name?', function(response, convo) {
            const name = response.text;
            controller.storage.users.save({id: message.user, data: { ...userData, name } }, ()=>{});
            convo.say(`Awesome, I will call you ${name}`);
            convo.next();
          });
        });
      }
    });
  });
}
