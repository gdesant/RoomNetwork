const Message = process.sequelize.define('message', {
    // attributes
    content: {
        type: process.Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
},);

module.exports = Message
return Message