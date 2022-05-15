const User = process.sequelize.define('user', {
    // attributes
    username: {
        type: process.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: process.Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: process.Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: process.Sequelize.STRING,
        allowNull: true,
    },
    firstName: {
        type: process.Sequelize.STRING,
        allowNull: true,
    },
    lastName: {
        type: process.Sequelize.STRING,
        allowNull: true,
    },
    publicEmail: {
        type: process.Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    publicAccount: {
        type: process.Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
}, {
    timestamps: true,
    scopes: {
        safeUser: {
            attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt', 'publicAccount', 'publicEmail'] },
        }
    }
},);


module.exports = User
return User