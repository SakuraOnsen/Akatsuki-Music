const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shuffle",
  aliases: ["sh"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    await queue.shuffle();
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setDescription("Shuffled songs in the queue")
          .setColor("AQUA"),
      ],
    });
  },
};
