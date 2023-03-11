const trello = require('./trello.js');

module.exports = {
  command: ':trello:REMOVE',
  describe: 'Removes a card from the Trello board by title',
  builder: yargs => {
    yargs.option('t', {
      alias: 'title',
      describe: 'Title of the Trello card to remove',
      type: 'string',
      demandOption: true,
    });
  },
  handler: async (argv, { say }) => {
    try {
      const { title } = argv;
      const card = await trello.getCardByTitle(title);
      if (!card) {
        await say(`Card "${title}" not found.`);
        return;
      }
      await trello.deleteCard(card.id);
      await say(`Card "${title}" removed.`);
    } catch (error) {
      console.error('Could not remove card:', error);
      await say('Could not remove card.');
    }
  },
};
