const { Client, Collection, Intents } = require(`discord.js`);
const Discord = require('discord.js')
const { readdirSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;
require('dotenv').config()

const client = new Client({ intents: 32767 })
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.author = ['722302164302692472']

const handlers = ['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});


client.login(process.env.TOKEN)