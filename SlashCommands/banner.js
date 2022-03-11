const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "banner",
    description: "returns user banner",
    options: [{
        name: "id",
        description: "user id",
        type: "STRING",
        required: true,
    }, ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        let id = interaction.options.getString("id");
        let user = await client.user
            .fetch(id, { force: true })
            .catch((err) => interaction.reply({ content: "Unable to fetch user!" }));
        const banner = user.bannerURL({ dynamic: true, size: 4096 });
        if (!banner) return interaction.reply({ content: "No Banner Found!" });

        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`${user.username}'s Banner`)
                .setImage(banner),
            ],
        });
    },
};