import { SlashCommandBuilder } from '@discordjs/builders';
import * as Discord from 'discord.js';

const helpCommand = {
    data: new SlashCommandBuilder()

        // Help command
        .setName('help')
        .setDescription('List Receipt commands'),

    async execute (interaction) {

        // On /help, display help embed
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#a7fbff')
            .setTitle('Receipt')
            .setDescription('Receipt can be used to add and resolve debts as a group using tabs or 1:1 between each other')
            .setFields([
                { name: '\`/tab\`', value: 'Creates a temporary role with the people mentioned. Can be deleted when all debts are marked as paid.\n\`/tab help\` for more info', inline: false },
                { name: '\`/debt\`', value: 'Log and track an expense with a tab or server member.\n\`/debt help\` for more info', inline: false },
                { name: '\`/debts\`', value: 'List debts you owe or those owed to you.\n\`/debts [owe/owed]\`', inline: false },
                { name: '\`/roadmap\`', value: 'View planned features for Receipt', inline: false }
            ]);
        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    }
};

export default helpCommand;
