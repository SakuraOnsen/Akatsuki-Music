const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: true,
    plugins: [new SpotifyPlugin()]
})
module.exports = client;

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
