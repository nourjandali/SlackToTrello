const trello = require('./trello.js');

module.exports = {
  command: ":trello:REMOVE",
  describe: "Removes a card from the Trello board by title",
  builder: (yargs) => {
    yargs.option("t", {
      alias: "title",
      describe: "Title of the Trello card",
      type: "string",
      demandOption: true,
    });
  },
  handler: async (argv, { say }) => {
    try {
      const { title } = argv;
      const cards = await trello.getCardsOnBoard("640ba599d219c4002fcf3117");
      const card = cards.find((c) => c.name.toLowerCase() === title.toLowerCase());
      if (card) {
        await trello.deleteCard(card.id);
        await say(`Card "${title}" removed!`);
      } else {
        await say(`Could not find card "${title}".`);
      }
    } catch (error) {
      console.error("Could not remove card:", error);
      await say("Could not remove card.");
    }
  },
};
