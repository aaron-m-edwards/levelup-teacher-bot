
const testBot = require('../test-functions');
const utility = require('./utils');

describe('utility functions', () => {
  let controller, bot;
  beforeEach(() => {
    controller = testBot.createController();
    utility(controller);
    bot = testBot.spawnBot(controller);
  })
  afterEach(() => testBot.shutdown(bot));

  it('should forget the user', () => {
    testBot.setUserState(controller, {id: 'test user', name: "Test"});
    return testBot.sendMessage(bot, 'forget me')
      .then(() => testBot.getUserState(controller, 'test user'))
      .then(userData => {
        expect(userData.data).to.be.undefined;
      })
  })


})
