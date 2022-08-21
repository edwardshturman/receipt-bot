# Receipt

> 🧾 A Discord bot to simplify expense sharing and tracking with friends 🌟

[![Dependency status](https://david-dm.org/edwardshturman/receipt-bot.svg)](https://david-dm.org/edwardshturman/receipt-bot)
[![GitHub last commit](https://img.shields.io/github/last-commit/edwardshturman/receipt-bot)](https://github.com/edwardshturman/receipt-bot/commits/master)

---

![Receipt logo](assets/receipt-logo.png)

---

## Invite Link

→ [Add me](https://discord.com/api/oauth2/authorize?client_id=990391036545237092&permissions=380373552192&scope=bot%20applications.commands) to your server!

## Features

- Conveniently automate group debts using **Tabs**, roles created and given to those you specify 👥
  - `/tab add [tab name] [first person other than you] [second person other than you] [optional: continue adding...]`
  - `/tab close [tab name]`
- Add and resolve **Debts** as a group or 1:1 between each other 🧾
  - `/debt add [ping who owes you; can be a tab or server member] [debt name] [amount] [optional: description]`
  - `/debt resolve [ping who owed you] [debt name]`
- List Debts you owe or those owed to you 💵
  - `/debts [owe/owed]`

## Usage/Examples

Use Receipt:

- To keep track of who owes who between friends
- To easily split an expense by cost amongst multiple people

## Roadmap

For upcoming features, check out the [Issues](https://github.com/edwardshturman/receipt-bot/issues) tab!

## Demo

*Coming soon!*

## FAQ

#### So how about privacy — how does Receipt handle data?

Receipt stores and automatically deletes (upon resolving a Debt, or closing a Tab) the following:
- For Debts:
  - The name you give it;
  - The Discord user ID of who created it (the "creditor");
  - The Discord user or role ID who owes the creditor (the "debtor");
  - The description of the Debt, if given;
  - The amount owed; and
  - The timestamp at creation.
- For Tabs:
  - The name you give it;
  - The Discord role ID associated with it; and
  - The Discord user IDs of members who you add to the Tab.

#### What're all these permissions Receipt is requesting access to?

Here's a breakdown of what Receipt requests access to and why:

> **The self-explanatory stuff:**

- View Channels
- Send Messages
- Send Messages in Threads
- Create Public Threads
- Create Private Threads
- Embed Links
- Attach Files
- Read Message History
- Mention Everyone
- Use External Emojis
- Add Reactions
- Use Slash Commands

> **More sensitive access, and why Receipt needs it:**

- Manage Roles: for creating roles associated with Tabs

## Support

> Once you've added the bot to your server, run `/receipt help`.

The bot is still very new, and I'm working to resolve bugs I find in the servers I'm in. For any issues you encounter, feel free to [submit an issue](https://github.com/edwardshturman/receipt-bot/issues).

## Tech Stack

- **Node.js**
- **Discord.js**: core library for interacting with the Discord API
- **Heroku**: deployment
- **MongoDB**: storage

## Contributions

This is primarily a personal project for me and my friends, which I decided to share here publicly. For the time being, I don't have an open-source license set for Receipt, and as such, must politely decline contributions.

Feel free to look around, but please refrain from copying, modifying, or distributing Receipt source code without my explicit permission. Thank you!

# 🚀 About Me

👋 Hi there! I'm Edward, and I'm a Computer Science Major at the University of San Francisco. 💻

Receipt is a Discord bot I made for my group of friends and our Discord server. In our trip planning channel (where we use [Register](https://github.com/edwardshturman/register-bot) and [Rollup](https://github.com/edwardshturman/rollup-bot) — plugging my other bots ;)), even with the great thread control Rollup provides, we'd find ourselves sending a lot of messages related to expenses, making it pretty annoying to track who owes who, for what.

Seeing as even the platforms we use to pay each other like Venmo don't have what we needed, here's my fix! I'll be updating it regularly for now. Hope you enjoy!

## 🔗 See more of my work and say hello

[![portfolio](https://img.shields.io/badge/portfolio-000?style=for-the-badge&logo=notion&logoColor=white)](https://edwardshturman.com)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/edwardshturman)

[![twitter](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/edwardshturman)
