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

        try {

            const mChannel = client.member.voice.channel;
            const cChannel = message.member.voice.channel;

            if (!cChannel) return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("You need to be in a voice channel to use music commands!")
                ]
            })

            if (mChannel !== cChannel) return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("I am already playing in another channel!")
                ]
            })

            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send(`There is no queue to show!`)

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("DARK_NAVY")
                        .setDescription(`${queue.songs.map((song, id) => `\n${id + 1}. ${song.name} - ${song.formattedDuration}`)}`)
                ]
            })

        } catch (e) {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${e}`)
                ]
            })
        }
    },
};