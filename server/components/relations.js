const User = require("./users/users");
const Room = require('./rooms/rooms')
const Chat = require('./chat/chat')
const Message = require('./message/message')
const FriendShipRequest = require('./friendship/friendsRequests')

User.belongsToMany(User, { as: 'FriendSend', through: FriendShipRequest, foreignKey: 'senderId'})
User.belongsToMany(User, { as: 'FriendReceive', through: FriendShipRequest, foreignKey: 'receiverId'})
/*
User.hasMany(Message, {as:'Messages'})
Message.belongsTo(User, {as: 'Sender'})

Chat.belongsTo(User, {as: 'Creator'})
User.hasMany(Chat, { as: 'ChatsCreated'})

Chat.hasMany(User, { as: 'Users'})
User.belongsTo(Chat, {as:'ChatsUser'} )

Chat.hasMany(Message, {as: 'Messages'})
Message.belongsTo(Chat, {as:'Chat', foreignKey:"chatappend"})

Message.sync({
    force: false
});

Chat.sync({
    force: false
});
*/
User.sync({
    force: false
});





module.exports = { User, Room, FriendShipRequest, Chat, Message };
return { User, Room, FriendShipRequest, Chat, Message };