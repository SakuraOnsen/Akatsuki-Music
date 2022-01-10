const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "seek",
    aliases: null,
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

            const time = Number(args[0])
            if (isNaN(time)) return message.channel.send(`Enter the timeline in seconds please.`)
            await queue.seek(time)
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("AQUA")
                        .setDescription(`⏪⏩ Seeked to \`${time}\``)
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