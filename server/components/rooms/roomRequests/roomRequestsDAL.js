const { User, Room, RoomRequest, FriendShipRequest, Message } = require("../../relations");

class roomRequestsDAL {
    static async get() {
        console.log("\t\tRoomRequests@get");
        return await RoomRequest.findAll({
            include: [
                'Sender', 'Room', {model: Message, as: 'Messages'}
            ]
        });
    }

    static async findOne(whereClause) {
        console.log("\t\tRoomRequests@findOne");
        return await RoomRequest.findOne({
            where: whereClause
        });
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tRoomRequests@update");
        return await RoomRequest.update(updateClause, {
            where: whereClause
        });
    }

    static async create(roomId, ownerId) {
        console.log("\t\tRoomRequestsDAL@create");
        let room = await Room.findOne({
            where: {
                id: roomId
            }
        })

        let user = await User.findOne({
            where: {
                id: ownerId
            }
        })

        let stat = 1;

        if (room.type == 1)
            stat = 0;

        let roomRequest = await RoomRequest.create({
            status: stat,
        });

        await roomRequest.setRoom(room)
        await roomRequest.setSender(user)

        return roomRequest
    }
}

module.exports = roomRequestsDAL
