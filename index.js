const createSlackBot = require('./createSlackBot');
const createConsoleBot = require('./createConsolebot');

const botkitRedis = require('botkit-storage-redis');
const bot = require('./src/bot');


let controller;
if(process.env.PORT) {
  const redisStorage = botkitRedis({url: process.env.REDISTOGO_URL});
  controller = createSlackBot(
    process.env.clientId, 
    process.env.clientSecret, 
    process.env.PORT,
    "https://levelup-slack-teacher.herokuapp.com/oauth",
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


bot(controller);
