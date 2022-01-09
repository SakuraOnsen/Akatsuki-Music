const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: 32767,
});


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: true,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
})

module.exports = client;

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) =>
        queue.textChannel.send({embeds: [
            new MessageEmbed()
                .setColor("DARK_AQUA")
                .setDescription(` | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
        ]})
    )
    .on("addSong", (queue, song) =>
        queue.textChannel.send({embeds: [
            new MessageEmbed()
                .setColor("DARK_AQUA")
                .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        ]})
    )
    .on("addList", (queue, playlist) =>
        queue.textChannel.send({embeds: [
            new MessageEmbed()
                .setColor("DARK_AQUA")
                .setDescription(` | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        ]})
    )
    .on("searchNoResult", (message, query) => message.channel.send("No result found for: " + query))
    .on("error", (channel, e) => {
        channel.send(` | An error encountered: ${e.toString().slice(0, 1974)}`)
        console.error(e)
    })
    .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
    .on("searchNoResult", message => message.channel.send(` | No result found!`))
    .on("finish", queue => queue.textChannel.send({embeds: [
        new MessageEmbed()
            .setColor("DARK_AQUA")
            .setDescription('Finsished playing the current queue. Leaving Channel... Hope you enjoyed!')
    ]}))


// Initializing the project
require("./handler")(client);

client.login(client.config.token);
