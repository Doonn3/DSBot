const { prefix } = require("../../config/config.json");

module.exports = {
  name: 'help',
  description: 'Справочник По Всем Коммандам!',
  execute(message) {
    message.channel.send('rr');
  }
}