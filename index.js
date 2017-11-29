const Botkit = require('botkit');
const oauthRegistration = require('./oauthRegistration');
const debug = console.log;

const controller = Botkit.slackbot();

controller.configureSlackApp({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  rtm_receive_messages: false,
  redirectUri: 'https://levelup-slack-teacher.herokuapp.com/oauth',
  scopes: ['bot'],
});

controller.setupWebserver(process.env.PORT,function(err,webserver) {
  controller.createHomepageEndpoint(controller.webserver)
    .createOauthEndpoints(controller.webserver, function(err, req, res) {
      if (err) {
        res.status(500).send('ERROR: ' + err);
      } else {
        var code = req.query.code;
        var state = req.query.state;
        var slackapi = controller.spawn({});
        var opts = {
          client_id: controller.config.clientId,
          client_secret: controller.config.clientSecret,
          code: code
        };
        slackapi.api.oauth.access(opts, function(err, auth) {
          if (err) {
            debug('Error confirming oauth', err);
            return res.send("Login Error");
          }
          var scopes = auth.scope.split(/\,/);
          slackapi.api.auth.test({token: auth.access_token}, function(err, identity) {
            if (err) {
              debug('Error fetching user identity', err);
              return res.send("Login Error");
            }
            auth.identity = identity;
            controller.trigger('oauth:success', [auth]);
            res.cookie('team_id', auth.team_id);
            res.cookie('bot_user_id', auth.bot.bot_user_id);
            return res.send("Woot!");
          });
        });
      }
    })
    .createWebhookEndpoints(controller.webserver);
  controller.startTicking();
});
oauthRegistration(controller);

controller.hears(['hi', 'hello'], 'direct_message', function (bot, message) {
  bot.api.users.info({user: message.user}, (error, response) => {
    bot.reply(message, `Hello ${response.user.name}`);
  });
});

