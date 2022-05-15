const {Room, User, RoomRequest} = require("../relations");
const Message = process.sequelize.define('message', {
    // attributes
    id: {
        type: process.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: process.Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: process.Sequelize.INTEGER,
        allowNull: false
    },
    senderUsername: {
        type: process.Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
});


module.exports = Message
return Message