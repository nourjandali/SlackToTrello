# Slack To Trello Integration
This repository contains code for a Slack bot that can add Trello cards directly from Slack channels. This bot utilizes the Trello API and Slack Bolt API to create cards in a specific Trello list when a user sends a message with a specific command in Slack.

# Requirements
- Node.js v14 or higher
- A Trello account
- A Slack account
- A hosting service (Railway.app)

# Installation
- Clone the repository to your local machine.
- Install the required dependencies using npm install.
- Rename the .env.example file to .env and fill in the required environment variables with your Trello and Slack API credentials.

Trello API: ![Trello](https://user-images.githubusercontent.com/44416281/224477477-94947815-1391-464e-82e6-c55044ccb8a6.jpeg)


Slack API: ![Slack](https://user-images.githubusercontent.com/44416281/224477487-34f9769b-7809-4a91-886b-78a1769e9647.jpeg)

- Add Scopes in OAuth.

![Scopes](https://user-images.githubusercontent.com/31695466/224452223-0773e2fe-639d-40fd-af87-935edf3bdb0e.JPG)

- Deploy the app to your hosting service.

![Railway](https://user-images.githubusercontent.com/31695466/224452549-78c28167-9ee4-4ace-bd7c-56ef50435da5.JPG)

- Enable Events in your Slack app configuration and set the Request URL to your hosted app's endpoint (e.g. https://yourappname.up.railway.app/slack/events for Railway.app).

![EventSubscriptions](https://user-images.githubusercontent.com/31695466/224452219-539cb27c-edac-4dba-83b9-39f3448d9030.JPG)

- Subscribe to Bot Events.

![SubscribeToBotEvents](https://user-images.githubusercontent.com/31695466/224452220-a9d5ce15-71a4-4b1e-b6cb-aa4f40a75ae7.JPG)

# Usage
- Add the bot to a Slack channel.

![AddBotToChannel](https://user-images.githubusercontent.com/31695466/224452784-d6725988-5e7c-490e-be4a-14bb0df62c68.JPG)


- Type :trello:ADD -t "Card Title" -d "Card Description" in the channel and replace Card Title and Card Description with the title and description of the Trello card you want to create.

![TestSlack](https://user-images.githubusercontent.com/31695466/224452829-40bb60fc-9789-45a3-ae06-4552a8dd8899.JPG)

- The bot will create a card in the Trello list with the ID 640ba599d219c4002fcf3117 and reply with a confirmation message in the Slack channel.

![TrelloCardAdded](https://user-images.githubusercontent.com/31695466/224452905-05df5139-d5fb-4e2d-84a9-5c33acf87821.JPG)
