const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1170948236769493052')
    .setType('STREAMING')
    .setURL('https://twitch.tv/developer') //Must be a youtube video link 
    .setState('お願い！ﾀﾋんでくれ')
    .setName('maso')
    .setDetails(`།𓎟𓎟𓎟†𓎟𓎟𓎟།`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1011444419838353429/1198449882822885467/33C636B2-9B0C-4B41-BB68-8C4DF0F6B7A9_8.gif?ex=65bef26e&is=65ac7d6e&hm=1c56b2eaee6dc1e987267f95e5de06549857c58c89e5372e12fbe059d64804f9&') //You can put links in tenor or discord and etc.
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1011444419838353429/1198449882428625017/IMG_5774.gif?ex=65bef26e&is=65ac7d6e&hm=5f2ab6e0ea470cc7beb597f5363717c581c8ef43279d832356349f9e31e890b7&')
    .setAssetsLargeText('なりたい　なれない') //Text when you hover the Large image
    .addButton('♡', 'https://rentry.co/')

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `།𓎟𓎟𓎟†𓎟𓎟𓎟།`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
