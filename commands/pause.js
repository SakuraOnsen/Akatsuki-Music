const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    aliases: null,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        const queue = client.distube.getQueue(message)

        /**if(queue.pause) return message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("AQUA")
                .setDescription("Song is already paused!")
        ]})**/

        await queue.pause(message)
        message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("AQUA")
                .setDescription("Song has been paused!")
        ]})
    },
};