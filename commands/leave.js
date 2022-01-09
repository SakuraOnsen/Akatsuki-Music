const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ['l', 'dc', 'disconnect'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)


        await client.distube.voices.leave(message)
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription("Left the voice channel")
            ]
        })
    },
};