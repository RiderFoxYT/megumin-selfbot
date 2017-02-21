const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const xkcd = require('relevant-xkcd');

function exec(message, args){
    const sendComic = comic => {
        const color = this.client.config.color === 'random'
        ? (1 << 24) * Math.random() | 0
        : this.client.config.color === 'auto'
        ? message.guild
        ? this.client.util.displayColor(message.member)
        : 0
        : this.client.config.color || 0;

        const embed = new RichEmbed()
        .setColor(color)
        .setTitle(comic.title)
        .setURL(comic.explainURL)
        .setDescription(comic.altText)
        .setImage(comic.imageURL)
        .setFooter(comic.xkcdURL);
        
        return message.edit('', { embed });
    };

    if (!args.content){
        return xkcd.fetchRandom().then(sendComic);
    }

    if (!isNaN(args.content) && parseInt(args.content) === 0){
        return xkcd.fetchCurrent().then(sendComic);
    }

    if (!isNaN(args.content)){
        return xkcd.fetchComic(parseInt(args.content)).then(sendComic);
    }

    return xkcd.fetchRelevant(args.content).then(sendComic);
}

module.exports = new Command('xkcd', exec, {
    aliases: ['xkcd'],
    args: [
        {
            id: 'content',
            match: 'content'
        }
    ]
});