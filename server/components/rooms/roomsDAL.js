const { User, Room, RoomRequest, FriendShipRequest, Message } = require("../relations");
const { Op } = require("sequelize");

class roomsDAL{
    static async get() {
        console.log("\t\tRoomsDAL@get");
        return await Room.findAll({
            include: [
                {model: User, as: 'Owner', attributes: ['id', 'username']}, {model: User, as: 'Members', attributes: ['id', 'username']}, {model: RoomRequest ,as: 'Requests', attributes: ['id', 'senderId', 'roomId']}
            ]
        });
    }

    static async findOne(whereClause, includeClause) {
        console.log("\t\tRoomsDAL@findOne");
        const room = await Room.findOne({
            where: whereClause,
            include: includeClause
        });
        return room
    }

    static async findPersonalRoom(id1, id2, attribute, include){
        console.log("\t\tRoomsDAL@findPersonalRoom - id1:" + id1 + " - id2:" + id2);
        const user1 = await User.findOne({
            where: {
                id: id1
            },
        })

        return await user1.getPrivateRoomWith(id2, attribute, include);

    }

    static async update(updateClause, whereClause) {
        console.log("\t\tRoomsDAL@update");
        return await Room.update(updateClause, {
            where: whereClause,
            include: [
                {model: User, as: 'Owner', attributes: ['id', 'username']}, {model: User, as: 'Members', attributes: ['id', 'username']}, {model: RoomRequest ,as: 'Requests', attributes: ['id', 'senderId', 'roomId']}
            ]
        });
    }

    static async count(whereClause) {
        console.log("\t\tRoomsDAL@count")
        return await Room.count({
            where: whereClause,
        })
    }

    static async create(body) {
        console.log("\t\tRoomsDAL@create");

        return await Room.create({
            type: body.type,
            ownerId: body.ownerId,
            name: body.roomName,
        });
    }

}

module.exports = roomsDAL
