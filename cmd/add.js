const trello = require('./trello.js');

module.exports = {
  command: ":trello:ADD",
  describe: "Adds a card to the Trello board",
  builder: (yargs) => {
    yargs.option("t", {
      alias: "title",
      describe: "Title of the Trello card",
      type: "string",
      demandOption: true,
    });
    yargs.option("d", {
      alias: "description",
      describe: "Description of the Trello card",
      type: "string",
      demandOption: true,
    });
  },
  handler: async ({ title, description }, { say }) => {
    try {
      await trello.addCard(title, description, "640ba599d219c4002fcf3117");
      await say(`Card entitled "${title}" created`);
    } catch (error) {
      console.error("Could not add card:", error);
      await say("Could not add card.");
    }
  },
};
