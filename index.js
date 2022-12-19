// Dependencies
import { Client, Collection, Intents } from 'discord.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';

// Commands
import debtCommand from './commands/debt.js';
import debtsCommand from './commands/debts.js';
import helpCommand from './commands/help.js';
import roadmapCommand from './commands/roadmap.js';
import tabCommand from './commands/tab.js';
import bugCommand from './commands/bug.js';

// Load environment variables
if (process.env.ENV !== 'PROD')
    config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Receipt connected to MongoDB!');
});

// Launch instance of Discord
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
    partials: ['MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER']
});

// Create collection of commands
client.commands = new Collection();

const commands = [];
commands.push(debtCommand);
commands.push(debtsCommand);
commands.push(helpCommand);
commands.push(roadmapCommand);
commands.push(tabCommand);
commands.push(bugCommand);

for (const command of commands)
    client.commands.set(command.data.name, command);

// Log launch, set status
client.once('ready', () => {
    console.log('Receipt is online!');
    client.user.setActivity('/help | v0.1.4', { type: 'LISTENING' });
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
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.includes('@here') || message.content.includes('@everyone') || message.type === 'REPLY') return;
    if (message.mentions.has(client.user.id)) {
        message.channel.send('https://c.tenor.com/Jf-_xbLhAEYAAAAC/discord-valorant.gif');
    }
});

// Login to the bot
client.login(process.env.BOT_TOKEN);
