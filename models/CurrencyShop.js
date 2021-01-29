module.exports = (sequelize, DataTypes) => {
    return sequelize.define('currency_shop', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        boost: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
};