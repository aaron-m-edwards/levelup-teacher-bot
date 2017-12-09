
const testBot = require('../../test-functions');
const quiz = require('./quiz');

function setUpConvo(controller, convo) {
  controller.hears(['start'], 'direct_message', (bot, message) => {
    quiz(bot, message);
  })
}

describe("math quiz", () => {
  let controller, bot;
  beforeEach(() => {
    controller = testBot.createController();
    setUpConvo(controller, quiz);
    bot = testBot.spawnBot(controller);
  })
  afterEach(() => testBot.shutdown(bot));

  it('should say that bot is starting math quiz', () => {
    return testBot.sendMessage(bot, 'start')
      .then(message => expect(message.text).to.equal('Let\'s start a math quiz'));
  });

  it('should ask the 1st question', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(message => expect(message.text).to.contain('What is 4 + 7?'));
  });

  it('should congratulate when answered correctly', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(() => testBot.sendMessage(bot, '11'))
      .then(message => expect(message.text).to.contain('That is correct, good job!'));
  
  })

  it('should show the correct answer', () => {
    return testBot.sendMessage(bot, 'start')
      .then(() => testBot.sendMessage(bot, ''))
      .then(() => testBot.sendMessage(bot, '12'))
      .then(message => expect(message.text).to.contain('the correct answer is 11'));
  })

});
