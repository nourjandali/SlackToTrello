const Trello = require("trello");
require("dotenv").config();

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

const trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

module.exports = trello;
