const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    aliases: null,
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

        /**if(queue.pause) return message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("AQUA")
                .setDescription("Song is already paused!")
        ]})**/

        await queue.pause(message)
        message.channel.send({embeds: [
            new MessageEmbed()
                .setColor("AQUA")
                .setDescription("⏸️ Song has been paused!")
        ]})
    } catch(e) {
        message.channel.send({embeds: [
            new MessageEmbed()
               .setColor("RED")
               .setDescription(`${e}`)
        ]})
    }
    },
};