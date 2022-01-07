const database = require(`@replit/database`);
const db = new database;
let cooldown = new Map();
const { MessageEmbed } = require('discord.js')


module.exports = async (Discord, client, message) => {
  
  if(!message.guild || message.author.bot) return;
    const prefix = 'a.';
    client.prefix = prefix

  if(new RegExp(`^<@!?${client.user.id}>$`, `gim`).test(message.content)) message.channel.send({ embeds: [
    new MessageEmbed()
    .setTitle(`Akatsuki`)
    .setDescription(`Hello ${message.author.username}.\n My prefix is: \`${client.prefix}\``)
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp(Date.now())
    .setColor('RANDOM')
  ] })
  if(message.author.bot || !message.content.startsWith(client.prefix) || !message.guild) return;

  const args = message.content.slice(client.prefix.length).split(/ +/gim);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd) || client.aliases.get(cmd);

  if(!command || command.dev == true && !client.author.includes(message.author.id)) return;

  class MsgError {
    constructor(desc) {
      this.description = desc;

      message.channel.send({ embeds:[
          new MessageEmbed()
          .setDescription(`**<a:redx:888824155817009162> ${this.description}**`)
          .setColor('RED')
      ]});
    }
  }

  class InvalidUsage {
    constructor(cd) {
      if(!client.commands.has(cd)) return console.log('INCORRECT COMMAND NAME')

      this.cd = cd;
      this.usage = client.commands.get(cd).usage;

      message.channel.send({embeds: [
        new MessageEmbed()
        .setTitle(`Invalid Usage`)
        .setDescription(`**<a:redx:888824155817009162> Invalid usage of \`${this.cd}\`!**`)
        .setFooter(`Correct usage: ${client.prefix}${this.cd} ${this.usage}`)
        .setColor('RED')
        ]}
      )
    }
  }
  
  if(command.permissions?.length && !client.author.includes(message.author.id)) {
    let perms = [];
    for(let i of command.permissions) {
      if(!Discord.Permissions.FLAGS[i]) {console.log(`Invalid Perm: ${i}`); continue;}
      if(!message.member.permissions.has(Discord.Permissions.FLAGS[i])) perms.push(i)
    }
    if(perms.length) return message.channel.send({embeds: [new Discord.MessageEmbed().setTitle('<a:redx:888824155817009162> Missing Permissions').setDescription(`Required Permission:\`${perms.join()}\``).setColor('RED')]})
  }

  if(command.bpermissions?.length) {
    let bperms = [];
    for(let b of command.bpermissions) {
      if(!Discord.Permissions.FLAGS[b]) {console.log(`Invalid Perm: ${b}`); continue;}
      if(!client.member.permissions.has(Discord.Permissions.FLAGS[b])) perms.push(b)
    }
    if(bperms.length) return message.channel.send({embeds: [new Discord.MessageEmbed().setTitle('<a:redx:888824155817009162> Missing Bot Permissions').setDescription(`Required Permission:\`${bperms.join()}\``).setColor('RED')]})
  }

    if(command.argsreq && command.argsreq !== null && !args[command.argsreq - 1]) return new InvalidUsage(command.name)

  if(command.cooldown && command.cooldown !== null && !client.author.includes(message.author.id)) {
    let date =  Date.now();
    let cooldowns = cooldown.get(message.author.id);

    if(!cooldowns) {
      cooldown.set(message.author.id, {time: date, cmds: [command.name]})
    } else if (cooldowns.cmds.includes(command.name)) {
      return new MsgError(`You're on cooldown for \`${parseInt(((cooldowns.time + (command.cooldown * 1000)) - date)/1000)}\` seconds on the command: \`${command.name}\``)
    } else if(!cooldowns.cmds.includes(command.name)) {
      cooldowns.time = date;
      cooldowns.cmds.push(command.name);
    };
    
    setTimeout(() => {
      let cooldownarray = cooldown.get(message.author.id).cmds;
      cooldownfilter = cooldownarray.filter(e => e !== command.name);

      cooldown.get(message.author.id).cmds = cooldownfilter
    }, command.cooldown * 1000);
  }
  command.execute(Discord, client, message, args, InvalidUsage, MsgError);
}