const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "filter",
  aliases: ["mode"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send("There is no queue!");
    let fa = [
      "3d",
      "bassboost",
      "echo",
      "karaoke",
      "nightcore",
      "vaporwave",
      "flanger",
      "gate",
      "surround",
    ];

    const filter = args[0];

    if (filter == "off" && queue.filter.size) queue.filters.clear();
    else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter);
      else queue.filters.add(filter);
    } else if (args[0])
      return message.channel.send(
        `That is not a valid fiter!\nValid filter: \`${fa.join(", ")}\``
      );
    message.channel.send(
      `Filters in this queue: \`${queue.filters.names.join(", ")}\``
    );
  },
};

/* 
3d	string	
3d

bassboost	string	
bassboost

echo	string	
echo

karaoke	string	
karaoke

nightcore	string	
nightcore

vaporwave	string	
vaporwave

flanger	string	
flanger

gate	string	
gate

haas	string	
haas

reverse	string	
reverse

surround	string	
surround

mcompand	string	
mcompand

phaser	string	
phaser

tremolo	string	
tremolo

earwax	string	
earwax
*/
