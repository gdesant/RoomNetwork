const Addon = process.sequelize.define('addons', {
    id: {
        type: process.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: process.Sequelize.INTEGER,
        allowNull: true,
    },
    name: {
        type: process.Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: true
});

module.exports = Addon
return Addon