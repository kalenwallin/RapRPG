const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const shop = [
        CurrencyShop.upsert({ name: 'Fake Chain', cost: 10 , boost: 1.25}),
        CurrencyShop.upsert({ name: 'Gold Chain', cost: 500, boost: 1.5 }),
        CurrencyShop.upsert({ name: 'Diamond Chain', cost: 1000, boost: 1.75 }),
        CurrencyShop.upsert({ name: 'VVS Diamond Chain', cost: 2500, boost: 2 }),
        CurrencyShop.upsert({ name: '4PF Chain', cost: 5000, boost: 2.25 }),
        CurrencyShop.upsert({ name: 'YSL Chain', cost: 10000, boost: 2.5 }),
        CurrencyShop.upsert({ name: 'Cactus Jack Chain', cost: 20000, boost: 2.75 }),
        CurrencyShop.upsert({ name: 'XO Chain', cost: 35000, boost: 3 }),
        CurrencyShop.upsert({ name: 'OVO Chain', cost: 50000, boost: 3.25 }),
        CurrencyShop.upsert({ name: 'Young Money Chain', cost: 75000, boost: 3.5 }),
        CurrencyShop.upsert({ name: 'Dreamville Chain', cost: 100000, boost: 3.75 }),
        CurrencyShop.upsert({ name: 'TDE Chain', cost: 200000, boost: 4 }),
        CurrencyShop.upsert({ name: 'Roc-A-Fella Chain', cost: 500000, boost: 4.25 }),
        CurrencyShop.upsert({ name: 'Good Music Chain', cost: 1000000, boost: 4.5 })
    ];
    await Promise.all(shop);
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);