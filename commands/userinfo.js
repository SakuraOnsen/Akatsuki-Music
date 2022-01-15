const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    aliases: ['whois', 'wi'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let id = args[0];
        if (!args[0]) id = message.author.id;

        let target = message.guild.members.cache.get(id);

        if (!target) {
            target = await client.users.fetch(id, { force: true }).catch((e) => message.channel.send({ embeds: [new MessageEmbed().setColor("RED").setDescription(`${e}`)] }))
            const embed1 = new MessageEmbed()
                .setAuthor(target.username, target.displayAvatarURL({ dynamic: true }), target.displayAvatarURL({ dynamic: true }))
                .setTitle(`Visit Profile Of ${target.tag}`)
                .setURL(`https://www.discord.com/users/${target.id}`)
                .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Avatar:", value: `\`${target.displayAvatarURL({ dynamic: true, size: 4096 })}\`` },
                    { name: "Username", value: `${target.username}` },
                    { name: "Tag", value: `${target.discriminator}` },
                    { name: "Using Discord Since:", value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>` },
                    { name: "Server Presence", value: `User is not a server member.` }
                )
                .setTimestamp(Date.now())
            if (target.banner) {
                embed1.addFields(
                    { name: "Banner", value: `\`${target.bannerURL({ dynamic: true, size: 4096 })}\`` }
                )
                embed1.setImage(target.bannerURL({ dynamic: true, size: 4096 }))
            }
            message.channel.send({ embeds: [embed1] });


        } else if (target) {
            let roles = target.roles.cache.map(r => r).join(" ")
            if (roles.length >= 1024) roles = "Too many roles to show"
            const embed2 = new MessageEmbed()
                .setAuthor(target.user.username, target.user.displayAvatarURL({ dynamic: true }), target.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`Visit Profile Of ${target.user.tag}`)
                .setURL(`https://www.discord.com/users/${target.user.id}`)
                .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Avatar:", value: `\`${target.user.displayAvatarURL({ dynamic: true, size: 4096 })}\`` },
                    { name: "Username", value: `${target.user.username}` },
                    { name: "Tag", value: `${target.user.discriminator}` },
                    { name: "Using Discord Since:", value: `<t:${Math.floor(target.user.createdTimestamp / 1000)}:R>` },
                    { name: "Server Nickname:", value: `${target.displayName}` },
                    { name: `Roles [${target.roles.cache.size}]:`, value: roles },
                    { name: "Server Presence", value: `User is a server member.` }
                )
                .setTimestamp(Date.now())
            if (target.user.banner) {
                const banner = await client.users.fetch(target.user.id, { force: true }).then(b => b.bannerURL({ dynamic: true, size: 4096 }))
                embed2.addFields(
                    { name: "Banner", value: banner }
                )
                embed2.setImage(banner)
            }
            const banner = await client.users.fetch(target.user.id, { force: true }).then(b => b.bannerURL({ dynamic: true, size: 4096 }))
            message.channel.send({ embeds: [embed2] });
            message.channel.send(`User Banner: \`${banner}\``)
            message.channel.send(banner)
        } else return

    }
}