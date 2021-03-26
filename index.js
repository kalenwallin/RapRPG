const fs = require('fs');
const Discord = require("discord.js");
const config = require("./config.json");
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');

const client = new Discord.Client();

const currency = new Discord.Collection();
const xp = new Discord.Collection();
const fans = new Discord.Collection();
const clout = new Discord.Collection();
const singles = new Discord.Collection();
const albums = new Discord.Collection();
const levels = new Discord.Collection();
const tiers = new Discord.Collection();
const sign = new Discord.Collection();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const prefix = "rap";
var cloutgained = false;
const cooldowns = new Discord.Collection();

//db [alpha] methods currency
Reflect.defineProperty(currency, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = currency.get(id);
        if (user) {
            user.balance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, balance: amount });
        currency.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(currency, 'getBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance : 0;
    },
});

//db [alpha] methods xp
Reflect.defineProperty(xp, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = xp.get(id);
        if (user) {
            user.xpBalance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, xpBalance: amount });
        xp.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(xp, 'getXPBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getXPBalance(id) {
        const user = xp.get(id);
        return user ? user.xpBalance : 0;
    },
});

//db [alpha] methods fans
Reflect.defineProperty(fans, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = fans.get(id);
        if (user) {
            user.fansBalance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, fansBalance: amount });
        fans.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(fans, 'getFansBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getFansBalance(id) {
        const user = fans.get(id);
        return user ? user.fansBalance : 0;
    },
});

//db [alpha] methods clout
Reflect.defineProperty(clout, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = clout.get(id);
        if (user) {
            user.cloutBalance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, cloutBalance: amount });
        clout.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(clout, 'getCloutBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getCloutBalance(id) {
        const user = clout.get(id);
        return user ? user.cloutBalance : 0;
    },
});

//db [alpha] methods singles
Reflect.defineProperty(singles, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = singles.get(id);
        if (user) {
            user.singlesReleased += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, singlesReleased: amount });
        singles.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(singles, 'getSinglesReleased', {
    /* eslint-disable-next-line func-name-matching */
    value: function getSinglesReleased(id) {
        const user = singles.get(id);
        return user ? user.singlesReleased : 0;
    },
});

//db [alpha] methods albums
Reflect.defineProperty(albums, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = albums.get(id);
        if (user) {
            user.albumsReleased += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, albumsReleased: amount });
        albums.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(albums, 'getAlbumsReleased', {
    /* eslint-disable-next-line func-name-matching */
    value: function getAlbumsReleased(id) {
        const user = albums.get(id);
        return user ? user.albumsReleased : 0;
    },
});

//db [alpha] methods levels
Reflect.defineProperty(levels, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = levels.get(id);
        if (user) {
            user.levelBalance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, levelBalance: amount });
        levels.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(levels, 'getlevelBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getlevelBalance(id) {
        const user = levels.get(id);
        return user ? user.levelBalance : 1;
    },
});

//db [alpha] methods tiers
Reflect.defineProperty(tiers, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = tiers.get(id);
        if (user) {
            user.tierBalance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, tierBalance: amount });
        tiers.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(tiers, 'gettierBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function gettierBalance(id) {
        const user = tiers.get(id);
        return user ? user.tierBalance : 1;
    },
});

