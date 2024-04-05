const {SlashCommandBuilder, DefaultRestOptions} = require('discord.js');
const {GuildQueuePlayerNode} = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('defrost')
    .setDescription('mmm delish defrosted jam'),
  execute: async ({client, interaction}) => {
    const queue = client.player.queues.get(interaction.guildId);
    const controller = new GuildQueuePlayerNode(queue);

    if (!queue)
      return interaction.reply('dusty jam tray')

    controller.resume();
    await interaction.reply('yummy defrosted jam at your service');
  }
}
