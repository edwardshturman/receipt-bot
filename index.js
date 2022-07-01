// Dependencies
require('discord.js');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DBCONNECTION, () => {
    console.log('Receipt connected to MongoDB!');
});

// Launch instance of Discord
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
    partials: ['MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER']
});

// Create collection of commands
client.commands = new Collection();

// Check for correct file type (JavaScript) and require command files when running given command
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Log launch, set status
client.once('ready', () => {
    console.log('Receipt is online!');
    client.user.setActivity('/help | v0.1.1', { type: 'LISTENING' });
});

// Listens for new servers, might do something with this later
client.on('guildCreate', (guild) => {
    console.log(`Joined a new server: ${guild.id}`);
});

// Interaction listener for slash commands
client.on('interactionCreate', async interaction => {
    // console.log(interaction);

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

// Reply to being pinged with GIF
client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type === "REPLY") return;
    if (message.mentions.has(client.user.id)) {
        message.channel.send("https://c.tenor.com/Jf-_xbLhAEYAAAAC/discord-valorant.gif");
    }
});

// Login to the bot
client.login(process.env.TOKEN);
