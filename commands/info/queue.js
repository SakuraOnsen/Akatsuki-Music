const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ['q'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is no queue to show!`)
        
        message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("DARK_NAVY")
                .setDescription(`${queue.songs.map((song, id) => `\n${id+1}. ${song.name} - ${song.formattedDuration}`)}`)
        ]})
    },
};