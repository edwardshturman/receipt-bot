const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roadmap')
        .setDescription('Check the Receipt bot roadmap'),

    async execute (interaction) {
        // Dependencies
        const Discord = require('discord.js');
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

        // Fetch issues from the GitHub repository
        const issues = await fetch('https://api.github.com/repos/edwardshturman/receipt-bot/issues?state=open').then(response => response.json());

        // Create an embed for each issue
        const embeds = [];
        for (const issue of issues) {
            const embed = new Discord.MessageEmbed()
                .setColor('#a7fbff')
                .setTitle(issue.title)
                .setURL(issue.html_url)
                .setDescription(issue.body)
                .setFooter(`${issue.labels.map(label => label.name).join(' // ')}`);
            embeds.push(embed);
        }

        // Send the embeds
        await interaction.reply({ embeds: embeds, ephemeral: true });
    }
};
