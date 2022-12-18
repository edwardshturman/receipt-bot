// Dependencies
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';

// Commands
import debtCommand from './commands/debt.js';
import debtsCommand from './commands/debts.js';
import helpCommand from './commands/help.js';
import roadmapCommand from './commands/roadmap.js';
import tabCommand from './commands/tab.js';

// Load environment variables
if (process.env.ENV !== 'PROD')
    config();

const commands = [];
commands.push(debtCommand.data.toJSON());
commands.push(debtsCommand.data.toJSON());
commands.push(helpCommand.data.toJSON());
commands.push(roadmapCommand.data.toJSON());
commands.push(tabCommand.data.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

// Deploy slash commands
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Production environment, deploy commands globally
        if (process.env.ENV === 'PROD') {

            // Deploy global commands
            await rest.put(
                Routes.applicationCommands(process.env.CLIENTID),
                { body: commands }
            );

            // Clear guild commands
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
                { body: [] }
            );
        }

        // Development environment, deploy commands locally
        else if (process.env.ENV === 'DEV') {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
                { body: commands }
            );
        }

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
