const {Player} = require('discord-player');
const {YouTubeExtractor} = require('@discord-player/extractor');

class MusicPlayer {
  constructor(client) {
    this.client = client;
    this.setupPlayer();
  }

  setupPlayer() {
    this.client.player = new Player(this.client, {
      ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
      }
    });
    this.client.player.extractors.register(YouTubeExtractor);
  }
}

module.exports = MusicPlayer;
