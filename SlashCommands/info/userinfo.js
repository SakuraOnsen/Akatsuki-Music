const { Client, CommandInteraction } = require("discord.js");

const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "get info on a user id",
    options: [
        {
            name: "id",
            description: "user id",
            type: "STRING",
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        let id = interaction.options.getString('id')

        var ser = 'User is a server member.'
        if (!interaction.guild.members.cache.get(id)) { ser = 'User is not in server.' }

        if (!interaction.guild.members.cache.get(id)) {



            await client.users.fetch(id, { force: true }).then(target => {

                if (!target.banner || target.banner === undefined) {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(target.username, target.displaAvatarURL({ dynamic: true }))
                        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                        .setTitle(`visit Profile of ${target.tag}`)
                        .setURL(`discord//-/users/${targtet.id}`)
                        .addFields(
                            { name: "Username:", value: `${target.username}` },
                            { name: "Tag:", value: `${target.discriminator}` },
                            { name: "Using Discord Since:", value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>` },
                            { name: "Server Presence: ", value: "Not in server" }
                        )
                        .setTimestamp(Date.now())
                    interaction.reply({ embeds: [embed] })
                } else {

                    let bURL = target.bannerURL({ dynamic: true, size: 4096 })
                    const embed1 = new Discord.MessageEmbed()
                        .setAuthor(target.username, target.displaAvatarURL({ dynamic: true }))
                        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                        .setTitle(`visit Profile of ${user.tag}`)
                        .setURL(`discord//-/users/${user.id}`)
                        .addFields(
                            { name: "Username:", value: `${target.username}` },
                            { name: "Tag:", value: `${target.discriminator}` },
                            { name: "Using Discord Since:", value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>` },
                            { name: "Server Presence: ", value: "Not in server" }
                        )
                        .setImage(user.bannerURL({ dynamic: true, size: 4096 }))
                        .setTimestamp(Date.now())

                    return interaction.reply({ embeds: [embed1] })

                }
            }).catch((e) => {
                const erEmbed = new Discord.MessageEmbed()
                    .setDescription(`\`${id}\` is not a valid ID.`)
                interaction.reply({ embeds: [erEmbed] })
            })
        } else {

            const memberObj = interaction.guild.members.cache.get(id);
            const userObj = memberObj.user;
            var ack = 'Server Member'
            if (memberObj.permissions.toArray().includes('ADMINISTRATOR')) { ack = 'Server Administrator' }
            else if (memberObj.permissions.toArray().includes('KICK_MEMBERS') && !memberObj.permissions.toArray().includes('ADMINISTRATOR')) { ack = 'Server Moderator' }
            else if (memberObj.permissions.toArray().includes('BAN_MEMBERS') && !memberObj.permissions.toArray().includes('ADMINISTRATOR')) { ack = 'Server Moderator' }

            else { ack = 'Server Member' }
            avURL = userObj.displayAvatarURL({ dynamic: true })

            if (!userObj.banner || userObj.banner === undefined) {
                const embed3 = new Discord.MessageEmbed()
                    .setAuthor(userObj.username, userObj.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(userObj.displayAvatarURL({ dynamic: true }))
                    .setTitle(`visit Profile of ${userObj.tag}`)
                    .setURL(`discord//-/users/${userObj.id}`)
                    .addFields(
                        { name: "Username:", value: `${userObj.username}` },
                        { name: "Tag:", value: `${userObj.discriminator}` },
                        { name: "Using Discord Since:", value: `<t:${Math.floor(userObj.createdTimestamp / 1000)}:R>` },
                        { name: "Server Presence: ", value: "In server" },
                        { name: `Roles [${memberObj.roles.cache.size}]`, value: memberObj.roles.cache.map(r => r).join(", ") },
                        { name: "Server Acknowledgement:", value: ack }
                    )
                    .setTimestamp(Date.now())
                return interaction.reply({ embeds: [embed3] })
            } else {
                const embed4 = new Discord.MessageEmbed()
                    .setAuthor(userObj.username, userObj.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(userObj.displayAvatarURL({ dynamic: true }))
                    .setTitle(`visit Profile of ${userObj.tag}`)
                    .setURL(`discord//-/users/${userObj.id}`)
                    .addFields(
                        { name: "Username:", value: `${userObj.username}` },
                        { name: "Tag:", value: `${userObj.discriminator}` },
                        { name: "Using Discord Since:", value: `<t:${Math.floor(userObj.createdTimestamp / 1000)}:R>` },
                        { name: "Server Presence: ", value: "In server" },
                        { name: `Roles [${memberObj.roles.cache.size}]`, value: memberObj.roles.cache.map(r => r).join(", ") },
                        { name: "Server Acknowledgement:", value: ack }
                    )
                    .setImage(userObj.bannerURL({ dynamic: true, size: 4096 }))
                    .setTimestamp(Date.now())
                return interaction.reply({ embeds: [embed4] })
            }


        }
    },
};
