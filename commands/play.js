const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    aliases: ['pl'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const song = args.slice(0).join(" ");
        const VoiceChannel = message.member.voice.channel;
        await client.distube.play(message, song)
        /**message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription("Song Requested!")
            ]
        })**/
    },
};