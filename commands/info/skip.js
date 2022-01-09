const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    aliases: ['s','nextsong'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send('THere are no song next in queue!')
        
        await queue.skip(message, song)
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription("Song Skipped!")
            ]
        })
    },
};