//db [alpha] methods signed
Reflect.defineProperty(sign, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = sign.get(id);
        if (user) {
            user.signed = Number(amount);
           return user.save();
        }
        const newUser = await Users.create({ user_id: id, signed: amount });
        sign.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(sign, 'getSigned', {
    /* eslint-disable-next-line func-name-matching */
    value: function getSigned(id) {
        const user = sign.get(id);
        return user ? user.signed : 0;
    },
});

function nextLevelAmount(userid) {
    const level = levels.getlevelBalance(userid);
    const exponent = 2;
    const baseXP = 50;
    return Math.floor(baseXP * (level ^ exponent));
}

function checkNextLevel(message) {
    const prevLevel = nextLevelAmount(message.author.id);
    while (xp.getXPBalance(message.author.id) > prevLevel) {
        levels.add(message.author.id, 1);
        if ((levels.getlevelBalance(message.author.id) % 10) == 0) {
            tiers.add(message.author.id, 1);
            message.channel.send(`**${message.author.username} leveled up and gained a new rapper tier!**`);
        } else {
            message.channel.send(`**${message.author.username} leveled up!**`);
        }
        resetXP(message.author.id, prevLevel);
    }
    return;
}

function resetXP(userid, xpPrevLevel) {
    xp.add(userid, -(xpPrevLevel));
    return;
}


client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('rap help', {type: 'LISTENING' });

    //[beta]
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b))
    storedBalances.forEach(b => xp.set(b.user_id, b))
    storedBalances.forEach(b => fans.set(b.user_id, b))
    storedBalances.forEach(b => clout.set(b.user_id, b))
    storedBalances.forEach(b => singles.set(b.user_id, b))
    storedBalances.forEach(b => albums.set(b.user_id, b))
    storedBalances.forEach(b => tiers.set(b.user_id, b))
    storedBalances.forEach(b => levels.set(b.user_id, b))
    storedBalances.forEach(b => sign.set(b.user_id, b))
});

