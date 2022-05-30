const { User, Room, RoomRequest, FriendShipRequest, Message } = require('../relations')
const { Op } = require("sequelize");

class usersDAL {
    static async get() {
        console.log("\t\tUsersDAL@get");
        return await User.findAll({
            attributes: ['id', 'username', 'email'],
            include: [{model: Room, as:'CreatedRooms', include: ['Members']}, 'JoinedRooms', 'Messages'],
        });
    }

    static async findOne(whereClause, attributes) {
        console.log("\t\tUsersDAL@findOne");
        return await User.findOne({
            where: whereClause,
            attributes: attributes
        });
    }

    static async findAllStartWith(name, publicAcc, id) {
        console.log("\t\tUsersDAL@findAllStartWith");
        return await User.findAll({
            where: {
                id : {
                    [Op.not]: id,
                },
                username:{
                    [Op.startsWith]: name,
                },
                publicAccount: {
                    [Op.is]: publicAcc,
                }
            },
            attributes: ['id', 'username'],
            limit: 15,
        })
    }

    static async getUserFriends(id) {
        console.log("\t\tUsersDAL@getUserFriendsById");
        const init = await User.findOne({
            where:{
                id,
            },
            include: [{
                model: User,
                as: 'FriendSend',
                attributes: ['id', 'username', 'email'],
                through:{where: {status: 1}, attributes: []}
            },{
                model: User,
                as: 'FriendReceive',
                attributes: ['id', 'username', 'email'],
                through: {where: {status: 1}, attributes: []}
            }],
            attributes: [],
        })
        const result = init.toJSON().FriendSend.concat(init.toJSON().FriendReceive)
        return {Friends: result};
    }

    static async getUserMessages(id) {
        console.log("\t\tUsersDAL@getUserMessages");
        const init = await User.findOne({
            where:{
                id,
            },
            include: [{
                model: Message,
                as: 'Messages',
                attributes: ['id', 'content'],
                through:{where: {status: 1}, attributes: []}
            }],
            attributes: [],
        })
        const result = init.toJSON().FriendSend.concat(init.toJSON().FriendReceive)
        return {Friends: result};
    }

    static async getUserDashboardById(id) {
        console.log("\t\tUsersDAL@getDashUser where id:" + id);
        let init;
        init = await User.findOne({
            where:{
                id: id,
            },
            attributes: ['id', 'username', 'email', 'firstName', 'pp_url', 'pp_settings', 'lastName', 'publicAccount', 'publicEmail', 'token'],
            include: [{
                model: User,
                as: 'FriendSend',
                attributes: ['id', 'username', 'pp_url', 'pp_settings'],
                through: {attributes: ['status', 'id', 'updatedAt']},
                required: false
            },{
                model: User,
                as: 'FriendReceive',
                attributes: ['id', 'username', 'pp_url', 'pp_settings'],
                through: {attributes: ['status', 'id', 'updatedAt']},
                required: false
            },{
                model: Room,
                as: 'CreatedRooms',
                attributes: ['id', 'name', 'type'],
                where: {
                    type: {
                        [Op.ne]: 2,
                    }
                },
                required: false
            },
            {
                model: Room,
                as: 'JoinedRooms',
                where:  {
                    [Op.and]:[{
                            ownerId: {
                                [Op.ne]: id,
                            }
                        },{
                            type: {
                                [Op.ne]: 2,
                            }
                        }]
                },
                attributes: ['id', 'name', 'type', 'ownerId'],
                required: false
            }],

        })
        if (init){
            let user = {}
            user.user = init.toJSON()
            delete user.user.FriendSend
            delete user.user.FriendReceive
            user.user.FriendSend = init.toJSON().FriendSend
            user.user.FriendReceive = init.toJSON().FriendReceive
            user.user.CreatedRooms = init.toJSON().CreatedRooms.filter(r => r.type != 2);
            user.user.JoinedRooms = init.toJSON().JoinedRooms.filter(r => r.type != 2);
            user.user.Friends = init.toJSON().FriendSend.filter(fr => fr.friendsrequests.status === 1).concat(init.toJSON().FriendReceive.filter(fr => fr.friendsrequests.status === 1))
            console.log("\t\t\t Found !" + id);
            user = user.user
            return user;
        }
        console.log("\t\t\t Not Found ! - id: " + id);
        return null
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tUsersDAL@update");
        return await User.update(updateClause, {
            where: whereClause
        });
    }

    static async create(body) {
        console.log("\t\tUsersDAL@create");
        return await User.create({
            username: body.username,
            email: body.email,
            password: body.password,
        })
    }
}

module.exports = usersDAL
