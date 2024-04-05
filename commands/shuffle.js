const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('souffle')
    .setDescription('jumble jam'),
  execute: async ({client, interaction}) => {
    const queue = client.player.queues.get(interaction.guildId);

    if (!queue)
      return interaction.reply('dusty jam tray')

    if (queue.isShuffling)
      return interaction.reply('one souffle at a time ye fat boi')

    queue.enableShuffle(true)
    await interaction.reply('bon appetit, puffy jammy souffle');
  }
}
