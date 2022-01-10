const { MessageEmbed } = require("discord.js");
const { webhookClient } = require("../index");

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


        const VoiceChannel = message.member.voice.channel;
        if (!VoiceChannel) return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("RED")
                    .setDescription("You need to be in a voice channel to use music commands!")
            ]
        })

        if (message.guild.me.voice.channelId && VoiceChannel.id !== message.guild.me.voice.channelId) return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("RED")
                    .setDescription("I am already playing in another channel!")
            ]
        })

        const song = args.slice(0).join(" ");
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