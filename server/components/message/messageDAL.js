const { User, Room, RoomRequest, FriendShipRequest, Message } = require("../relations");

class messageDAL{
    static async get() {
        console.log("\t\tMessageDAL@get");
        var msg = await Message.findAll({
            attributes: ['id', 'content', 'createdAt', 'senderUsername'],
            include: ['Contact']
        });
        return msg;
    }

    static async findAll(whereClause) {
        console.log("\t\tMessageDAL@findAll");
        return await Message.findAll({
            where: whereClause,
        });
    }

    static async findOne(whereClause) {
        console.log("\t\tMessageDAL@findOne");
        let msg = await Message.findOne({
            where: whereClause
        });
        return msg
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tMessageDAL@update");
        return await Message.update(updateClause, {
            where: whereClause
        });
    }

    static async create(body) {
        console.log("\t\tMessageDAL@create");
        return await Message.create({
            content: body.content,
            senderId: body.senderId,
            roomId: body.roomId,
            senderUsername: body.username,
            status: 0,
        });
    }
}

module.exports = messageDAL
