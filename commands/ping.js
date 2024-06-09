module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    execute(client, message, args) {
        console.log('Ping command executed');
        if (message.channel) {
            message.channel.send('Pong!').catch(console.error);

        } else {
            console.error('Error: Message channel is null.');
        
        }
    }
};
