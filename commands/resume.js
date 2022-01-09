const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    aliases: null,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        const queue = client.distube.getQueue(message)

        await queue.resume(message)
        message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("AQUA")
                .setDescription("▶️ Song has been resumed!")
        ]})
    },
};