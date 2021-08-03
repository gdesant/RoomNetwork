const User = require("./users/users");
const Room = require('./rooms/rooms')
const FriendShipRequest = require('./friendship/friendsRequests')

User.belongsToMany(User, { as: 'FriendSend', through: FriendShipRequest, foreignKey: 'senderId'})
User.belongsToMany(User, { as: 'FriendReceive', through: FriendShipRequest, foreignKey: 'receiverId'})


module.exports = { User, Room, FriendShipRequest };
return { User, Room, FriendShipRequest }