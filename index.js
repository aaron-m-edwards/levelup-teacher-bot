const createSlackBot = require('./createSlackBot');
const createConsoleBot = require('./createConsoleBot');
const botkitRedis = require('botkit-storage-redis');

let controller;
if(process.env.PORT) {
  const redisStorage = botkitRedis({url: process.env.REDISTOGO_URL});
  controller = createSlackBot(
    process.env.clientId, 
    process.env.cleintSecret, 
    process.env.PORT,
    "https://levelup-slack-teacher.herokuapp.com",
    redisStorage,
  );
} else {
  controller = createConsoleBot();
}

controller.storage.teams.all((err, teams) => {
  for (var t in teams) {
    if (teams[t].bot) {
      controller.spawn(teams[t])
    }
  }
});

controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
  bot.reply(message, `Hello There`);
});

