import bugCommand from "./commands/bug.js";
import debtCommand from "./commands/debt.js";
import debtsCommand from "./commands/debts.js";
import helpCommand from "./commands/help.js";
import roadmapCommand from "./commands/roadmap.js";
import tabCommand from "./commands/tab.js";

const commands = [];
commands.push(bugCommand);
commands.push(debtCommand);
commands.push(debtsCommand);
commands.push(helpCommand);
commands.push(roadmapCommand);
commands.push(tabCommand);

export default commands;
