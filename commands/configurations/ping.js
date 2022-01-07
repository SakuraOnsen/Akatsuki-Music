module.exports = {
  name: 'ping',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: null,
  description: 'Ping',
  category: 'configurations',
  dev: false,

  execute: async (Discord, client, message, args, InvalidUsage, MsgError) => {

    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setAuthor('Pong', client.user.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`\`\`\`apache\nLatency_Ping: ${client.ws.ping}ms\nGateway_Ping: ${Date.now() - message.createdTimestamp}ms\`\`\``)
          .setTimestamp(Date.now())
      ]
    })
  }
}