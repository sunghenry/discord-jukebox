const {SlashCommandBuilder} = require('discord.js');
const {GuildQueuePlayerNode} = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('freeze')
    .setDescription(`this jam is umai tasty, let us save the rest for later`),
  execute: async ({client, interaction}) => {
    const queue = client.player.queues.get(interaction.guildId);
    const controller = new GuildQueuePlayerNode(queue);

    if (!queue)
      return interaction.reply('dusty jam tray')

    controller.pause();
    await interaction.reply(`you're too late batman, mr freeze took care of the jam`);
  }
}
