const Discord = require('discord.js');
const { prefix } = require("../config.json");

module.exports = {
    name: 'help',
    description: 'Shows help about RapRPG and how to get help on specific commands.',
    usage: '<command>',
    aliases: ['help', 'h', 'commands'],
    cooldown: 1,
    execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`**Commands**`)
                .setDescription('**For more info on a command use \`rap help [command name]\`**\n**Add \`rap\` before any command**')
                .setThumbnail('https://i.imgur.com/N3ureic.png')
                .addField('Progress Commands', '\`battle\`, \`practice\`, \`club\`, \`iglive\`, \`concert\`')
                .addField('Shop Commands', '\`shop\`, \`buy\`')
                .addField('Player Commands', '\`profile\`, \`inventory\`')
                .addField('Commands Unlocked at higher levels', '\`release\`, \`sign\`, \`marketing\`')
                .setTimestamp()

            message.channel.send(exampleEmbed);
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.reply('that\'s not a valid command!');
            }
            const formattedTime = new Date(command.cooldown * 1000).toISOString().substr(11, 8);
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`**${command.name}**`)
                .setDescription(`${command.description}`)
                .addField('Aliases', `${command.aliases.join(', ')}`)
                .addField('Cooldown', `${formattedTime} (Hh:Mm:Ss)`)
                .setTimestamp()
                .setFooter('See all commands with rap help');

            if(command.usage) {
                exampleEmbed.addField('Usage', `\`${prefix} ${command.name} ${command.usage}\``);
            } else if (command.customUsage) {
                exampleEmbed.addField('Usage', `${command.customUsage}`);
            }
            message.channel.send(exampleEmbed);
        }

        
    },
};