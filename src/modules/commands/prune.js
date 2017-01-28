const { Command } = require('discord-akairo');

function exec(message, args){
    args.amount = Math.min(args.amount, 100);

    return message.channel.fetchMessages({ limit: 100 }).then((messages) => {
        const ownMessages = messages.filter(msg => msg.author.id === this.client.user.id).array();
        ownMessages.length = args.amount + 1;
        
        return Promise.all(ownMessages.map(msg => msg.delete()));
    });
}

module.exports = new Command('prune', exec, {
    aliases: ['prune', 'delete'],
    args: [
        {
            id: 'amount',
            type: 'integer',
            defaultValue: 10
        }
    ]
});