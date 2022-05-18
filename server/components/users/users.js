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
    pp_url: {
        type: process.Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI='
    },
    pp_settings: {
        type: process.Sequelize.JSON,
        allowNull: false,
        defaultValue: '{scale: {x: 1, y: 1}, translate: {x: 1, y: 1}, rotate: {x: 1, y: 1}}'
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