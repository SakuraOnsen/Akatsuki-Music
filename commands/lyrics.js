const lyrics = require("lyrics-finder");
const yt = require("yt-search");
const Discord = require("discord.js");

module.exports = {
  name: "lyrics",
  description: "Searches song lyrics from Google",
  run: async (client, message, args) => {
    if (!args.length) return message.channel.send("No song specified");

    let embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL()
      ); // Constructing the embed
    let lyric = await lyrics(args.join(" "));
    let noLyric = 0;

    if (!lyric) {
      lyric = `No Lyrics found for ${args.join(" ")}`;
      noLyric++;
    }

    embed.setDescription(
      lyric.length >= 4093 ? lyric.substring(0, 4093) + "..." : lyric
    );

    if (noLyric == 0) {
      let res = await yt.search(args.join(" "));
      let song = res.videos[0];
      if (song)
        embed.setTitle(song.title).setURL(song.url).setThumbnail(song.image);
    }

    message.channel.send({ embeds: [embed] });
  },
};
