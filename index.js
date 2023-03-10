const Trello = require("trello");
const { App } = require("@slack/bolt");
require("dotenv").config();

const TRELLO_KEY = process.env.TRELLO_KEY;
console.log(TRELLO_KEY);
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
console.log(TRELLO_TOKEN);
const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});
console.log(app);

var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);
console.log(trello);

app.message(":trello:ADD", async ({ message, say }) => {
  console.log("detected");
  const cardTitle = message.text.split('-t "')[1].split('"')[0];
  const cardDescription = message.text.split('-d "')[1].split('"')[0];
  trello.addCard(
    cardTitle,
    cardDescription,
    "640ba599d219c4002fcf3117",
    function (error, trelloCard) {
      if (error) {
        console.log("Could not add card:", error);
      } else {
        console.log("Added card:", trelloCard);
      }
    }
  );
  await say(`Card "${cardTitle}" created!`);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
