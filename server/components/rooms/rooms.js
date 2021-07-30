const Room = process.sequelize.define('room', {
    // attributes
    type: {
        type: process.Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: false
});

Room.sync({
    force: false
});


module.exports = Room
return Room