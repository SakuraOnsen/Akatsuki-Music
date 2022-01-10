const { Message, Client, DiscordAPIError, MessageEmbed } = require("discord.js");
const { webhookClient } = require("../index");

module.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor(client.user.tag, client.user.displayAvatarURL())
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(`\`\`\`apache\nLatency_Ping: ${client.ws.ping}ms\nGateway_Ping: ${Date.now() - message.createdTimestamp}ms\`\`\``)
                    .setTimestamp(Date.now())
            ]
        });
    },
};
