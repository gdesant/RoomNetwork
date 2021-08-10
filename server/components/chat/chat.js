const Chat = process.sequelize.define('chat', {
    name: {
        type: process.Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    timestamps: true,
},);

module.exports = Chat
return Chat