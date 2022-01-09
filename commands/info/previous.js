const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "previous",
    aliases: ['ps', 'previoussong'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send('THere are no song next in queue!')

        await queue.previous()
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription("Going back in queue to play previous song!")
            ]
        })
    },
};