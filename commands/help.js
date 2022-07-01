const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()

        // Help command
        .setName('help')
        .setDescription('List Tahoe Bot commands'),

    async execute (interaction) {
        // Dependencies
        const Discord = require('discord.js');

        // On /help, display help embed
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#a7fbff')
            .setTitle('Tahoe Bot')
            .setDescription('To help log all Tahoe expenses, Tahoe Bot can be used to add and resolve debts as a group using tabs or 1:1 between each other')
            .addField('\`/tab\`', 'Creates a temporary role with the people mentioned. Can be deleted when all debts are marked as paid.\n\`/tab help\` for more info', false)
            .addField('\`/debt\`', 'Log and track an expense with a tab or server member.\n\`/debt help\` for more info', false)
            .addField('\`/debts\`', 'List debts you owe or those owed to you.\n\`/debts [owe/owed]\`', false);
        await interaction.reply({ embeds: [helpEmbed] });
    }
};
