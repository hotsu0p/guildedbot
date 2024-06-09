const fs = require('fs');
const path = require('path');

function loadCommands(client) {
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
            console.log(`Loaded command: ${command.name}`);
        } else {
            console.log(`Failed to load command: ${file}`);
        }
    }
}

function loadEvents(client) {
    const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => event(client, ...args));
        console.log(`Loaded event: ${eventName}`);
    }
}

module.exports = { loadCommands, loadEvents };
