const greeting = require("./greeting");
const utils = require("./utils");

module.exports = function(controller) {
  greeting(controller);
  utils(controller);
}
