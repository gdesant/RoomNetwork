const {User, Room, Message} = require("../../relations");
const RoomRequest = process.sequelize.define('roomrequests', {
    id: {
        type: process.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: process.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    role: {
        type: process.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    roomnickname: {
        type: process.Sequelize.STRING,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    timestamps: true
});


module.exports = RoomRequest
return RoomRequest