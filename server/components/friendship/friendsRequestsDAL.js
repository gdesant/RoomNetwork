const {FriendShipRequest} = require("../relations");

class friendsRequestDAL{
    static async get() {
        console.log("\t\tFriendsRequestDAL@get");
        return await FriendShipRequest.findAll({});
    }

    static async findAll(whereClause) {
        console.log("\t\tFriendsRequestDAL@findAll");
        return await FriendShipRequest.findAll({
            where: whereClause
        });
    }

    static async findOne(whereClause) {
        console.log("\t\tFriendsRequestDAL@findOne");
        return await FriendShipRequest.findOne({
            where: whereClause
        });
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tFriendsRequestDAL@update");
        return await FriendShipRequest.update(updateClause, {
            where: whereClause
        });
    }

    static async destroy(id) {
        console.log("\t\tFriendsRequestDAL@update");
        return await FriendShipRequest.destroy({
            id: id
        });
    }

    static async create(req) {
        console.log("\t\tFriendsRequestDAL@create");
        return await FriendShipRequest.create({
            sender: req.user.id,
            receiver: req.body.receiverId,
            status: 0,
        });
    }
}

module.exports = friendsRequestDAL
