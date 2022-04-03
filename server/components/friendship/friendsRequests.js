const FriendsRequest = process.sequelize.define('friendsrequests', {
    id: {
        type: process.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: process.Sequelize.INTEGER,
}, {
    timestamps: true
});

module.exports = FriendsRequest
return FriendsRequest