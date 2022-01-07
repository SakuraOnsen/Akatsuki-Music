const chalk = require('chalk');


module.exports = async (Discord, client) =>{
  console.log(chalk.magenta(`Akatsuki is ready!`))
  console.log(chalk.green('Listening at: https://localhost:8080'))


  client.user.setActivity("Visual Studio Code", {
      type:"STREAMING",
      url: "https://www.twitch.tv/kireina_ujaan"
  });

  
}