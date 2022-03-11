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
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message);

        if (args[0] === "off" && queue.filterslength) {
            queue.setFilter(false);
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("AQUA")
                    .setDescription("Turned Off all filter"),
                ],
            });
        } else if (Object.keys(client.distube.filters).includes(args[0])) {
            queue.setFilter(args[0]);
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("AQUA")
                    .setDescription(`Applied filter ${args[0]}`),
                ],
            });
        } else if (args[0])
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**${args[0]}** is not a valid filter`),
                ],
            });
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