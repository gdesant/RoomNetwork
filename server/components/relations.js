const Room = require('./rooms/rooms')
const User = require("./users/users");
const Message = require('./message/message')
const FriendShipRequest = require('./friendship/friendsRequests')
const Addon = require('./addons/addons')
const RoomRequest = require('./rooms/roomRequests/roomRequests')
const faker = require('faker')
const { Op } = require("sequelize");

//FriendsRelation
User.belongsToMany(User, { as: 'FriendSend', through: FriendShipRequest, foreignKey: 'senderId'})
User.belongsToMany(User, { as: 'FriendReceive', through: FriendShipRequest, foreignKey: 'receiverId'})

//RoomsOwnerRelation
User.hasMany(Room, {as: 'CreatedRooms', foreignKey: 'ownerId', targetKey:'createdRoomsId'})
Room.belongsTo(User, {as: 'Owner', foreignKey: 'ownerId'})


User.hasMany(RoomRequest, {as: 'Requests', foreignKey: 'senderId'})
Room.hasMany(RoomRequest, {as: 'Requests', foreignKey: 'roomId'})


RoomRequest.belongsTo(User, {as: 'Sender',  foreignKey:'senderId'})
RoomRequest.belongsTo(Room, {as: 'Room',  foreignKey:'roomId'})

User.belongsToMany(Room, {as: 'JoinedRooms', through: {model: RoomRequest, unique: false}, foreignKey: 'senderId'})
Room.belongsToMany(User, {as: 'Members', through: {model: RoomRequest, unique: false}, foreignKey: 'roomId'})

RoomRequest.hasMany(Message, {as: 'Messages',  foreignKey:'contactId'})
User.hasMany(Message, {as: 'Messages',  foreignKey:'senderId'})
Room.hasMany(Message, {as: 'Messages',  foreignKey:'roomId'})

Message.belongsTo(RoomRequest, {as: 'Contact',  foreignKey:'contactId'})
Message.belongsTo(Room, {as: 'Room',  foreignKey:'senderId'})
Message.belongsTo(RoomRequest, {as: 'Sender',  foreignKey:'roomId'})

Addon.belongsTo(Room, {as: 'Room', foreignKey: 'roomId'})
Room.hasMany(Addon, {as: 'Addons', foreignKey: 'roomId'})




//#region Prototypes

User.prototype.getPrivateRooms = async function (attribute, includes) {
    return await this.getJoinedRooms({where: {type: 2}, attributes: attribute, include: includes,})
};

User.prototype.getPrivateRoomWith = async function(id, attribute, include){
    const rooms = await this.getPrivateRooms(attribute, include);

    for(let i = 0; i < rooms.length; i++)
    {
        const members = await rooms[i].getMembers({json: true});

        for(let x = 0; x < members.length; x++)
        {
            if (members[x].getDataValue('id') == id)
            {
                delete rooms[i].dataValues.roomrequests
                return rooms[i];
            }

        }
    }
    return false
}

Message.prototype.getSender = async function(clause){
    return await this.getSender(clause)
}

Message.prototype.getRoom = async function(clause){
    return await this.getRoom(clause)
}

Message.prototype.cleanForChat = async function(clause){
    if (this.getDataValue('Contact') != null)
    {
        let sender =  await this.getSender({attributes: ['id', 'username']})
        this.setDataValue('Sender', sender)
        let room =  await this.getRoom({attributes: ['id']})
        this.setDataValue('Room', room)
        delete this.dataValues.Contact
        delete this.dataValues.contactId
    }
    return this
}

//#endregion

//#region Init
async function initSequelize() {
    console.log("Model Synchronization :");
    await process.sequelize.sync({
        force: true
    })
    console.log("Model Synchronization Done!");
    var users = new Array(0)
    var rooms = new Array(0)
    var msgs = new Array(0)


    console.log("User creation ...");
    for (var i = 0; i++ < 5;)
    {
        var user = await User.build({id: i, username: "user_" + (i), password: 'password', email: "email_" + (i)})
        await user.save()
        users[i] = user;

    }

    console.log("Users created : " + users.length);
    console.log("Room creation ...");

    var room = await Room.build({type: 2})
    await room.save()

    console.log("Rooms created");
    console.log("FriendShipRequest creation ...");
    for (var i = 1; i++ < 5;) {
        if (i != 1)
        {
            var fr = await FriendShipRequest.build({senderId: 1, receiverId: i, status: 1,})
            await fr.save()
        }
    }
    console.log("FriendShipRequest  created");
    console.log("RoomRequest creation ...");
    for (var i = 0; i++ < 2;)
    {

        var roomreq = await RoomRequest.build({status: 1})
        await roomreq.update({senderId: users[i].id, roomId: 1})
        await roomreq.setRoom(room)
        await roomreq.save()

    }
    console.log("RoomRequest  created");


}
//#endregion

initSequelize()


module.exports = { User, Room, RoomRequest, FriendShipRequest, Message, Addon };



return { User, Room, RoomRequest, FriendShipRequest,  Message, Addon };