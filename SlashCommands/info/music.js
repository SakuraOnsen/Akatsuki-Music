const Discord = require('discord.js');
const { trusted } = require('mongoose');

module.exports = {
    name: "song",
    description: "get info on a user id",
    options: [
        {
            name: "play",
            description: "Play the song of your choice!",
            type: "SUB_COMMAND",
            option: [{ name: "Song Name/URL", description: "Provide the song name or link.", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Change the volume of the song playing.",
            type: "SUB_COMMAND",
            options: [{ name: "percentage (%)", description: "10-10%", type: "NUMBER", required: true }]
        },
        {
            name: "settings",
            description: "Select a setting config option.",
            type: "SUB_COMMAND",
            options: [{
                name: "options", description: "Select an option to set.", type: "STRING", required: true,
                choices: [
                    { name: "Queue", value: "queue" },
                    { name: "Skip", value: "skip" },
                    { name: "Pause", value: "pause" },
                    { name: "Resume", value: "resume" },
                    { name: "Stop", value: "stop" },
                ]

            }]
        }
    ],
    run: async (client, interaction, args) => {

        const { options, members, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be in a voice channel to use the music commands!", ephemeral:true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `I am already playing music in <#${guidl.me.voice.channelId}>.`, ephemeral:true});

        try {

        } catch(e) {
            
        }

    }
}