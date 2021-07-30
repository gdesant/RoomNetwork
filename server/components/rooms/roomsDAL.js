const {Room} = require("../relations");

class roomsDAL{
    static async get() {
        console.log("\t\tRoomsDAL@get");
        return await Room.findAll({});
    }

    static async findOne(whereClause) {
        console.log("\t\tRoomsDAL@findOne");
        return await Room.findOne({
            where: whereClause
        });
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tRoomsDAL@update");
        return await Room.update(updateClause, {
            where: whereClause
        });
    }

    static async create(body) {
        console.log("\t\tRoomsDAL@create");
        return await Room.create({
            type: body.type
        });
    }
}

module.exports = roomsDAL
