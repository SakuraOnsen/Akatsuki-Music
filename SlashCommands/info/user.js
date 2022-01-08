const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    name: "user",
    description: "get info on a user id",
    options:  [
        {
            name: "id",
            description: "user id",
            type: "STRING",
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        let id = interaction.options.getString('id')

        var ser = 'User is a server member.'
        if (!interaction.guild.members.cache.get(id)) { ser = 'User is not in server.' }

        await client.users.fetch(id, { force: true }).then(target => {
            const avatar = target.avatar;
            const extension = avatar.startsWith('a_') ? 'gif' : 'webp';
            const avURL = `https://cdn.discordapp.com/avatars/${target.id}/${avatar}.${extension}?size=4096`;
            if (!target.banner || target.banner === undefined) {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setTitle(`Visit Profile of ${target.username}`)
                            .setURL(`https://www.discord.com/users/${target.id}`)
                            .setDescription(`The above re-direct will work **only if you have atleast 1 mutual server with the user**.\nAvatar Value: \`${target.avatar}\`\n Avatar URL Extension: .\`${extension}\``)
                            .addFields(
                                { name: 'Username:', value: `${target.username}` },
                                { name: 'Tag:', value: `#${target.discriminator}` },
                                { name: 'Using Discord Since:', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>` },
                                { name: 'Server Presence:', value: `${ser}` }
                            )
                            .setThumbnail(avURL)
                            .setTimestamp(Date.now())
                    ]
                })
            } else {
                const banner = target.banner;
                const ext = banner.startsWith('a_') ? '.gif' : '.png';
                const bURL = target.bannerURL({ dynamic: true, size: 4096 })//`https://cdn.discordapp.com/banners/${user}/${banner}${ext}?size=4096`;

                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setTitle(`Visit Profile of ${target.username}`)
                            .setURL(`https://www.discord.com/users/${target.id}`)
                            .setDescription(`The above re-direct will work **only if you have atleast 1 mutual server with the user**.\nAvatar Value: \`${target.avatar}\`\n Avatar URL Extension: .\`${extension}\`\n Banner Value: \`${banner}\`\n Banner Extension: \`${ext}\``)
                            .addFields(
                                { name: 'Username:', value: `${target.username}` },
                                { name: 'Tag:', value: `#${target.discriminator}` },
                                { name: 'Using Discord Since:', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>` },
                                { name: 'Server Presence:', value: `${ser}` },
                                { name: 'User Banner: ', value: bURL }
                            )
                            .setThumbnail(avURL)
                            .setImage(bURL)
                            .setTimestamp(Date.now())
                    ]
                })

            }
        }).catch((e) => {
            console.log(e);
            interaction.followUp(`\`${id}\` is not a valid ID.`)
        })
    },
};
