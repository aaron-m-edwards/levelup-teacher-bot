const Botkit = require('botkit');


const controller = Botkit.slackbot();

controller.configureSlackApp({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  rtm_receive_messages: false,
  scopes: ['incoming-webhook','team:read','users:read','channels:read','im:read','im:write','groups:read','emoji:read','chat:write:bot']
});

controller.setupWebserver(process.env.port,function(err,webserver) {
  controller.createHomepageEndpoint(controller.webserver)
    .createOauthEndpoints(controller.webserver,function(err,req,res) {
      controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
      })
    })
    .createWebhookEndpoints(controller.webserver);
  controller.startTicking();
});


controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
  bot.api.users.info({user: message.user}, (error, response) => {
    bot.reply(message, `Hello ${response.user.name}`);
  });
});

