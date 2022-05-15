const addonsDAL = require("./addonsDAL");
const {where} = require("sequelize/types");

class AddonsController {
    static async getAddons() {
        console.log("\tAddonsController@getAddons");
        const Addons = await addonsDAL.get();
        return Addons;
    }

    static async findAddons(clause) {
        console.log("\tAddonsController@getMessages");
        const Addons = await addonsDAL.findAll(clause);
        return Addons;
    }

    static async getAddonById(id) {
        console.log("\tAddonsController@getAddonById");
        const Addon = await addonsDAL.findOne({id: id});
        return Addon;

    }

    static async getAddonsByRoomId(id) {
        console.log("\tAddonsController@getAddonsByRoomId :" + id);
        const Addons = await addonsDAL.findAll({roomId: id});
        return Addons;

    }

    static async updateAddon(body) {
        console.log("\tAddonsController@updateAddon");
        const Addon = await addonsDAL.update(updateClause, whereClause)

        return Addon;

    }

    static async createAddon(body) {
        console.log("\tAddonsController@createAddon");
        const Addon = await addonsDAL.create(body)

        return Addon;

    }
}

module.exports = AddonsController;