const { readdirSync } = require('fs');
const chalk = require('chalk');

module.exports = (client, fClient) => {
  for(let dir of readdirSync('./commands/')) {
    for(let command of readdirSync(`./commands/${dir}`)) {
      const cmd = require(`../commands/${dir}/${command}`)
      if(cmd.argsreq && cmd.argsreq !== null && (!cmd.usage || cmd.usage == '')) return console.log(`COMMANDS USAGE REQ: ${command}`);

      if(cmd.name) {
        client.commands.set(cmd.name.toLowerCase(), cmd);
        console.log(chalk.yellow(`[Command]`), chalk.green(`${cmd.category} /`)/**replace(cmd.category[0], cmd.category[0].toUpperCase())} /`)**/, chalk.cyan(cmd.name.replace(cmd.name[0], cmd.name[0].toUpperCase())));
      } else {
        console.log(chalk.red(`${command}`))
      }
      if(cmd.aliases?.length) {
          for(let i of cmd.aliases) {
              client.aliases.set(i, cmd);
          }
      }
    }
  }
}