const Discord = require('discord.js');

module.exports = {
	name: 'start',
	description: 'Shows a welcoming message and basic commands to you started with RapRPG',
	usage: '',
	aliases: ['start'],
	cooldown: 0,
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`**Whats up ${message.author.username}!**`)
			.setDescription('**RapRPG** is a RPG style commandline game that you can play directly within Discord!')
			.setThumbnail('https://i.imgur.com/N3ureic.png')
			.addField('What is the purpose of this game?', 'The purpose of this game is to become the greatest rapper of all time. You can achieve this dream by earning a lot of money, xp, fans, and clout tokens to buy the coolest chains and climb the rapper tiers.')
			.addField('Instuctions to play', 'Use the prefix \`rap\` before every command.')
			.addField('Basic Commands', '\`battle\`, \`practice\`, \`club\`, \`iglive\`, \`shop\`, \`concert\`')
			.addField('How do rap battles work?', 'Rap battles are the most important event in the game. Every rapper starts at tier 1 and faces off against rappers in the same tier. Every 10 levels you gain a rap tier. There are 7 tiers to climb. Each tier will have better rappers than the previous tier.')
			.addField('Need Help?', 'Use the \`help\` command to learn more about the game and specific commands.')
			.setTimestamp()
			.setFooter('Become a rapper today!', 'https://i.imgur.com/hCO3K62.png');

		message.channel.send(exampleEmbed);
	},
};