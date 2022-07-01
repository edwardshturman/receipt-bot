const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()

        // Debts command
        .setName('debts')
        .setDescription('Check your debts')
        .addStringOption(type =>
            type
                .setName('type')
                .setDescription('Choose to show debts you owe or owed to you')
                .addChoices(
                    { name: 'owe', value: 'owe' },
                    { name: 'owed', value: 'owed' })
                .setRequired(true)),

    async execute (interaction) {
        const type = interaction.options.getString('type');
        if (type === 'owe') {
            // Dependencies
            const Discord = require('discord.js');
            require('mongoose');
            const Debt = require('../schemas/debt-schema');

            // For each debt where the sender is a debtor, add to the debts array
            const debts = await Debt.find({ debtorId: interaction.member.id });
            if (debts.length < 1) return interaction.reply({ content: 'You don\'t have any pending debts you owe.', ephemeral: true });

            // Display debts debtor owes
            const debtsEmbed = new Discord.MessageEmbed()
                .setColor('#a7fbff')
                .setTitle('Debts you owe');
            debts.forEach(debt => debtsEmbed.addField('• ' + debt.name, '$' + debt.amount + ' to ' + '<@' + debt.creditorId + '>', false));
            interaction.reply({ embeds: [debtsEmbed], ephemeral: true });

        } else if (type === 'owed') {
            // Dependencies
            const Discord = require('discord.js');
            require('mongoose');
            const Debt = require('../schemas/debt-schema');

            // For each debt where the sender is a creditor, add to the debts array
            const debts = await Debt.find({ creditorId: interaction.member.id });
            if (debts.length < 1) return interaction.reply({ content: 'You don\'t have any pending debts you\'re owed.', ephemeral: true });

            // Display debts creditor is owed
            const debtsEmbed = new Discord.MessageEmbed()
                .setColor('#a7fbff')
                .setTitle('Debts you\'re owed');
            debts.forEach(debt => debtsEmbed.addField('• ' + debt.name, '$' + debt.amount + ' from ' + '<@' + debt.debtorId + '>', false));
            interaction.reply({ embeds: [debtsEmbed], ephemeral: true });
        }
    }
};
