import { SlashCommandBuilder } from '@discordjs/builders';
import * as Discord from 'discord.js';
import Debt from '../schemas/debt-schema.js';

const debtCommand = {
    data: new SlashCommandBuilder()

        // Debt command
        .setName('debt')
        .setDescription('Add or resolve a debt')
        .addSubcommand(
            helpSubcommand => helpSubcommand
                .setName('help')
                .setDescription('Display debt command help'))

        // Add subcommand
        .addSubcommand(
            addSubcommand => addSubcommand
                .setName('add')
                .setDescription('Add a debt')
                .addMentionableOption(
                    debtor => debtor
                        .setName('debtor')
                        .setDescription('Who owes you? Can be a tab or server member')
                        .setRequired(true))
                .addStringOption(
                    name => name
                        .setName('name')
                        .setDescription('A brief, unique note to identify the debt by; e.g. "Tuesday 6/28 Dinner"')
                        .setRequired(true))
                .addNumberOption(
                    amount => amount
                        .setName('amount')
                        .setDescription('The cost of the debt')
                        .setMinValue(1)
                        .setMaxValue(5000)
                        .setRequired(true))
                .addStringOption(
                    description => description
                        .setName('description')
                        .setDescription('A longer description, if necessary, to specify the date or other notes')
                        .setRequired(false)))

        // Resolve subcommand
        .addSubcommand(
            resolveSubcommand => resolveSubcommand
                .setName('resolve')
                .setDescription('Mark a debt as paid')
                .addMentionableOption(
                    debtor => debtor
                        .setName('debtor')
                        .setDescription('Who was it that owed you?')
                        .setRequired(true))
                .addStringOption(
                    name => name
                        .setName('name')
                        .setDescription('The brief, unique note you identified the debt by')
                        .setRequired(true))),

    async execute (interaction) {

        // On /debt help, display debt command help
        if (interaction.options.getSubcommand() === 'help') {
            const debtHelpEmbed = new Discord.MessageEmbed()
                .setColor('#a7fbff')
                .setTitle('Debt command')
                .setDescription('Used to add and resolve debts as a group using tabs or 1:1 between each other')
                .setFields([
                    { name: 'add', value: '`/debt add [ping who owes you; can be a tab or server member] [debt name] [amount] [optional: description]`', inline: false },
                    { name: 'resolve', value: '`/debt resolve [ping who owed you] [debt name]`', inline: false }
                ]);
            await interaction.reply({ embeds: [debtHelpEmbed], ephemeral: true });
        }

        // Execute /debt add
        else if (interaction.options.getSubcommand() === 'add') {

            // Search for an existing debt between the creditor and debtor and return if it exists
            await Debt.findOne({
                creditorId: interaction.member.id,
                debtorId: interaction.options.getMentionable('debtor').id,
                name: interaction.options.getString('name') })
            .then(debtExists => {
                if (debtExists)
                    return interaction.reply({ content: 'This debt already exists! Please use a unique debt name.', ephemeral: true });
            });

            // Create newDebtEmbed using the debt debtor, name, description if it exists, and amount
            const newDebtEmbed = new Discord.MessageEmbed()
                .setColor('#a7fbff')
                .setTitle('You added a debt: ' + interaction.options.getString('name'))
                .setFields([
                    { name: 'Sent to:', value: interaction.options.getMentionable('debtor').toString(), inline: false },
                    { name: 'Amount:', value: '$' + interaction.options.getNumber('amount').toString(), inline: false }
                ]);

            // If debtor ID references a tab, for each member in the role, create a debt with the member as a debtor, with the amount being the total cost divided by the amount of members in the role
            const type = interaction.options.getMentionable('debtor').user ? 'user' : 'role';
            if (type === 'role') {
                await interaction.guild.members.fetch();
                const tabRole = interaction.guild.roles.cache.get(interaction.options.getMentionable('debtor').id);
                const tabRoleMemberIds = tabRole.members.map(member => member.user.id);
                for (const memberId of tabRoleMemberIds) {
                    if (memberId === interaction.member.id) continue; // Ignore self-debts
                    // Create a new debt entry using the debt creditor ID, debtor ID, name, description if it exists, and per-person amount
                    await new Debt({
                        creditorId: interaction.member.id,
                        debtorId: memberId,
                        name: interaction.options.getString('name'),
                        description: interaction.options.getString('description'),
                        amount: Math.round(100 * (interaction.options.getNumber('amount') / tabRoleMemberIds.length)) / 100
                    }).save();
                }

                // Send newDebtEmbed to creditor, ping debtor
                interaction.reply({ embeds: [newDebtEmbed], ephemeral: true });
                interaction.channel.send(interaction.options.getMentionable('debtor').toString() + ', a new debt has been added for you.');

            } else if (type === 'user') {
                // Create a new debt entry using the debt creditor ID, debtor ID, name, description if it exists, and amount
                await new Debt({
                    creditorId: interaction.member.id,
                    debtorId: interaction.options.getMentionable('debtor').id,
                    name: interaction.options.getString('name'),
                    description: interaction.options.getString('description'),
                    amount: interaction.options.getNumber('amount')
                }).save();

                // Send newDebtEmbed to creditor, ping debtor
                interaction.reply({ embeds: [newDebtEmbed], ephemeral: true });
                interaction.channel.send(interaction.options.getMentionable('debtor').toString() + ', a new debt has been added for you.');
            }
        }

        // Execute /debt resolve
        else if (interaction.options.getSubcommand() === 'resolve') {

            // Search for the specified debt between the creditor and debtor and return if it doesn't exist
            const debtExists = await Debt.findOne({
                creditorId: interaction.member.id,
                debtorId: interaction.options.getMentionable('debtor').id,
                name: interaction.options.getString('name')});
            if (!debtExists)
                return interaction.reply({ content: 'Sorry, this debt doesn\'t exist!', ephemeral: true });

            await Debt.deleteOne({
                creditorId: interaction.member.id,
                debtorId: interaction.options.getMentionable('debtor').id,
                name: interaction.options.getString('name')});
            await interaction.reply({ content: 'The debt with ' + interaction.options.getMentionable('debtor').toString() + ' for ' + interaction.options.getString('name') + ' has been marked as paid!', ephemeral: true });
        }
    }
};

export default debtCommand;
