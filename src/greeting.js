const mathQuiz = require('./math/quiz');
const mathCreator = require('./math/quizGenerator');
const storage = require('./utils/storage');

module.exports = function(controller) {
  controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
    const mathGenerator = mathCreator.createGenerator(Math.random);

    bot.startConversation(message, function(err, convo) {
      storage.getUserData(controller, message.user, function(err, userData){
        if(userData && userData.name) {
          convo.say(`Hello there ${userData.name}`)
          convo.next();
          mathQuiz(mathGenerator)(controller, bot, convo)
        } else {
          convo.addQuestion('Hello there, what is your name?', function(response, convo) {
            const name = response.text;
            storage.updateUserData(controller, message.user, {name, isTeacher: false})
            convo.addQuestion(`Hi ${name}, Are you a student or teacher?`, function(response, convo) {
              if((/teacher/i).test(response.text)) {
                storage.updateUserData(controller, message.user, {isTeacher: true})
              }
              mathQuiz(mathGenerator)(controller, bot, convo)
            });
            convo.next();
          });
        }
      });
    });
  });
}
