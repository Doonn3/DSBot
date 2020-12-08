const Discord = require('discord.js');
const client = new Discord.Client();

const { token, prefix } = require('../config/config.json');

const fs = require('fs');
const fileName = fs.readdirSync('./app/src/commands');
const commandFile = fileName.filter(file => file.endsWith('.js'));

const commandsMap = new Map();

commandFile.forEach(file => {
  const command = require(`../src/commands/${file}`);
  commandsMap.set(command.name, command);
});

module.exports = class Router {
  constructor() {
    this.BotReady();
  }

  BotReady() {
    client.once('ready', () => {
      console.log('Bot Ready!');
    })
    client.login(token);
  }

  run() {
    client.on('message', message => {
      if (message.author.bot) return;

      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (!commandsMap.has(commandName)) return;
      const command = commandsMap.get(commandName);

      try {
        command.execute(message);
      } catch (error) {
        message.channel.send('Произошла Ошибка При Выполнении Команды!');
        console.log(error);
      }
    });
  }
}