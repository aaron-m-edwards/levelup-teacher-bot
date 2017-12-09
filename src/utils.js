module.exports = function(controller) {
  controller.hears('forget me', 'direct_message', function(bot, message){
    const name = message.match[1];
    controller.storage.users.save({id: message.user}, () => {});
  });
}
