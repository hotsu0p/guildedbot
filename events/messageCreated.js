module.exports = (client, message) => {
    console.log(`Received message: ${message.content} from ${message.author.username}`);

    if (message.author.bot) return;

    const prefix = '!';
    if (!message.content.startsWith(prefix)) {
        console.log(`Message does not start with prefix: ${prefix}`);
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    console.log(`Command found: ${commandName}`);

    const command = client.commands.get(commandName);

    if (!command) {
        console.log(`No command found for: ${commandName}`);
        return;
    }

    try {
        console.log(`Executing command: ${commandName}`);
        command.execute(client, message, args);
    } catch (error) {
        console.error(`Error executing command: ${commandName}`, error);
        if (message.channel) {
            message.channel.send('There was an error executing that command!').catch(console.error);
        } else {
            console.error('Error: Message channel is null.');
        }
    }
};
