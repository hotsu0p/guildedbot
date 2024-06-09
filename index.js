const { Client } = require('guilded.js');
const { loadCommands, loadEvents } = require('./utils/loader');
require('dotenv').config();

const client = new Client({
    token: process.env.TOKEN
});

client.commands = new Map();

console.log('Loading commands and events...');
loadCommands(client);
loadEvents(client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.name}!`);
});
client.on('messageCreated', () => {
    console.log("saw message!")
});
client.login();
