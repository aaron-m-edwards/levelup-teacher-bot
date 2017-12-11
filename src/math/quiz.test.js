
const testBot = require('../../test-functions');
const quiz = require('./quiz');

function setUpConvo(controller, bot, convo) {
  controller.hears(['start'], 'direct_message', (bot, message) => {
    bot.startConversation(message, function(err, c) {
      convo(controller, bot, c);
    });
  })
}

describe("math quiz", () => {
  let controller, bot;
  let quizGenerator;
  beforeEach(() => {
    controller = testBot.createController();
    quizGenerator = function(){ 
        return [{
          number1: 1,
          number2: 2,
          answer: 3
        }, {
          number1: 2,
          number2: 2,
          answer: 4
        }]
      }
    setUpConvo(controller, bot, quiz(quizGenerator));
    bot = testBot.spawnBot(controller);
  });
  afterEach(() => testBot.shutdown(bot));

  it('should say that bot is starting math quiz', () => {
    return testBot.sendMessage(bot, 'start')
      .then(message => expect(message.text).to.equal('Let\'s start a math quiz'));
  });

  it('should ask the 1st question', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(message => expect(message.text).to.contain('What is 1 + 2?'));
  });

  it('should congratulate when answered correctly', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(() => testBot.sendMessage(bot, '3'))
      .then(message => expect(message.text).to.contain('That is correct, good job!'));

  })

  it('should show the correct answer', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(() => testBot.sendMessage(bot, '4'))
      .then(message => expect(message.text).to.contain('the correct answer is 3'));
  })

  it('should show the amout of correct answers', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(() => testBot.sendMessage(bot, '4'))
      .then(() => testBot.sendMessage(bot, ''))
      .then(() => testBot.sendMessage(bot, '4'))
      .then(() => testBot.sendMessage(bot, ''))
      .then(message => expect(message.text).to.contain('You got 1/2 correct'));
  })

});
