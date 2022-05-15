const { Addon } = require("../relations");

class addonsDAL{
    static async get() {
        console.log("\t\tAddonsDAL@get");
        return await Addon.findAll({
        });
    }

    static async findAll(whereClause) {
        console.log("\t\tAddonsDAL@findAll");
        return await Addon.findAll({
            where: whereClause,
        });
    }

    static async findOne(whereClause) {
        console.log("\t\tAddonsDAL@findOne");
        return await Addon.findOne({
            where: whereClause
        });
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tAddonsDAL@update");
        return await Addon.update(updateClause, {
            where: whereClause
        });
    }

    static async create(body) {
        console.log("\t\tAddonsDAL@create");
        return await Addon.create({
            content: body.content,
        });
    }
}

module.exports = addonsDAL
