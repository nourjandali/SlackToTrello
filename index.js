const { App } = require('@slack/bolt');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const trello = require('./trello.js');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const addCommand = require('./cmd/add.js');

const argv = yargs(hideBin(process.argv))
  .command(addCommand)
  .demandCommand()
  .help()
  .argv;

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log(`⚡️ Bolt app is running on port: ${process.env.PORT}`);
})();

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

app.error((error) => {
  console.error('Slack app error:', error);
});

app.message(async ({ message }) => {
  console.log(`Received message: ${message.text}`);
});

app.use(async ({ context }, next) => {
  context.trello = trello;
  await next();
});

// Handle Trello API errors
app.use(async ({ error, context, next }) => {
  if (error) {
    console.error(`Trello API error: ${error.message}`);
    await context.say(`Trello Error: ${error.message}`);
  } else {
    await next();
  }
});

// Handle unknown commands
app.command('*', async ({ command, context }) => {
  await context.say(`Sorry, I don't know the command \`${command.text}\`. Type \`help\` to see the list of available commands.`);
});
