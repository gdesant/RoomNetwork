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
        unique: true
    },
}, {
    timestamps: true,
    scopes: {
        safeUser: {
            attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] },
        }
    }
},);

User.sync({
    force: false
});


module.exports = User
return User