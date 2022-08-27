const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send("There is no queue!");

    let n = args[0];
    if (!n) return message.reply("Please provide the song number to skip to!");

    n = Number(n);
    if (isNaN(n)) return message.reply("Please enter a valid number");

    await client.distub.jump(message, num).then((song) => {
      message.channel.send(`Skipped to \`${song.name}\``);
    });
  },
};
