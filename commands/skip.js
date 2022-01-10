const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    aliases: ['s','nextsong'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const mChannel = client.member.voice.channel;
        const cChannel = message.member.voice.channel;

        if(!cChannel) return message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("RED")
                .setDescription("You need to be in a voice channel to use music commands!")
        ]})

        if(mChannel !== cChannel) return message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("RED")
                .setDescription("I am already playing in another channel!")
        ]})

        try {

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send('There are no song next in queue!')
        
        await queue.skip()
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setDescription("⤵️ Song Skipped!")
            ]
        })
    } catch(e) {
        message.channel.send({embeds: [
            new MessageEmbed()
            .setDescription(`${e}`)
        ]})
    }
    },
};