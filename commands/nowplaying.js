const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "playing",
  aliases: ["np"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send("There is no queue!");

    const song = await queue.songs[0];
    await message.channel.send(
      `Now Playing: \`${song.name} (${song.formattedDuration}). Played by: ${song.user}\``
    );
  },
};
