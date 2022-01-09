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

        const queue = client.distube.getQueue(message)
        const vol = Number(args[0])
        const VoiceChannel = message.member.voice.channel;
        await queue.setVolume(vol)
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription(`Seeked to \`${vol}\``)
            ]
        })
    },
};