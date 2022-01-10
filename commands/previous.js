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
            if (!queue) return message.channel.send('THere are no song next in queue!')

            await queue.previous()
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription("⏮️ Going back in queue to play previous song!")
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