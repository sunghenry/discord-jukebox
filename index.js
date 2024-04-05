// load environment variables (token and client id)
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const {Client, Collection, GatewayIntentBits, REST, Routes} = require('discord.js');
const MusicPlayer = require('./src/musicPlayer');
const messageHandler = require('./src/messageHandler');

// initialise discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

// handle incoming messages
client.on('messageCreate', (message) => {
  messageHandler(client, message);
});

// initialise music player instance
const musicPlayer = new MusicPlayer(client);

// load commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// register commands
client.on('ready', () => {
  console.log(`${client.user.tag} online`);

  // initialise rest api client
  const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

  // register commands for all servers
  const guildIds = client.guilds.cache.map(guild => guild.id);
  console.log('registered commands for the following servers:');

  for (const guildId of guildIds) {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, guildId), {
      body: commands
    })
    .then(() => console.log(`${guildId}`))
    .catch(console.error);
  }
});

// handle incoming interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  // execute corresponding command
  try {
    await command.execute({client, interaction});
  } catch (err) {
    console.error(err);
    await interaction.reply('encountered error while executing command');
  }
});

// login to discord
client.login(process.env.TOKEN);
