const testBot = require('../test-functions');
const greeting = require('./greeting');

describe("greeting functions", () => {
  let controller, bot;
  beforeEach(() => {
    controller = testBot.createController();
    greeting(controller);
    bot = testBot.spawnBot(controller);
  })
  afterEach(() => testBot.shutdown(bot));

  describe('for a new user', () => {
    it('should respond to "hi" by asking the users name', () => {
      return testBot.sendMessage(bot, 'hi')
        .then((message) => {
          expect(message.text).to.equal("Hello there, what is your name?");
        })
    });

    it('should respond with the given name', () => {
      const name = "Namey McName Face";
      return testBot.sendMessage(bot, 'hi')
        .then(() => testBot.sendMessage(bot, name))
        .then(message => {
          expect(message.text).to.contain(name);
        })
    });
  })

  describe('for a returning user', () => {
    it('should greet the user by name', () => {
      testBot.setUserState(controller, {id: 'test user', data: { name: 'some person'} });
      return testBot.sendMessage(bot, 'hi')
        .then(message => {
          expect(message.text).to.contain('Hello there');
          expect(message.text).to.contain('some person');
        });
    });
  });
});
