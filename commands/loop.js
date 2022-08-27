const { MessageEmbed } = require("discord.js");
const { webhookClient } = require("../index");

module.exports = {
  name: "loop",
  aliases: ["repeat"],
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

      let repeatmode = null;
      let loopmode = null;
      switch (args[0]) {
        case "off": {
          loopmode = 0;
          repeatmode = "Off";
          break;
        }
        case "song": {
          loopmode = 1;
          repeatmode = "Repeat Song";
          break;
        }
        case "queue": {
          loopmode = 2;
          repeatmode = "Repeat Queue";
          break;
        }
      }

      await queue.setRepeatMode(loopmode);
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`Set loop mode to: \`${repeatmode}\``),
        ],
      });
    } catch (e) {
      const errEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${e}`);

      webhookClient.send({
        content: "Error",
        username: "Akatuki Music",
        avatarURL:
          "https://images-ext-1.discordapp.net/external/RluYBkBAf4G7C2L8nzHoXGwC70iFfVOxrrsfdZXOrrk/%3Fsize%3D256/https/cdn.discordapp.com/avatars/928941386441564211/74aac125f520e94357317db44bfcccd2.png",
        embeds: [errEmbed],
      });
    }
  },
};
