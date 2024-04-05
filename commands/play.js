const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {GuildQueuePlayerNode, QueryType, QueueRepeatMode} = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jam')
    .setDescription('jam')
    .addSubcommand(subcommand =>
      subcommand
        .setName('jar')
        .setDescription('jammy toast')
        .addStringOption(option =>
          option
            .setName('url')
            .setDescription('link')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('jug')
        .setDescription('jammy loaf')
        .addStringOption(option =>
          option
            .setName('url')
            .setDescription('link')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('crate')
        .setDescription(`say the flavour and i'll jam it up for ya`)
        .addStringOption(option =>
          option
            .setName('keyword')
            .setDescription('text')
            .setRequired(true)
        )
    ),
  execute: async ({client, interaction}) => {
    if (!interaction.member.voice.channel)
      return interaction.reply('join vc first brew');

    const queue = await client.player.queues.create(interaction.guild, {
      leaveOnEmpty: false,
      repeatMode: QueueRepeatMode.QUEUE   // cycle
    });
    const controller = new GuildQueuePlayerNode(queue);

    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new EmbedBuilder();
    if (interaction.options.getSubcommand() == 'jar') {
      let url = interaction.options.getString('url');
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO
      });

      if (result.isEmpty())
        return interaction.reply('crummy jar of jam my friend, check the expiry date');

      const song = result.tracks[0];
      await queue.addTrack(song);

      embed
        .setDescription(`added **[${song.title}][${song.url}]** to the jam tray`)
        .setThumbnail(song.thumbnail)
        .setFooter({text: `duration: ${song.duration}`});
    } else if (interaction.options.getSubcommand() == 'jug') {
      let url = interaction.options.getString('url');
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST
      });

      if (result.isEmpty())
        return interaction.reply('putrid jug of jam there bud, check the expiry date');

      const playlist = result.playlist;
      await queue.addTrack(playlist);

      embed
        .setDescription(`added **[${playlist.title}][${playlist.url}]** to the jam tray`)
        .setThumbnail(playlist.thumbnail)
        .setFooter({text: `duration: ${playlist.duration}`});
    } else if (interaction.options.getSubcommand() == 'crate') {
      let keyword = interaction.options.getString('keyword');
      const result = await client.player.search(keyword, {
        requestedBy: interaction.user,
        fallbackSearchEngine: QueryType.YOUTUBE_SEARCH,
      });

      if (result.isEmpty())
        return interaction.reply('unjammable flavour, gimme another');

      const song = result.tracks[0];
      await queue.addTrack(song);

      embed
        .setDescription(`added **[${song.title}][${song.url}]** to the jam tray`)
        .setThumbnail(song.thumbnail)
        .setFooter({text: `duration: ${song.duration}`});
    }

      await interaction.reply ({
        embeds: [embed]
      })

      if (!queue.isPlaying())
        await controller.play();
  }
}
