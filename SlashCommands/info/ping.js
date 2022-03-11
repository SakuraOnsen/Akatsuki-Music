const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`\`\`\`apache\nLatency_Ping: ${client.ws.ping}ms\nGateway_Ping: ${Date.now() - interaction.createdTimestamp}ms\`\`\``)
                .setTimestamp(Date.now())
            ]
        });
    },
};