# Receipt

> 🧾 A Discord bot to simplify expense sharing and tracking with friends 🌟

[![GitHub last commit](https://img.shields.io/github/last-commit/edwardshturman/receipt-bot)](https://github.com/edwardshturman/receipt-bot/commits/master)

---

![Receipt logo](assets/receipt-logo.png)

---

## On the Future of Receipt

> ℹ️ Hey there, thanks for checking out Receipt! This was a Discord bot I made for my group of friends after our high school graduation in May 2021. In our trip planning channel, where we use [Register](https://github.com/edwardshturman/register-bot) and [Rollup](https://github.com/edwardshturman/rollup-bot), even with our event planning and thread control needs met, we'd find ourselves sending a lot of messages related to expenses, making it tedious to track who owes who, for what. Receipt was the solution.
>
> 💡 I've learned a lot since first writing Receipt in Summer 2022. I've also since made a couple [other](https://github.com/edwardshturman/register-bot) [bots](https://github.com/edwardshturman/rollup-bot) for the same group of friends. Maintaining these bots, which were updated once every couple months or so, soon became unsustainable as I found myself repeating changes for what felt like multiple isolated projects, rather than a collection of bots.
>
> 🏗️ So, I made it a collection of bots — enter [**Realm**](https://github.com/compsigh/realm). Written in TypeScript, built open-source, and hopefully becoming as good of a learning resource as a bot, Realm will be *the* toolbox for building communities on Discord.
>
> 💚 Maintenance on this repo — as well as the other bots linked above — is discontinued, but they will be reborn in Realm (if they haven't already been!). I'm proud of Receipt, and if you used it, I hope it brought you and your friends joy in simplifying your expense tracking. Stay tuned for Realm, and feel free to drop by the [Discord](https://discord.realm.so) and chat — I'd love to hear from you!

## Features

- 👥 Conveniently automate group debts using **Tabs**, roles created and given to those you specify
  - `/tab add [tab name] [first person other than you] [second person other than you] [optional: continue adding...]`
  - `/tab close [tab name]`
- 🧾 Add and resolve **Debts** as a group or 1:1 between each other
  - `/debt add [ping who owes you; can be a tab or server member] [debt name] [amount] [optional: description]`
  - `/debt resolve [ping who owed you] [debt name]`
- 💵 List Debts you owe or those owed to you
  - `/debts [owe/owed]`

## Usage/Examples

Use Receipt:

- To keep track of who owes who between friends
- To easily split an expense by cost amongst multiple people

## Privacy

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

## Permissions

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

## Tech Stack

- **Node.js**
- **Discord.js**: core library for interacting with the Discord API
- **Heroku**: deployment
- **MongoDB**: storage

## About Me

I'm Edward, and I'm a design-engineer, Internet painter, and computer science major at the University of San Francisco.

See more of my work and say hello over on [my website](https://edward.so).
