const { MessageEmbed } = require("discord.js");
const { webhookClient } = require("../index");

module.exports = {
  name: "pause",
  aliases: null,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if (!VoiceChannel)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              "You need to be in a voice channel to use music commands!"
            ),
        ],
      });

    if (
      message.guild.me.voice.channelId &&
      VoiceChannel.id !== message.guild.me.voice.channelId
    )
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription("I am already playing in another channel!"),
        ],
      });

    try {
      const queue = client.distube.getQueue(message);

      if (queue.paused)
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor("AQUA")
              .setDescription("Song is already paused!"),
          ],
        });

      await queue.pause(message);
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("AQUA")
            .setDescription("⏸️ Song has been paused!"),
        ],
      });
    } catch (e) {
      const errEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${e.message}`);
    }
  },
};
