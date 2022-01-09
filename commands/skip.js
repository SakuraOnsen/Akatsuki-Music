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

        try {

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send('There are no song next in queue!')
        
        await queue.skip()
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription("⤵️ Song Skipped!")
            ]
        })
    } catch(e) {
        message.channel.send({embeds: [
            new MessageEmbed()
            .setDescription(`${e}`)
        ]})
    }
    },
};