const client = require("../index");
const chalk = require('chalk');

client.on("ready", () => {
    console.log(chalk.yellow(`Akatsuki is online.`))
    console.log(chalk.green('Currently Self Hosted.'))
}
);
