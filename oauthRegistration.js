const debug = console.log

module.exports = {
  registerSuccess: controller => {
    controller.on('create_bot', function(bot, config) {
      console.log(bot);
            //controller.storage.teams.save(team, function(err, id) {
              //if (err) {
                //debug('Error: could not save team record:', err);
              //} else {
                //debug('Created a team bot ', bot.team_info);
              //}
            //});
    });
  }
}
