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
        
        const time = Number(args[0])
        if (isNaN(time)) return message.channel.send(`Enter the timeline in seconds please.`)
        await queue.seek(time)
        message.channel.send(`Seeked to \`${time}\``)
    },
};