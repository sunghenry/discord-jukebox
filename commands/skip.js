const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {GuildQueuePlayerNode} = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jump')
    .setDescription('uno skip'),
  execute: async ({client, interaction}) => {
    const queue = client.player.queues.get(interaction.guildId);
    const controller = new GuildQueuePlayerNode(queue);

    if (!queue)
      return interaction.reply('dusty jam tray')

    const currentSong = queue.currentTrack;
    controller.skip();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`jumped **${currentSong.title}**`)
          .setThumbnail(currentSong.thumbnail)
      ]
    })
  }
}
