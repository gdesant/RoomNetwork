const FriendsRequest = process.sequelize.define('friendsrequests', {
    status: process.Sequelize.INTEGER,
}, {
    timestamps: true
});;

FriendsRequest.sync({
    force: true
});


module.exports = FriendsRequest
return FriendsRequest