client.on("message", async (message) => {
    if (message.author.bot) return;

    //bot mentioned? show them how to play
    if (message.mentions.users.size) {
        if (message.mentions.users.first().id == client.user.id) {
            message.channel.send('Use the command `rap start` to get started');
        }
    }

    //if rap is prefixed then return
    if (!message.content.startsWith(prefix)) return;

    Math.floor((Math.random() * (1 - 0.01) + 0.01) * fans.getFansBalance(message.author.id));
    if (Math.floor(Math.random() * 100) == 69) {
        cloutgained = true;
    }

    const target = message.mentions.users.first() || message.author;
    let bestChain = {
        item: {
            name: 'None',
            boost: 1,
        }
    };
    const user = await Users.findOne({ where: { user_id: target.id } });
    var items = [];
    if (user) {
        items = await user.getItems();
    }
    if (items.length) {
        items.forEach(element => {
            bestChain = element;
        });
    }

    //obtain the name of the commands and additional arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    //command handler
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    //command doesn't exit, return
    if (!command) return;

    if (commandName === 'marketing' || commandName === 'mkt') {
        if (!(sign.getSigned(message.author.id) === 1)) {
            return message.channel.send(`This command is unlocked after you sign a deal.`);
        }
    } 
    if (commandName === 'release') {
        if (levels.getlevelBalance(message.author.id) < 5) {
            return message.channel.send(`This command is unlocked at Level 5`);
        }
    } 
    if (commandName === 'release') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}
The proper usage would be: \`rap release [single or album]\``);
        }
    }
    if (commandName === 'concert') {
        if (levels.getlevelBalance(message.author.id) < 10) {
            return message.channel.send('This command is unlocked at level 10');
        }
    }

    //keep track of command cooldowns for each user
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    function getCooldownTime(commandName) {
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const formattedTime = new Date(timeLeft * 1000).toISOString().substr(11, 8);
                return formattedTime;
            }
        }
        return new Date(0 * 1000).toISOString().substr(11, 8);;
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            const formattedTime = new Date(timeLeft * 1000).toISOString().substr(11, 8);
            return message.reply(`please wait **${formattedTime}**  before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //displays every command's cooldowns
    if (commandName === 'cooldown' || commandName === 'cd') {
        const target = message.mentions.users.first() || message.author;
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`${target.username}'s cooldowns`, `${target.displayAvatarURL()}`)
            .setThumbnail(`${target.displayAvatarURL()}`)
            .addField('rap cd', `\`battle\`-**${getCooldownTime('battle')}**
            \`practice\`-**${getCooldownTime('practice')}**
            \`club\`-**${getCooldownTime('club')}**
            \`iglive\`-**${getCooldownTime('iglive')}**
            \`concert\`-**${getCooldownTime('concert')}**
            \`release\`-**${getCooldownTime('release')}**
            \`marketing\`-**${getCooldownTime('marketing')}**
            \`daily\`**${getCooldownTime('daily')}**
            `)

        return message.channel.send(exampleEmbed);
    } else if

    //Use this if else command chain for commands that access the database
    //profile command
        (commandName === 'profile' || commandName === 'p') {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`${target.username}'s profile`, `${target.displayAvatarURL()}`)
            .setThumbnail(`${target.displayAvatarURL()}`)
            .addField('RAP STATS', `:star:   **LEVEL**: ${levels.getlevelBalance(target.id)}
        :star2:   **XP**: ${xp.getXPBalance(target.id)}/${nextLevelAmount(target.id)}
        :dollar:   **MONEY**: ${currency.getBalance(target.id)}
        :raised_hands:   **FANS**: ${fans.getFansBalance(target.id)}
        :coin:   **CLOUT TOKENS**: ${clout.getCloutBalance(target.id)}
        :gem:   **BEST CHAIN**: ${bestChain.item.name} (${bestChain.item.boost}x XP)
        :microphone:   **SINGLES RELEASED**: ${singles.getSinglesReleased(target.id)}
        :headphones:   **ALBUMS RELEASED**: ${albums.getAlbumsReleased(target.id)}
        :ladder:   **RAPPER TIER**: ${tiers.gettierBalance(target.id)}`)
            .setTimestamp()
            .setFooter('Become a rapper today!', 'https://i.imgur.com/hCO3K62.png');
        return message.channel.send(exampleEmbed);
    } else if (commandName === 'inventory' || commandName === 'i') {
        const target = message.mentions.users.first() || message.author;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        return message.channel.send(`${target.username}'s items:\n ${items.map(t => `${t.amount} ${t.item.name} (${t.item.boost}x)`).join(', ')}`);
    } else if (commandName === 'buy') {
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: args.join(" ") } } });
        if (!item) return message.channel.send(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(message.author.id)) {
            return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
        }

        const user = await Users.findOne({ where: { user_id: message.author.id } });
        currency.add(message.author.id, -item.cost);
        await user.addItem(item);

        message.channel.send(`You've bought: ${item.name}.`);
    } else if (commandName === 'shop') {
        const items = await CurrencyShop.findAll();

        return message.channel.send(items.map((item, position)=> `${position + 1}. ${item.name}: $${item.cost}, XP Boost: ${item.boost}x`).join('\n'), { code: true });
    } else if (commandName === 'leaderboard' || commandName === 'rank') {
        if (args[0] === 'money') {
            return message.channel.send(
                currency.sort((a, b) => b.balance - a.balance)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `${position + 1}. ${(client.users.cache.get(user.user_id).tag)}: $${user.balance}`)
                    .join('\n'),
                { code: true }
            );
        } else if (args[0] === 'fans') {
            return message.channel.send(
                fans.sort((a, b) => b.fansBalance - a.fansBalance)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `${position + 1}. ${(client.users.cache.get(user.user_id).tag)}: ${user.fansBalance} Fans`)
                    .join('\n'),
                { code: true }
            );
        } else if (args[0] === 'clout') {
            return message.channel.send(
                clout.sort((a, b) => b.cloutBalance - a.cloutBalance)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `${position + 1}. ${(client.users.cache.get(user.user_id).tag)}: ${user.cloutBalance} Clout Tokens`)
                    .join('\n'),
                { code: true }
            );
        } else if (args[0] === 'singles') {
            return message.channel.send(
                singles.sort((a, b) => b.singlesReleased - a.singlesReleased)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `${position + 1}. ${(client.users.cache.get(user.user_id).tag)}: ${user.singlesReleased} Singles Released`)
                    .join('\n'),
                { code: true }
            );
        } else if (args[0] === 'albums') {
            return message.channel.send(
                albums.sort((a, b) => b.albumsReleased - a.albumsReleased)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `${position + 1}. ${(client.users.cache.get(user.user_id).tag)}: ${user.albumsReleased} Albums Released`)
                    .join('\n'),
                { code: true }
            );
        } else if (args[0] === 'level') {
            return message.channel.send(
                levels.sort((a, b) => b.levelBalance - a.levelBalance)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `${position + 1}. ${(client.users.cache.get(user.user_id).tag)}: Level ${user.levelBalance} `)
                    .join('\n'),
                { code: true }
            );
        }
        
    } else if (commandName === 'battle') {
        //tier 1
        if(tiers.gettierBalance(message.author.id) === 1 ) {
            const tier1 = ['Lil Pump', 'NAV', 'Rich The Kid', 'Mario Judah', 'Lil Xan'];
            const tier1rapper = tier1[Math.floor(Math.random() * tier1.length)]

            const xptier1Win = Math.floor(10 * bestChain.item.boost);
            const xptier1Lose = Math.floor(5 * bestChain.item.boost);


            const tier1battleMessages = [
                `You battle rapped against **${tier1rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier1Win} XP**, **$50**, and **10 Fans** for the **W!**`,
                `You battle rapped against **${tier1rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier1Lose} XP**, **$25**, and **5 Fans** for the valiant effort!`
            ]

            const tier1message = tier1battleMessages[Math.floor(Math.random() * tier1battleMessages.length)]

            if (tier1message === tier1battleMessages[0]) {
                xp.add(message.author.id, xptier1Win);
                currency.add(message.author.id, 50);
                fans.add(message.author.id, 10);
            } else if (tier1message === tier1battleMessages[1]) {
                xp.add(message.author.id, xptier1Lose);
                currency.add(message.author.id, 25);
                fans.add(message.author.id, 5);
            }

            message.channel.send(`${tier1message}`);
        //tier 2
        } else if (tiers.gettierBalance(message.author.id) === 2) {
            const tier2 = ['Lil Durk', 'Lil Tecca', 'A Boogie Wit Da Hoodie', 'Ski Mask The Slump God', 'Gucci Mane'];
            const tier2rapper = tier2[Math.floor(Math.random() * tier2.length)]

            const xptier2Win = Math.floor(20 * bestChain.item.boost);
            const xptier2Lose = Math.floor(10 * bestChain.item.boost);

            const tier2battleMessages = [
                `You battle rapped against **${tier2rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier2Win} XP**, **$100**, and **20 Fans** for the **W!**`,
                `You battle rapped against **${tier2rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier2Lose} XP**, **$50**, and **10 Fans** for the valiant effort!`
            ]

            const tier2message = tier2battleMessages[Math.floor(Math.random() * tier2battleMessages.length)]

            if (tier2message === tier2battleMessages[0]) {
                xp.add(message.author.id, xptier2Win);
                currency.add(message.author.id, (50 * 2));
                fans.add(message.author.id, (10 * 2));
            } else if (tier2message === tier2battleMessages[1]) {
                xp.add(message.author.id, xptier2Lose);
                currency.add(message.author.id, (25 * 2));
                fans.add(message.author.id, (5 * 2));
            }

            message.channel.send(`${tier2message}`);
        //tier 3
        } else if (tiers.gettierBalance(message.author.id) === 3) {
            const tier3 = ['Trippie Redd', 'Lil Skies', 'NBA YoungBoy', 'Playboi Carti', 'NLE Choppa'];
            const tier3rapper = tier3[Math.floor(Math.random() * tier3.length)]

            const xptier3Win = Math.floor(30 * bestChain.item.boost);
            const xptier3Lose = Math.floor(15 * bestChain.item.boost);

            const tier3battleMessages = [
                `You battle rapped against **${tier3rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier3Win} XP**, **$150**, and **30 Fans** for the **W!**`,
                `You battle rapped against **${tier3rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier3Lose} XP**, **$75**, and **15 Fans** for the valiant effort!`
            ]

            const tier3message = tier3battleMessages[Math.floor(Math.random() * tier3battleMessages.length)]

            if (tier3message === tier3battleMessages[0]) {
                xp.add(message.author.id, xptier3Win);
                currency.add(message.author.id, (50 * 3));
                fans.add(message.author.id, (10 * 3));
            } else if (tier3message === tier3battleMessages[1]) {
                xp.add(message.author.id, xptier3Lose);
                currency.add(message.author.id, (25 * 3));
                fans.add(message.author.id, (5 * 3));
            }

            message.channel.send(`${tier3message}`);
        //tier 4
        } else if (tiers.gettierBalance(message.author.id) === 4) {
            const tier4 = ['Fetty Wap', 'XXXTENTACION (In Heaven?)', '21 Savage', 'Kodak Black', 'A$AP Rocky'];
            const tier4rapper = tier4[Math.floor(Math.random() * tier4.length)]

            const xptier4Win = Math.floor(40 * bestChain.item.boost);
            const xptier4Lose = Math.floor(20 * bestChain.item.boost);

            const tier4battleMessages = [
                `You battle rapped against **${tier4rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier4Win} XP**, **$200**, and **40 Fans** for the **W!**`,
                `You battle rapped against **${tier4rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier4Lose} XP**, **$100**, and **20 Fans** for the valiant effort!`
            ]

            const tier4message = tier4battleMessages[Math.floor(Math.random() * tier4battleMessages.length)]

            if (tier4message === tier4battleMessages[0]) {
                xp.add(message.author.id, xptier4Win);
                currency.add(message.author.id, (50 * 4));
                fans.add(message.author.id, (10 * 4));
            } else if (tier4message === tier4battleMessages[1]) {
                xp.add(message.author.id, xptier4Lose);
                currency.add(message.author.id, (25 * 4));
                fans.add(message.author.id, (5 * 4));
            }

            message.channel.send(`${tier4message}`);
        //tier 5
        } else if (tiers.gettierBalance(message.author.id) === 5) {
            const tier5 = ['Future', 'Lil Uzi Vert', 'Young Thug', 'Roddy Ricch', 'Lil Baby'];
            const tier5rapper = tier5[Math.floor(Math.random() * tier5.length)]

            const xptier5Win = Math.floor(50 * bestChain.item.boost);
            const xptier5Lose = Math.floor(25 * bestChain.item.boost);

            const tier5battleMessages = [
                `You battle rapped against **${tier5rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier5Win} XP**, **$250**, and **50 Fans** for the **W!**`,
                `You battle rapped against **${tier5rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier5Lose} XP**, **$125**, and **25 Fans** for the valiant effort!`
            ]

            const tier5message = tier5battleMessages[Math.floor(Math.random() * tier5battleMessages.length)]

            if (tier5message === tier5battleMessages[0]) {
                xp.add(message.author.id, xptier5Win);
                currency.add(message.author.id, (50 * 5));
                fans.add(message.author.id, (10 * 5));
            } else if (tier5message === tier5battleMessages[1]) {
                xp.add(message.author.id, xptier5Lose);
                currency.add(message.author.id, (25 * 5));
                fans.add(message.author.id, (5 * 5));
            }

            message.channel.send(`${tier5message}`);
        //tier 6
        } else if (tiers.gettierBalance(message.author.id) === 6) {
            const tier6 = ['Kanye West', 'Drake', 'Lil Wayne', 'Travis Scott', 'The Weeknd']; 
            const tier6rapper = tier6[Math.floor(Math.random() * tier6.length)]

            const xptier6Win = Math.floor(60 * bestChain.item.boost);
            const xptier6Lose = Math.floor(30 * bestChain.item.boost);

            const tier6battleMessages = [
                `You battle rapped against **${tier6rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier6Win} XP**, **$300**, and **60 Fans** for the **W!**`,
                `You battle rapped against **${tier6rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier6Lose} XP**, **$150**, and **30 Fans** for the valiant effort!`
            ]

            const tier6message = tier6battleMessages[Math.floor(Math.random() * tier6battleMessages.length)]

            if (tier6message === tier6battleMessages[0]) {
                xp.add(message.author.id, xptier6Win);
                currency.add(message.author.id, (50 * 6));
                fans.add(message.author.id, (10 * 6));
            } else if (tier6message === tier6battleMessages[1]) {
                xp.add(message.author.id, xptier6Lose);
                currency.add(message.author.id, (25 * 6));
                fans.add(message.author.id, (5 * 6));
            }

            message.channel.send(`${tier6message}`);
        //tier 7
        } else if (tiers.gettierBalance(message.author.id) === 7) {
            const tier7 = ['Kendrick Lamar', 'J. Cole', 'Eminem', 'Jay-Z', 'Dr. Dre'];
            const tier7rapper = tier7[Math.floor(Math.random() * tier7.length)]

            const xptier7Win = Math.floor(70 * bestChain.item.boost);
            const xptier7Lose = Math.floor(35 * bestChain.item.boost);

            const tier7battleMessages = [
                `You battle rapped against **${tier7rapper}**? And **Won!?!** :sunglasses: \nYou gained **${xptier7Win} XP**, **$350**, and **70 Fans** for the **W!**`,
                `You battle rapped against **${tier7rapper}**? And **Lost...** :pensive: \nYou still gained  **${xptier7Lose} XP**, **$175**, and **35 Fans** for the valiant effort!`
            ]

            const tier7message = tier7battleMessages[Math.floor(Math.random() * tier7battleMessages.length)]

            if (tier7message === tier7battleMessages[0]) {
                xp.add(message.author.id, xptier7Win);
                currency.add(message.author.id, (50 * 6));
                fans.add(message.author.id, (10 * 6));
            } else if (tier7message === tier7battleMessages[1]) {
                xp.add(message.author.id, xptier7Lose);
                currency.add(message.author.id, (25 * 6));
                fans.add(message.author.id, (5 * 6));
            }

            message.channel.send(`${tier7message}`);
        }
        //give out clout tokens if they are lucky
        if (cloutgained) {
            clout.add(message.author.id, 1);
            message.channel.send(`The rap battle was so lit, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
        }
        cloutgained = false;
        //send a level increased message if they leveled up
        checkNextLevel(message);
        return;
    } else if (commandName === 'release') {
        if (levels.getlevelBalance(message.author.id) >= 5) {
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}
The proper usage would be: \`rap release [single or album]\``);
            }
            if (args[0] === 'single') {
                //get users fan balance
                const singlefans = fans.getFansBalance(message.author.id)
                //calculate money, xp, and fans gained
                const sales = Math.floor(singlefans * (Math.random() * (0.75 - 0.50) + 0.50));
                const singleXPgained = Math.floor(500 * (Math.random() * (1 - 0.5) + 0.5) * bestChain.item.boost);
                const singleFansgained = Math.floor(sales * (Math.random() * (0.5 - 0.25) + 0.25));
                //add money, xp, and fans to users balances
                xp.add(message.author.id, singleXPgained);
                currency.add(message.author.id, sales);
                fans.add(message.author.id, singleFansgained);
                //add 1 to the users singles released stat
                singles.add(message.author.id, 1);
                //send them a message of the summary
                message.channel.send(`You released a single and **sold ${sales} records!** You gained **${singleXPgained} XP**, **$${sales}**, and **${singleFansgained} Fans**.`);
                checkNextLevel(message);
                //give out clout tokens if they are lucky
                if (cloutgained) {
                    clout.add(message.author.id, 1);
                    message.channel.send(`Anthony Fantano gave you a 10/10 for this single. He said it was his favorite single **ever**, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
                }
                cloutgained = false;
                return;
            } else if (args[0] === 'album') {
                //get users fan balance
                const albumfans = fans.getFansBalance(message.author.id)
                //calculate money, xp, and fans gained
                const sales = (Math.floor(albumfans * (Math.random() * (0.50 - 0.25) + 0.25)));
                const albumMoneygained = sales * 10;
                const albumXPgained = Math.floor(500 * (Math.random() * (0.50 - 0.25) + 0.25) * bestChain.item.boost);
                const albumFansgained = Math.floor(sales * (Math.random() * (0.5 - 0.15) + 0.15));
                //add money, xp, and fans to users balances
                xp.add(message.author.id, albumXPgained);
                currency.add(message.author.id, albumMoneygained);
                fans.add(message.author.id, albumFansgained);
                //add 1 to the users albums released stat
                albums.add(message.author.id, 1);
                //send them a message of the summary
                message.channel.send(`You released an album and **sold ${sales} records!** You gained **${albumXPgained} XP**, **$${albumMoneygained}**, and **${albumFansgained} Fans**.`);
                checkNextLevel(message);
                //give out clout tokens if they are lucky
                if (cloutgained) {
                    clout.add(message.author.id, 1);
                    message.channel.send(`Your album was given a 10/10 by Anthony Fantano, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
                }
                cloutgained = false;
                return;
            } else {
                return message.channel.send(`Incorrect usage, ${message.author}
The proper usage would be: \`rap release [single or album]\``);
            }
        } else {
            return message.channel.send(`This command is unlocked at level 10.`)
        }

    } else if (commandName === 'practice') {
        const practiceXPgained = Math.floor((Math.random() * (0.10 - 0.01) + 0.01) * nextLevelAmount(message.author.id) * bestChain.item.boost);
        xp.add(message.author.id, practiceXPgained);
        message.channel.send(`After **practicing** your rapping skills, you gained **${practiceXPgained} XP**`);
        checkNextLevel(message);
        //give out clout tokens if they are lucky
        if (cloutgained) {
            clout.add(message.author.id, 1);
            message.channel.send(`You had the practice of a lifetime and felt the need to post about it. The rap counsel saw your post and granted you a clout token for your greatness.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
        }
        cloutgained = false;
        return;
    }  else if (commandName === 'club') {
        const clubXPgained = Math.floor((Math.random() * (0.10 - 0.05) + 0.05) * nextLevelAmount(message.author.id) * bestChain.item.boost);
        const clubFansgained = Math.floor((Math.random() * (0.05 - 0.04) + 0.04) * fans.getFansBalance(message.author.id));
        const clubMoneyLost = Math.floor((Math.random() * (0.05 - 0.01) + 0.01) * currency.getBalance(message.author.id));

        xp.add(message.author.id, clubXPgained);
        currency.add(message.author.id, -(clubMoneyLost));
        fans.add(message.author.id, clubFansgained);
        message.channel.send(`You went ham in the **club** and went **viral on Tik Tok**!? You gained **${clubXPgained} XP** and **${clubFansgained} Fans**, *but spent $${clubMoneyLost}*. Still lit tho!`);
        checkNextLevel(message);
        //give out clout tokens if they are lucky
        if (cloutgained) {
            clout.add(message.author.id, 1);
            message.channel.send(`The video of you on Tik Tok broke a record for most viewed video in 24 hours, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
        }
        cloutgained = false;
        return;
    } else if (commandName === 'iglive' || commandName === 'ig') {
        const igXPgained = Math.floor((Math.random() * (0.15 - 0.05) + 0.05) * nextLevelAmount(message.author.id) * bestChain.item.boost);
        const igFansgained = Math.floor((Math.random() * (0.15 - 0.05) + 0.05) * fans.getFansBalance(message.author.id));
        const igMoneygained = Math.floor((Math.random() * (0.15 - 0.05) + 0.05) * fans.getFansBalance(message.author.id));

        xp.add(message.author.id, igXPgained);
        currency.add(message.author.id,igMoneygained);
        fans.add(message.author.id, igFansgained);
        message.channel.send(`You went live on instagram! You shared some snippets of your new album, dropped some merch, and hung out with your fans. You gained **${igXPgained} XP**, **$${igMoneygained}**, and **${igFansgained} Fans**.`);
        checkNextLevel(message);
        //give out clout tokens if they are lucky
        if (cloutgained) {
            clout.add(message.author.id, 1);
            message.channel.send(`You broke the record for IG Live viewers, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
        }
        cloutgained = false;
        return;
    } else if (commandName === 'concert' || commandName === 'con') {
        if (levels.getlevelBalance(message.author.id) >= 15) {
            const conXPgained = Math.floor((Math.random() * (0.50 - 0.25) + 0.05) * nextLevelAmount(message.author.id) * bestChain.item.boost);
            const conMoneygained = Math.floor((Math.random() * (0.75 - 0.25) + 0.25) * fans.getFansBalance(message.author.id));

            const locations = ['LA', 'Atlanta', 'New York', 'Nebraska?', 'Memphis', 'Philadelphia', 'Compton', 'Chicago', 'Oakland', 'Detroit',
                'Baltimore', 'Boston', 'Dallas', 'Cleveland', 'Houston', 'Kansas City', 'Miami', 'Minneapolis', 'Milwaukee', 'New Orleans',
                'Phoenix', 'Pittsburgh', 'Seattle', 'St. Louis', 'Washington, DC'];

            const concertLocation = locations[Math.floor(Math.random() * locations.length)]

            xp.add(message.author.id, conXPgained);
            currency.add(message.author.id, conMoneygained);
            message.channel.send(`You headlined a concert in ${concertLocation}!! You gained **${conXPgained} XP** and **$${conMoneygained}**.`);
            checkNextLevel(message);
            //give out clout tokens if they are lucky
            if (cloutgained) {
                clout.add(message.author.id, 1);
                message.channel.send(`The moshpits were so crazy, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
            }
            cloutgained = false;
        } else {
            return message.channel.send(`This command is unlocked at level 15`);
        }
        
    } 
    else if (commandName === 'sign') {
        if (levels.getlevelBalance(message.author.id) < 50) {
            return message.channel.send(`You must be level 50 or higher to sign a deal!`);
        } else if (sign.getSigned(message.author.id) === 0) {
            const recordLabels = ['Young Stoner Life Records', 'Cactus Jack Records', 'XO Records', 'OVO Records', 'Young Money Records', 
                                  'Dreamville Records', 'Top Dawg Entertainment Records', 'Roc-A-Fella Records', 'Good Music Records'];
            const recordLabel = recordLabels[Math.floor(Math.random() * recordLabels.length)]
            const signMoneygained = 10 * currency.getBalance(message.author.id);
            currency.add(message.author.id, signMoneygained); 
            clout.add(message.author.id, 10); 
            message.channel.send(`You signed a major deal with ${recordLabel}!! They gave you a large advance of **$${signMoneygained}** and access to the \`marketing\` command. \`marketing\` will help you gain new fans! The rap counsel received news of your signing and granted you **10 Clout Tokens**!!! \n **+10 Clout Tokens**`);
            sign.add(message.author.id, 1);
            return;
        } else {
            return message.channel.send(`You have already signed a deal...`);
        }
    } else if (commandName === 'marketing' || commandName === 'mkt') {
        if (sign.getSigned(message.author.id) === 1) {
            const mktFansgained = Math.floor((Math.random() * (1 - 0.25) + 0.25) * fans.getFansBalance(message.author.id));
            const marketingMsgs = [
                `Your marketing team had you cross dress, like Playboi Carti, and post it on Social Media. It was a huge success! You gained **${mktFansgained} Fans**`,
                `Your marketing team had you do some features with other artists in your niche. It was strictly for promotion purposes and you didn't get any money, but you did gain **${mktFansgained} Fans**`,
                `Your marketing team had you start beef with Drake on Twitter and he replied! After a few shots back and forth the beef ended and you gained **${mktFansgained} Fans**.`
            ]
            const mktmessage = marketingMsgs[Math.floor(Math.random() * marketingMsgs.length)]
            fans.add(message.author.id, mktFansgained);
            message.channel.send(mktmessage);
            //give out clout tokens if they are lucky
            if (cloutgained) {
                clout.add(message.author.id, 1);
                message.channel.send(`Your marketing was sooo good, the rap counsel granted you a clout token.\nCheck your clout tokens with \`rap profile\` \n**+1 Clout Token**`);
            }
            cloutgained = false;
            return;
        } else {
            return message.channel.send(`\`marketing\` is unlocked after you sign a deal.`);
        }
    } else if (commandName === 'daily') {
        const dailyMoneygained = 1000 * levels.getlevelBalance(message.author.id);
        currency.add(message.author.id, dailyMoneygained);
        clout.add(message.author.id, 1); 
        return message.channel.send(`Daily reward:\n**+1 Clout Token**\n**+$${dailyMoneygained}**`);
    }

    //if arguments were needed, but not supplied then let em know
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix} ${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        if(command.execute) {
            command.execute(message, args);
        }
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    cloutgained = false;
});   

client.login(config.BOT_TOKEN);
