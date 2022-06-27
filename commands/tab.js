const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Cost = require("../schemas/cost-schema");

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
                    .setDescription('Start a tab to add debts to')
                    .addStringOption(name =>
                        name
                            .setName('name')
                            .setDescription('A brief, unique name to identify the tab by; e.g. "Summer 2022 Tahoe trip"')
                            .setRequired(true)))

        // Tab join subcommand
        .addSubcommand(joinSubcommand =>
            joinSubcommand
                .setName('join')
                .setDescription('Join a tab')
                .addStringOption(name =>
                    name
                        .setName('name')
                        .setDescription('The brief, unique name of the tab')
                        .setRequired(true)))

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

