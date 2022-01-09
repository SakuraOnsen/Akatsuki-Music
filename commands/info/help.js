const { MessageEmbed } = require("discord.js");
const { readdirSync } = require('fs');

module.exports = {
    name: "help",
    aliases: [],
    description: "Help Cmd",

    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setTitle("Music Help!")
            .addFields(
                { name: "play", value: "Usage: `a.play [Song Name / Spotify URL / YT URL / SoundCloud URL]`\n Aliases: `pl`" },
                { name: "pause", value: "Usage: `a.pause`\n Aliases: `None`" },
                { name: "resume", value: "Usage: `a.resume`\n Aliases: `None`" },
                { name: "queue", value: "Usage: `a.queue`\n Aliases: `q`" },
                { name: "loop", value: "Usage: `a.loop [off / song / queue]`\n Aliases: `repeat`" },
                { name: "skip", value: "Usage: `a.skip`\n Aliases: `None`" },
                { name: "previous", value: "Usage: `a.previous`\n Aliases: `None`" },
                { name: "seek", value: "Usage: `a.seek [Time In **SECONDS** for eg: 200]`\n Aliases: `None`" },
                { name: "setvolume", value: "Usage: `a.setvolume [1 = 1%]`\n Aliases: `volume, v, sv`" },
                { name: "leave", value: "Usage: `a.leave`\n Aliases: `None`" },
                { name: "ping", value: "Usage: `a.ping`\n Aliases: `None`" }
            )
            .setColor("DARK_NAVY")
        message.channel.send({ embeds: [embed] })

    }
}