const messageHandler = (client, msg) => {
  const msgLower = msg.content.toLowerCase();

  // test
  if (msg.content == 'ping')
    msg.reply('pong');

  // mention
  if (msg.mentions.has(client.user))
    msg.reply(msg.author.toString());

  // uwu
  if (!msg.author.bot && msgLower.includes('uwu'))
    msg.reply('uwu');

  // general greeting
  const greetsEN = ['hello', 'hi', 'hey', 'yo', 'sup', 'yala'];
  const greetsKR = ['헬로우', '하이', '안녕', '안뇽'];
  if (!msg.author.bot && greetsEN.some(greeting => msgLower.includes(greeting))) {
    const reply = greetsEN[Math.floor(Math.random() * greetsEN.length)];
    msg.reply(reply);
  } else if (!msg.author.bot && greetsKR.some(greeting => msg.content.includes(greeting))) {
    const reply = greetsKR[Math.floor(Math.random() * greetsKR.length)];
    msg.reply(reply);
  }

  // time-based greeting
  const morning = ['mornin', 'morning'];
  const afternoon = ['afternoon', 'arvo'];
  const night = ['good night', 'nighty night', 'gngn'];
  if (!msg.author.bot && morning.some(greeting => msgLower.includes(greeting))) {
    const reply = morning[Math.floor(Math.random() * morning.length)];
    msg.reply(reply);
  } else if (!msg.author.bot && afternoon.some(greeting => msgLower.includes(greeting))) {
    const reply = 'good avocado';
    msg.reply(reply);
  } else if (!msg.author.bot && night.some(greeting => msgLower.includes(greeting))) {
    const reply = 'good night';
    msg.reply(reply);
  }

  // farewell
  const bye = ['bye', 'cya'];
  if (!msg.author.bot && bye.some(farewell => msgLower.includes(farewell))) {
    const reply = bye[Math.floor(Math.random() * bye.length)];
    msg.reply(reply);
  }

  // laughing reaction
  const triggers = ['에궁', '굿굿', '모냥', '뭐랭', '찌부', '욜', '보잉', '냥'];
  const max = 5;
  const min = 2;
  if (!msg.author.bot && triggers.some(trigger => msg.content.includes(trigger))) {
    const reply = 'ㅋ'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
    msg.reply(reply);
  }
}

module.exports = messageHandler;
