const { User, Room, RoomRequest, FriendShipRequest, Message } = require("../relations");

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

    static async create(body) {
        console.log("\t\tRoomsDAL@create");
        const room = await Room.create({
            type: body.type,
        });
        await console.log(room)
        let include = [
                {model: User, as: 'Owner', attributes: ['id', 'username']},
                {model: User, as: 'Members', attributes: ['id', 'username']},
                {model: RoomRequest, as: 'Requests', attributes: ['id', 'senderId', 'roomId']}
            ]


        const roomFinal = await this.findOne({id: room.dataValues.id}, include)

        return roomFinal
    }

}

module.exports = roomsDAL
