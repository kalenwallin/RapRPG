module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        xpBalance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        fansBalance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        cloutBalance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        singlesReleased: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        albumsReleased: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        levelBalance: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        tierBalance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            min: 1,
            max: 7,
        },
        signed: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};