module.exports = {
  name: 'ping',
  description: 'Пинг Для Внутринних Тестов!',
  execute(message) {
    message.channel.send('is True!');
  }
}