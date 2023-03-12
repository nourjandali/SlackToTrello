const Trello = require("trello");
const { App } = require("@slack/bolt");
require("dotenv").config();

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

app.message(":trello:ADD", async ({ message, say }) => {
  const cardTitle = message.text.split('-t "')[1].split('"')[0];
  const cardDescription = message.text.split('-d "')[1].split('"')[0];
  trello.addCard(
    cardTitle,
    cardDescription,
    "640ba599d219c4002fcf3117", // replace with your list ID
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

app.message(":trello:REMOVE", async ({ message, say }) => {
  const cardTitle = message.text.split('-t "')[1].split('"')[0];
  const listId = "640ba599d219c4002fcf3117"; // replace with your list ID
  trello.getCardsOnList(listId, function (error, cards) {
    if (error) {
      console.log("Could not get cards:", error);
    } else {
      const cardToRemove = cards.find((card) => card.name === cardTitle);
      if (cardToRemove) {
        trello.deleteCard(cardToRemove.id, function (error) {
          if (error) {
            console.log("Could not remove card:", error);
            say(`Could not remove card "${cardTitle}".`);
          } else {
            console.log("Removed card:", cardTitle);
            say(`Card "${cardTitle}" removed.`);
          }
        });
      } else {
        console.log("Card not found:", cardTitle);
        say(`Card "${cardTitle}" not found.`);
      }
    }
  });
});

app.message(":trello:LIST", async ({ message, say }) => {
  const listId = "640ba599d219c4002fcf3117"; // replace with your list ID
  trello.getCardsOnList(listId, function (error, cards) {
    if (error) {
      console.log("Could not get cards:", error);
      say("Could not retrieve cards.");
    } else {
      const cardNames = cards.map((card) => card.name);
      const cardList = cardNames.join("\n");
      console.log("Card List:", cardList);
      say(`Existing Cards: \n${cardList}`);
    }
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log(`⚡️ Bolt app is running on port: ${process.env.PORT}`);
})();
