const Discord = require('discord.js');

module.exports = {
    name: "leave",
    description: "leave voice channel",

    run: async (client, interaction, args) => {


        try {


            const { options, member, guild, channel } = interaction;
            const VoiceChannel = member.voice.channel;
            if (!VoiceChannel) return interaction.reply({ contents: "You need to be in a voice channel to use this command!",  ephemeral: true })

            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
                return interaction.followUp({ content: `I am already playing music in <#${guidl.me.voice.channelId}>.`, ephemeral: true });

                const queue = client.distube.getQueue(VoiceChannel);

            client.distube.voices.leave(VoiceChannel);
            interaction.followUp({embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Left the voice channel!") 
            ]})

        } catch (e) {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`${e}`)
                ]
            })
        }

    }
}