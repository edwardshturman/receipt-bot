const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()

        // Tab command
        .setName('tab')
        .setDescription('Start or close a tab')
        .addSubcommand(helpSubcommand =>
            helpSubcommand
                .setName('help')
                .setDescription('Display tab command help'))

        // Tab add subcommand
        .addSubcommand(addSubcommand =>
                addSubcommand
                    .setName('add')
                    .setDescription('Start a tab to add debts to — minimum of two people other than you')
                    .addStringOption(name =>
                        name
                            .setName('name')
                            .setDescription('A brief, unique name to identify the tab by; e.g. "Summer 2022 Tahoe trip"')
                            .setRequired(true))
                    .addUserOption(user1 =>
                        user1
                            .setName('user1')
                            .setDescription('The first person, other than you, to share the cost')
                            .setRequired(true))
                    .addUserOption(user2 =>
                        user2
                            .setName('user2')
                            .setDescription('The second person, other than you, to share the cost')
                            .setRequired(true))
                    .addUserOption(user3 =>
                        user3
                            .setName('user3')
                            .setDescription('The third person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user4 =>
                        user4
                            .setName('user4')
                            .setDescription('The fourth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user5 =>
                        user5
                            .setName('user5')
                            .setDescription('The fifth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user6 =>
                        user6
                            .setName('user6')
                            .setDescription('The sixth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user7 =>
                        user7
                            .setName('user7')
                            .setDescription('The seventh person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user8 =>
                        user8
                            .setName('user8')
                            .setDescription('The eighth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user9 =>
                        user9
                            .setName('user9')
                            .setDescription('The ninth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user10 =>
                        user10
                            .setName('user10')
                            .setDescription('The tenth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user11 =>
                        user11
                            .setName('user11')
                            .setDescription('The eleventh person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user12 =>
                        user12
                            .setName('user12')
                            .setDescription('The twelfth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user13 =>
                        user13
                            .setName('user13')
                            .setDescription('The thirteenth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user14 =>
                        user14
                            .setName('user14')
                            .setDescription('The fourteenth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user15 =>
                        user15
                            .setName('user15')
                            .setDescription('The fifteenth person, other than you, to share the cost')
                            .setRequired(false))
                    .addUserOption(user16 =>
                        user16
                            .setName('user16')
                            .setDescription('The sixteenth person, other than you, to share the cost')
                            .setRequired(false)))

        // Tab close subcommand
        .addSubcommand(closeSubcommand =>
            closeSubcommand
                .setName('close')
                .setDescription('Close a tab')
                .addStringOption(name =>
                    name
                        .setName('name')
                        .setDescription('The brief, unique name you identified the tab by')
                        .setRequired(true))),

    async execute (interaction) {
        // Dependencies
        const Discord = require('discord.js');

        // On /tab help, display tab command help
        if (interaction.options.getSubcommand() === 'help') {
            const tabHelpEmbed = new Discord.MessageEmbed()
                .setColor('#a7fbff')
                .setTitle('Tab command')
                .setDescription('Used to add and resolve debts as a group by creating a role that deletes itself once all debts are paid')
                .addField('add', 'Add a tab and create the associated role\n\`/tab add [tab name] [first person other than you] [second person other than you] [optional: continue adding...]\`', false)
                .addField('close', 'Close a tab — note: debts must be marked as paid unless \`allow-force-resolve\` is set to \`true\` using \`/config\`\n\`/tab close [tab name]\`', false);
            await interaction.reply({ embeds: [tabHelpEmbed] });

        // Execute /tab add
        } else if (interaction.options.getSubcommand() === 'add') {

            // Dependencies
            const Discord = require('discord.js');
            require('mongoose');
            const Tab = require('../schemas/tab-schema');

            // Search for an existing tab and return if it exists
            Tab.findOne({ name: interaction.options.getString('name') }).then((tabExists) => {
                if (tabExists) return interaction.reply({ content: 'This tab already exists! Please use a unique tab name.', ephemeral: true });
            });

            // Create the tab's associated role
            const newTabRole = await interaction.guild.roles.create({ name: '[Tab] ' + interaction.options.getString('name') });

            // Add creditor and mentioned users to tab's role
            let tabMembers = [];
            tabMembers.push(interaction.member.id);
            interaction.member.roles.add(newTabRole);
            for (const option of interaction.options.data[0].options) {
                if (option.type !== 'USER') continue; // Ignore tab name field
                if (option.value === interaction.member.id) continue; // Ignore self-mentions
                if (tabMembers.includes(option.value)) continue; // Avoid acting on a mention more than once
                const tabMember = option.member;
                tabMember.roles.add(newTabRole);
                tabMembers.push(tabMember.user.id);
            }

            // Create a new tab entry using the tab name, creditor ID, associated role ID, and the array of members
            new Tab({
                name: interaction.options.getString('name'),
                creditorId: interaction.member.id,
                roleId: newTabRole.id,
                members: tabMembers
            }).save().then((newTabEntry) => {

                // Create newTabEmbed using the tab name, creditor, role, and members
                const newTabEmbed = new Discord.MessageEmbed()
                    .setColor('#a7fbff')
                    .setTitle('New tab: ' + newTabEntry.name)
                    .addField('Created by:', '<@' + newTabEntry.creditorId + '>', false)
                    .addField('New role:', '<@&' + newTabEntry.roleId + '>', false);
                let membersString = '';
                for (const member of tabMembers) membersString += '<@' + member + '> ';
                newTabEmbed.addField('People:', membersString, false);

                // Send newTabEmbed
                interaction.reply({ embeds: [newTabEmbed] });
            });

        // Execute /tab close
        } else if (interaction.options.getSubcommand() === 'close') {

            // Dependencies
            require('mongoose');
            const Tab = require('../schemas/tab-schema');

            // Search for the specified tab and ignore if it doesn't exist
            const tab = await Tab.findOne({ creditorId: interaction.member.id, name: interaction.options.getString('name') });
            if (!tab) return interaction.reply({ content: 'Sorry, this tab doesn\'t exist!', ephemeral: true });

            // Delete the tab's associated role, then the tab entry
            interaction.guild.roles.delete(tab.roleId);
            await Tab.deleteOne({ creditorId: interaction.member.id, name: interaction.options.getString('name') });
            await interaction.reply({ content: 'The tab for ' + interaction.options.getString('name') + ' has been closed!'});
        }
    }
};
