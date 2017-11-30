const Botkit = require('botkit');
const oauthRegistration = require('./oauthRegistration');

const botkitRedis = require('botkit-storage-redis');
const redisStorage = botkitRedis({url: process.env.REDISTOGO_URL});
const controller = Botkit.slackbot({
  storage: redisStorage
});

controller.configureSlackApp({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  rtm_receive_messages: false,
  redirectUri: 'https://levelup-slack-teacher.herokuapp.com/oauth',
  scopes: ['bot']
});

controller.setupWebserver(process.env.PORT,function(err,webserver) {
  controller.createHomepageEndpoint(controller.webserver)
    .createOauthEndpoints(controller.webserver, function(err, req, res) {
      if (err) {
        res.status(500).send('ERROR: ' + err);
      } else {
        res.send('Success!');
      }
    })
    .createWebhookEndpoints(controller.webserver);
  controller.startTicking();
});

oauthRegistration.registerSuccess(controller);

controller.storage.teams.all((err, teams) => {
  for (var t in teams) {
    if (teams[t].bot) {
      controller.spawn(teams[t])
    }
  }
});

controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
  bot.api.users.info({user: message.user}, (error, response) => {
    bot.reply(message, `Hello ${response.user.name}`);
  });
});

