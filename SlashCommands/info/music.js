const Discord = require('discord.js');

module.exports = {
    name: "music",
    description: "Play a song",
    options: [
        {
            name: "play",
            description: "Play the song of your choice",
            type: "SUB_COMMAND",
            options: [{ name: "name", description: "Provide the song name or link.", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Change the volume of the song playing",
            type: "SUB_COMMAND",
            options: [{ name: "percentage", description: "provide volume percent", type: "NUMBER", required: true }]
        },
        {
            name: "setting",
            description: "Select a setting config option",
            type: "SUB_COMMAND",
            options: [{
                name: "option", description: "Select an option to set", type: "STRING", required: true,
                choices: [
                    { name: "queue", value: "queue" },
                    { name: "skip", value: "skip" },
                    { name: "pause", value: "pause" },
                    { name: "resume", value: "resume" },
                    { name: "stop", value: "stop" },
                ]

            }]
        }
    ],
    run: async (client, interaction, args) => {

        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.followUp({ content: "You must be in a voice channel to use the music commands!", ephemeral: true });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.followUp({ content: `I am already playing music in <#${guidl.me.voice.channelId}>.`, ephemeral: true });

        try {

            switch (options.getSubcommand()) {
                case "play": {
                    await client.distube.voices.join(VoiceChannel).then(client.distube.playVoiceChannel(VoiceChannel, options.getString("name") , { textChannel: channel, member: member }))
                     ;
                    return interaction.followUp({ content: "🎵 Song Request Recieved!" });
                }
                case "volume": {
                    const Volume = options.getNumber("percentage");
                    if (Volume > 100 || Volume < 1)
                        return interaction.followUp({ content: "You need to specify a number between 1 and 100!" })

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.followUp({ content: `🔊 Volume has been set \`${Volume}%\`` });
                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if (!queue)
                        return interaction.followUp({ content: "⛔ There is no queue" });

                    switch (options.getString("options")) {
                        case "skip": {
                            await queue.skipVoiceChannel().then(interaction.followUp({ content: "⏭️ Song has been skipped!" }))
                            
                        }
                        case "stop": {
                            await queue.stopVoiceChannel().then(interaction.followUp({ content: "⏹️ Song has been stopped!" }))
                            
                        }
                        case "pause": {
                            await queue.pause().then(interaction.followUp({ content: "⏸️ Song has been paused!" }));
                            
                        }
                        case "resume": {
                            await queue.resume();
                            return interaction.followUp({ content: "▶️ Song has been resumed!" });
                        }
                        case "queue": {
                            return interaction.followUp({
                                embeds: [
                                    new Discord.MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(`${queue.songs.map(
                                            (song, id) => `\n**${id}**. ${song.name} - \`${song.formattedDuration}\``
                                        )}`)
                                ]
                            })
                        }
                            return;
                    }
                }
            }

        } catch (e) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ Alert: ${e}`)
            return interaction.followUp({ embeds: [errEmbed] })
        }

    }
}