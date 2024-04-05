const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('soberup')
    .setDescription('chrono jam'),
  execute: async ({client, interaction}) => {
    const queue = client.player.queues.get(interaction.guildId);

    if (!queue)
      return interaction.reply('dusty jam tray')

    if (!queue.isShuffling)
      return interaction.reply('already sober as bowser')

    queue.disableShuffle();
    await interaction.reply('no more booze ye kangaroo');
  }
}
