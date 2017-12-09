const mathQuiz = require('./math/quiz');
const mathGenerator = require('./math/quizGenerator')

module.exports = function(controller) {
  controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
    controller.storage.users.get(message.user, function(err, userData){
      if(userData && userData.data && userData.data.name) {
        bot.reply(message, `Hello there ${userData.data.name}`)
        mathQuiz(mathGenerator)(controller, bot, message)
      } else {
        bot.startConversation(message, function(err, convo) {
          convo.addQuestion('Hello there, what is your name?', function(response, convo) {
            const name = response.text;
            const newState = { 
              ...userData, 
              name,
              isTeacher: false,
            };
            controller.storage.users.save({id: message.user, data: newState }, ()=>{});
            convo.addQuestion(`Hi ${name}, Are you a student or teacher?`, function(response, convo) {
              if((/teacher/i).test(response.text)) {
                controller.storage.users.save({
                  id: message.user, 
                  data: { ...newState, isTeacher: true }}, () => {})
              } else {
                convo.next();
              }
              mathQuiz(mathGenerator)(controller, bot, message)
            });
            convo.next();
          });
        });
      }
    });
  });
}
