const FriendsRequest = process.sequelize.define('friendsrequests', {
    senderId: {
        type: process.Sequelize.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: process.Sequelize.INTEGER,
        allowNull: false,
    },
    status: process.Sequelize.INTEGER,
}, {
    timestamps: true
});;

FriendsRequest.sync({
    force: false
});


module.exports = FriendsRequest
return FriendsRequest