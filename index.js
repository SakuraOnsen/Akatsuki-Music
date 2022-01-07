const { Client, Collection, Intents } = require(`discord.js`);
const Discord = require('discord.js')
const { readdirSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;
const express = require('express')
const port = 3000
const app = express()


const http = require("http");
http.createServer((_, res) => res.end("hello")).listen(8080)
console.log('Host is running')

const client = new Client({ intents: 32767 })
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.author = ['722302164302692472']
client.snipes = new Collection();

const handlers = ['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

const antijoin = new Collection()
module.exports = { antijoin }

client.login(process.env.TOKEN)