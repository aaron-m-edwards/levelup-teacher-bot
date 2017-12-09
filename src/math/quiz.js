module.exports = function(bot, message) {
  bot.startConversation(message, function(err, convo) {
    convo.say('Let\'s start a math quiz');
    convo.addQuestion('Question 1: What is 4 + 7?', (response, convo) => {
      if (response.text === '11') {
        convo.say('That is correct, good job!');
        convo.next();
      } else {
        convo.say('That is incorrect, the correct answer is 11');
        convo.next();
      }
    })
    convo.next();
  });
}
