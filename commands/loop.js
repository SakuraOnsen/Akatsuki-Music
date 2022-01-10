const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ['repeat'],
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

            let repeatmode = null;
            let loopmode = null;
            switch (args[0]) {
                case "off": {
                    loopmode = 0;
                    repeatmode = "Off"
                    break
                }
                case "song": {
                    loopmode = 1;
                    repeatmode = "Repeat Song"
                    break
                }
                case "queue": {
                    loopmode = 2;
                    repeatmode = "Repeat Queue"
                    break
                }
            }



            await queue.setRepeatMode(loopmode)
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`Set loop mode to: \`${repeatmode}\``)
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