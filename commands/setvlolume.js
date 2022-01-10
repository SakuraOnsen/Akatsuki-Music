const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "setvolume",
    aliases: ['volume', 'v', 'sv'],
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
            const vol = Number(args[0])
            const VoiceChannel = message.member.voice.channel;
            await queue.setVolume(vol)
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`🔊 Volume set to to \`${vol}%\``)
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