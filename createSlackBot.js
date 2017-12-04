const Botkit = require('botkit');

function createSlackBot(clientId, clientSecret, port, redirectUri, storage) {
  const controller = Botkit.slackbot({
    storage,
  });

  controller.configureSlackApp({
    clientId,
    clientSecret,
    rtm_receive_messages: false,
    redirectUri,
    scopes: ['bot', 'im:history', 'im:read']
  });

  
  controller.setupWebserver(port,function(err,webserver) {
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
  return controller;
}



module.exports = createSlackBot;
