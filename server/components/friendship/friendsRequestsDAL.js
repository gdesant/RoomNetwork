const {Op} = require("sequelize");
const { User, Room, RoomRequest, FriendShipRequest, Message } = require("../relations");

class friendsRequestDAL{

    static async getUserFriendRequestsSent(id) {
        console.log("\t\tUsersDAL@findFriend");
        const user = await User.findOne({
            where:{
                id,
            },
            include: [{
                model: User,
                as: 'FriendSend',
                attributes: ['id', 'username', 'email'],
                through: {attributes: [], where: {status: {[Op.not]: 1}}}
            }],
            attributes: [],
        })
        let result = user.toJSON().FriendSend
        console.log(result)
        return {FriendsRequestsSent: result};
    }

    static async getUserFriendRequestsReceived(id, throughclause) {
        console.log("\t\tUsersDAL@findFriend");
        const user = await User.findOne({
            where:{
                id,
            },
            include: [{
                model: User,
                as: 'FriendReceive',
                attributes: ['id', 'username', 'email'],
                through: throughclause
            }],
            attributes: [],
        })
        let result = user.toJSON().FriendReceive
        console.log(result)
        return {FriendsRequestsReceived: result};
    }

    static async getUserHaveLink(id1, id2){
        const request = await FriendShipRequest.findOne({
            where: {
                [Op.and]: [{
                    receiverId:{
                        [Op.or]:[id1, id2],
                    }},{
                    senderId: {
                        [Op.or]:[id2, id1],
                    }
                }
                ]}})

        if (request)
            return request.status
        else
            return -1
    }

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
        await FriendShipRequest.update(updateClause, {
            where: whereClause
        });
        return this.findOne(whereClause)
    }

    static async destroy(data) {
        console.log("\t\tFriendsRequestDAL@destroy");
        return await FriendShipRequest.destroy({
            where: {
                [Op.and]: [
                    {
                        id: data.body.id
                    }, {
                        senderId: data.userData.id
                    }
                ]
            }
        });
    }

    static async create(sender, receiver, gban) {
        console.log("\t\tFriendsRequestDAL@create");
        return await FriendShipRequest.create({
            senderId: sender.id,
            receiverId: receiver.id,
            status: gban,
        });
    }
}

module.exports = friendsRequestDAL
